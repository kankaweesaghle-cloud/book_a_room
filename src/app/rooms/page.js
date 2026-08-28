"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navigation'; 
import Swal from 'sweetalert2';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

// 1. สร้างฐานข้อมูลห้องพักจำลองสำหรับใช้ดึงรูปและราคา
const roomsData = {
  Standard: {
    name: "ห้องซูพีเรีย (Superior Room)",
    price: 1500,
    displayPrice: "฿1,500",
    description: "เตียงคิงไซส์หรือเตียงคู่ พื้นที่กว้างขวาง 30 ตร.ม. พร้อมวิวเมืองที่สวยงาม และฟรี Wi-Fi ความเร็วสูง",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&q=80"
  },
  Deluxe: {
    name: "ห้องดีลักซ์ (Deluxe Sea View)",
    price: 2800,
    displayPrice: "฿2,800",
    description: "พักผ่อนอย่างมีระดับกับระเบียงส่วนตัวรับลมทะเล อ่างอาบน้ำ สมาร์ททีวี และมินิบาร์ทานฟรีตลอดการเข้าพัก",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80"
  },
  Suite: {
    name: "เอ็กเซ็กคิวทีฟ สวีท (Executive Suite)",
    price: 5500,
    displayPrice: "฿5,500",
    description: "ห้องพักสุดหรูขนาด 60 ตร.ม. แยกโซนห้องนอนและห้องนั่งเล่น พร้อมสิทธิพิเศษเข้าใช้คลับเลานจ์และอาหารเช้าฟรี",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500&q=80"
  },
  Family: {
    name: "ห้องแฟมิลี่ (Family Room)",
    price: 4500,
    displayPrice: "฿4,500",
    description: "พื้นที่กว้างขวางสำหรับครอบครัว พักได้สูงสุด 4 ท่าน พร้อมมุมนั่งเล่นส่วนตัว",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500&q=80" 
  }
};

