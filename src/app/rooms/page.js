"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navigation'; 
import Swal from 'sweetalert2';

export default function BookingForm() {
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

  const handleChange = (e) => {
    let { name, value } = e.target;

    // จัดรูปแบบเบอร์โทรศัพท์
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
    
    // 🛠️ 1. ตรวจสอบข้อมูลก่อนส่ง
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

    // ตรวจสอบวันที่เช็คเอาท์ต้องมากกว่าเช็คอิน
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

    const payload = {
      firstname: form.txt_firstname,
      lastname: form.txt_lastname,
      phone: form.txt_phone, 
      email: form.txt_email, 
      roomType: form.sel_room_type,
      checkIn: form.date_checkin,
      checkOut: form.date_checkout
    };

    try {
      // สามารถเปลี่ยน URL เป็น API สำหรับการจองของระบบคุณได้เลย
      const response = await fetch("https://6a7ec4233183f5fd884a77db.mockapi.io/api/bookings/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // 🛠️ 2. ดักจับ Status Code ต่างๆ
      if (response.ok || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'จองห้องพักสำเร็จ!',
          text: 'ระบบได้รับข้อมูลการจองของคุณเรียบร้อยแล้ว',
          confirmButtonColor: '#08ea35' 
        });
        handleReset(); 
      } else if (response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'ข้อมูลไม่ถูกต้อง',
          text: 'ข้อมูลที่ส่งไปยังเซิร์ฟเวอร์ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
          confirmButtonColor: '#e7e737'
        });
      } else if (response.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'ระบบเซิร์ฟเวอร์มีปัญหา',
          text: 'กรุณาลองใหม่อีกครั้งในภายหลัง',
          confirmButtonColor: '#ef4444'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: `เกิดข้อผิดพลาด (${response.status})`,
          text: 'ไม่สามารถทำรายการได้ กรุณาลองใหม่อีกครั้ง',
          confirmButtonColor: '#ef4444'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'การเชื่อมต่อล้มเหลว',
        text: 'ตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณ กรุณาลองใหม่อีกครั้ง',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-gray-900 font-sans pt-32 pb-12">
      <Navbar />

      <div className="flex justify-center items-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-4xl w-full p-8 md:p-10">
          
          <div className="text-center mb-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-yellow-500 to-yellow-600 text-white font-bold shadow-lg shadow-yellow-500/30 mb-4">
              {/* เปลี่ยนไอคอนเป็นรูปที่พัก/เตียงนอนแบบง่ายๆ */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              แบบฟอร์มจองห้องพัก
            </h1>
            <p className="text-gray-500 mt-2">กรอกข้อมูลด้านล่างเพื่อทำการจองห้องพักของคุณ</p>
          </div>
          
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            
            {/* ข้อมูลส่วนตัวผู้จอง */}
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">1. ข้อมูลผู้เข้าพัก</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อ <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="txt_firstname" 
                  value={form.txt_firstname} 
                  onChange={handleChange} 
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200 disabled:opacity-50" 
                  placeholder="เช่น สมชาย" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">นามสกุล <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="txt_lastname" 
                  value={form.txt_lastname} 
                  onChange={handleChange} 
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200 disabled:opacity-50" 
                  placeholder="เช่น ใจดี" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">เบอร์โทรติดต่อ <span className="text-red-500">*</span></label>
                <input 
                  type="tel" 
                  name="txt_phone" 
                  value={form.txt_phone} 
                  onChange={handleChange} 
                  maxLength={12}
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200 disabled:opacity-50" 
                  placeholder="เช่น 081-234-5678" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">อีเมล (Email) <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  name="txt_email" 
                  value={form.txt_email} 
                  onChange={handleChange} 
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200 disabled:opacity-50" 
                  placeholder="เช่น example@email.com" 
                />
              </div>
            </div>

            {/* ข้อมูลการจองห้องพัก */}
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mt-8 mb-4">2. รายละเอียดการจอง</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ประเภทห้องพัก <span className="text-red-500">*</span></label>
              <select 
                name="sel_room_type" 
                value={form.sel_room_type} 
                onChange={handleChange} 
                disabled={loading}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200 disabled:opacity-50"
              >
                <option value="" disabled>-- กรุณาเลือกประเภทห้องพัก --</option>
                <option value="Standard">ห้อง Standard (มาตรฐาน)</option>
                <option value="Deluxe">ห้อง Deluxe (ดีลักซ์)</option>
                <option value="Suite">ห้อง Suite (สวีท)</option>
                <option value="Family">ห้อง Family (ครอบครัว)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">วันที่เช็คอิน (Check-in) <span className="text-red-500">*</span></label>
                <input 
                  type="date" 
                  name="date_checkin" 
                  value={form.date_checkin} 
                  onChange={handleChange} 
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200 disabled:opacity-50" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">วันที่เช็คเอาท์ (Check-out) <span className="text-red-500">*</span></label>
                <input 
                  type="date" 
                  name="date_checkout" 
                  value={form.date_checkout} 
                  onChange={handleChange} 
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200 disabled:opacity-50" 
                />
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <button 
                type="button" 
                onClick={handleReset}
                disabled={loading}
                className="w-full sm:w-1/3 py-3.5 px-4 font-bold rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-all duration-200 shadow-sm disabled:opacity-50"
              >
                ล้างข้อมูล
              </button>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full sm:w-2/3 py-3.5 px-4 font-bold rounded-xl shadow-md transition-all duration-200 
                  ${loading 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-400 text-gray-900 hover:shadow-lg transform hover:-translate-y-0.5" 
                  }
                `}
              >
                {loading ? "กำลังบันทึกข้อมูลการจอง..." : "ยืนยันการจองห้องพัก"}
              </button>
            </div>
            
          </form>
          
        </div>
      </div>
    </div>
  )
}