// แยก Component ฟอร์มออกมาเพื่อให้ใช้งานร่วมกับ Suspense ได้ (ป้องกัน Error ใน Next.js)
function BookingFormContent() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    txt_firstname: "",
    txt_lastname: "",
    txt_phone: "", 
    txt_email: "",
    sel_room_type: "",
    date_checkin: "",
    date_checkout: ""
  });

  const [loading, setLoading] = useState(false);

  // 2. ดึงค่าพารามิเตอร์จาก URL มาตั้งค่าเริ่มต้นให้ Dropdown
  useEffect(() => {
    const roomParam = searchParams.get('room');
    if (roomParam && roomsData[roomParam]) {
      setForm((prev) => ({ ...prev, sel_room_type: roomParam }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "txt_phone") {
      value = value.replace(/\D/g, '');
      if (value.length > 3 && value.length <= 6) {
        value = `${value.slice(0, 3)}-${value.slice(3)}`;
      } else if (value.length > 6) {
        value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
      }
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleReset = () => {
    setForm({
      txt_firstname: "",
      txt_lastname: "",
      txt_phone: "", 
      txt_email: "",
      sel_room_type: "",
      date_checkin: "",
      date_checkout: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isFormValid = 
      form.txt_firstname.trim() !== "" &&
      form.txt_lastname.trim() !== "" &&
      form.txt_phone.length === 12 && 
      form.txt_email.trim() !== "" && 
      form.sel_room_type !== "" &&
      form.date_checkin !== "" &&
      form.date_checkout !== "";

    if (!isFormValid) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ',
        text: 'ข้อมูลการจองห้องพักไม่ครบถ้วน กรุณาตรวจสอบอีกครั้ง',
        confirmButtonColor: '#f59e0b'
      });
      return; 
    }

    if (new Date(form.date_checkin) >= new Date(form.date_checkout)) {
      Swal.fire({
        icon: 'warning',
        title: 'วันที่ไม่ถูกต้อง',
        text: 'วันที่เช็คเอาท์ต้องอยู่หลังวันที่เช็คอิน',
        confirmButtonColor: '#f59e0b'
      });
      return;
    }

    setLoading(true);

    // เพิ่มข้อมูลราคาและชื่อห้องไปใน Payload ด้วยเพื่อให้ฐานข้อมูลเก็บข้อมูลได้ครบถ้วน
    const selectedRoom = roomsData[form.sel_room_type];
    const payload = {
      firstname: form.txt_firstname,
      lastname: form.txt_lastname,
      phone: form.txt_phone, 
      email: form.txt_email, 
      roomType: form.sel_room_type,
      roomName: selectedRoom.name,
      pricePerNight: selectedRoom.price,
      checkIn: form.date_checkin,
      checkOut: form.date_checkout
    };

    try {
      const response = await fetch("https://6a7ec4233183f5fd884a77db.mockapi.io/api/bookings/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'จองห้องพักสำเร็จ!',
          text: 'ระบบได้รับข้อมูลการจองของคุณเรียบร้อยแล้ว',
          confirmButtonColor: '#08ea35' 
        });
        handleReset(); 
      } else {
        // หากฝั่ง Server ตอบกลับมาเป็น 500, 404, 400 จะเข้าเงื่อนไขนี้
        throw new Error(`Server Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Booking Error:", error);

      // 🛠️ เช็คว่าเป็นปัญหาเรื่อง Network (เน็ตหลุด/ส่งข้อมูลไม่ถึง) หรือไม่
      if (!navigator.onLine || error.message.includes("Failed to fetch") || error.name === "TypeError") {
        Swal.fire({
          icon: 'error',
          title: 'Network Error',
          html: `
            <p>ระบบเครือข่ายขัดข้อง ข้อมูลส่งไปไม่ถึงเซิร์ฟเวอร์ (เน็ตหลุด)</p>
            <p class="mt-2 text-sm text-gray-500"><b>คำแนะนำ:</b> กรุณาตรวจสอบ Wi-Fi, สัญญาณเน็ต หรือ Router ของคุณ</p>
          `,
          confirmButtonColor: '#ef4444'
        });
      } else {
        // 🛠️ ปัญหาอื่นๆ เช่น Server 500 ที่เรา throw ไว้ด้านบน
        Swal.fire({
          icon: 'error',
          title: 'เซิร์ฟเวอร์ขัดข้อง',
          text: 'เกิดข้อผิดพลาดจากฝั่งเซิร์ฟเวอร์ ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
          confirmButtonColor: '#ef4444'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // ตัวแปรเก็บข้อมูลห้องที่กำลังเลือกอยู่
  const selectedRoomDetails = form.sel_room_type ? roomsData[form.sel_room_type] : null;

  return (
    <div className="flex justify-center items-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-4xl w-full p-8 md:p-10">
        
        <div className="text-center mb-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-yellow-500 to-yellow-600 text-white font-bold shadow-lg shadow-yellow-500/30 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">แบบฟอร์มจองห้องพัก</h1>
          <p className="text-gray-500 mt-2">กรอกข้อมูลด้านล่างเพื่อทำการจองห้องพักของคุณ</p>
        </div>
        
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">1. ข้อมูลผู้เข้าพัก</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อ <span className="text-red-500">*</span></label>
              <input type="text" name="txt_firstname" value={form.txt_firstname} onChange={handleChange} disabled={loading} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all" placeholder="เช่น สมชาย" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">นามสกุล <span className="text-red-500">*</span></label>
              <input type="text" name="txt_lastname" value={form.txt_lastname} onChange={handleChange} disabled={loading} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all" placeholder="เช่น ใจดี" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">เบอร์โทรติดต่อ <span className="text-red-500">*</span></label>
              <input type="tel" name="txt_phone" value={form.txt_phone} onChange={handleChange} maxLength={12} disabled={loading} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all" placeholder="เช่น 081-234-5678" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">อีเมล (Email) <span className="text-red-500">*</span></label>
              <input type="email" name="txt_email" value={form.txt_email} onChange={handleChange} disabled={loading} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all" placeholder="เช่น example@email.com" />
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mt-8 mb-4">2. รายละเอียดการจอง</h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ประเภทห้องพัก <span className="text-red-500">*</span></label>
            <select name="sel_room_type" value={form.sel_room_type} onChange={handleChange} disabled={loading} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all">
              <option value="" disabled>-- กรุณาเลือกประเภทห้องพัก --</option>
              <option value="Standard">ห้อง Standard (มาตรฐาน)</option>
              <option value="Deluxe">ห้อง Deluxe (ดีลักซ์)</option>
              <option value="Suite">ห้อง Suite (สวีท)</option>
              <option value="Family">ห้อง Family (ครอบครัว)</option>
            </select>
          </div>

          {/* 🛠️ 3. กล่องแสดงรูปภาพ ราคา และรายละเอียดห้อง (โผล่ขึ้นมาอัตโนมัติเมื่อเลือกห้อง) */}
          {selectedRoomDetails && (
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row gap-5 items-center md:items-start transition-all animate-fade-in-up">
              <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 shadow-sm border border-gray-200">
                <Image 
                  src={selectedRoomDetails.image} 
                  alt={selectedRoomDetails.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="flex-1 w-full flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{selectedRoomDetails.name}</h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{selectedRoomDetails.description}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700 bg-white px-4 py-2 rounded-lg border shadow-sm flex items-center gap-2">
                    ราคา: 
                    <span className="text-blue-600 text-lg font-extrabold">{selectedRoomDetails.displayPrice}</span> 
                    <span className="font-normal text-gray-500">/ คืน</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">วันที่เช็คอิน (Check-in) <span className="text-red-500">*</span></label>
              <input type="date" name="date_checkin" value={form.date_checkin} onChange={handleChange} disabled={loading} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">วันที่เช็คเอาท์ (Check-out) <span className="text-red-500">*</span></label>
              <input type="date" name="date_checkout" value={form.date_checkout} onChange={handleChange} disabled={loading} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all" />
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <button type="button" onClick={handleReset} disabled={loading} className="w-full sm:w-1/3 py-3.5 px-4 font-bold rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-all">ล้างข้อมูล</button>
            <button type="submit" disabled={loading} className={`w-full sm:w-2/3 py-3.5 px-4 font-bold rounded-xl shadow-md transition-all ${loading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-400 text-gray-900 hover:shadow-lg transform hover:-translate-y-0.5"}`}>
              {loading ? "กำลังบันทึกข้อมูลการจอง..." : "ยืนยันการจองห้องพัก"}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
} // 🛑 ปิดฟังก์ชัน BookingFormContent อย่างถูกต้องตรงนี้

// 4. หุ้มด้วย Suspense เพื่อรองรับ Next.js App Router ป้องกัน Error
export default function BookingForm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-gray-900 font-sans pt-32 pb-12">
      <Navbar />
      <Suspense fallback={
        <div className="flex justify-center items-center h-64 text-white">กำลังโหลดข้อมูล...</div>
      }>
        <BookingFormContent />
      </Suspense>
    </div>
  );
}