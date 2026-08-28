"use client";
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function RegisterForm() {
  const [form, setForm] = useState({
    txt_firstname: "",
    txt_lastname: "",
    txt_username: "",
    txt_password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ฟังก์ชันสำหรับล้างข้อมูลในฟอร์ม (Reset/Cancel)
  const handleReset = () => {
    setForm({
      txt_firstname: "",
      txt_lastname: "",
      txt_username: "",
      txt_password: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. ตรวจสอบว่ากรอกข้อมูลครบทุกช่องหรือไม่
    if (
      form.txt_firstname.trim() === "" ||
      form.txt_lastname.trim() === "" ||
      form.txt_username.trim() === "" ||
      form.txt_password.trim() === ""
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อมูลไม่ครบถ้วน',
        text: 'กรุณากรอกข้อมูลให้ครบทุกช่องก่อนกดยืนยัน',
        confirmButtonColor: '#f59e0b'
      });
      return;
    }

    setLoading(true);

    const payload = {
      firstname: form.txt_firstname,
      lastname: form.txt_lastname,
      username: form.txt_username,
      password: form.txt_password,
    };

    try {
      const response = await fetch("https://api.itdev.cmtc.ac.th/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'สมัครสมาชิกสำเร็จ!',
          text: 'ยินดีต้อนรับเข้าสู่ระบบ',
          confirmButtonColor: '#28e81a'
        });
        handleReset(); // ล้างฟอร์มเมื่อสำเร็จ
      } 
      else if (response.status === 400) {
        Swal.fire({
          icon: 'warning',
          title: 'ข้อมูลไม่ถูกต้อง',
          text: resData.message || 'กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง',
          confirmButtonColor: '#f59e0b'
        });
      } 
      else if (response.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'เซิร์ฟเวอร์ขัดข้อง',
          text: 'ไม่สามารถติดต่อฐานข้อมูลได้ในขณะนี้ กรุณาลองใหม่ภายหลัง',
          confirmButtonColor: '#e65050'
        });
      } 
      else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: resData.message || 'ไม่สามารถทำรายการได้',
          confirmButtonColor: '#ec2828'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'การเชื่อมต่อล้มเหลว',
        text: 'ตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณ',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    /* 🛠️ แก้ไขระยะห่างด้านบนตรงนี้ โดยใช้ pt-32 (Padding Top) แทน mt เพื่อไม่ให้ฟอร์มมุดใต้ Navbar */
    <div className="min-h-screen bg-gradient-to-br from-[#1a2b4c] to-[#0d1b2a] font-sans pt-32 pb-12">
      <div className="flex justify-center items-center px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-3xl w-full p-8 md:p-10">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              สมัครสมาชิก
            </h1>
            <p className="text-gray-500 mt-2">กรอกข้อมูลด้านล่างเพื่อสร้างบัญชีใหม่ของคุณ</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="txt_firstname" className="block text-sm font-semibold text-gray-700 mb-2">กรุณาระบุชื่อ <span className="text-red-500">*</span></label>
                <input 
                  id="txt_firstname"
                  type="text" 
                  name="txt_firstname" 
                  value={form.txt_firstname} 
                  onChange={handleChange} 
                  disabled={loading}
                  /* 🛠️ เปลี่ยนสี focus:ring เป็น yellow */
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 disabled:opacity-50" 
                  placeholder="เช่น สมชาย" 
                />
              </div>

              <div>
                <label htmlFor="txt_lastname" className="block text-sm font-semibold text-gray-700 mb-2">กรุณาระบุนามสกุล <span className="text-red-500">*</span></label>
                <input 
                  id="txt_lastname"
                  type="text" 
                  name="txt_lastname" 
                  value={form.txt_lastname} 
                  onChange={handleChange} 
                  disabled={loading}
                  /* 🛠️ เปลี่ยนสี focus:ring เป็น yellow */
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 disabled:opacity-50" 
                  placeholder="เช่น ใจดี" 
                />
              </div>
            </div>

            <div>
              <label htmlFor="txt_username" className="block text-sm font-semibold text-gray-700 mb-2">ชื่อผู้ใช้ (Username) <span className="text-red-500">*</span></label>
              <input 
                id="txt_username"
                type="text" 
                name="txt_username" 
                value={form.txt_username} 
                onChange={handleChange} 
                disabled={loading}
                /* 🛠️ เปลี่ยนสี focus:ring เป็น yellow */
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 disabled:opacity-50" 
                placeholder="ตั้งชื่อผู้ใช้สำหรับเข้าสู่ระบบ" 
              />
            </div>

            <div>
              <label htmlFor="txt_password" className="block text-sm font-semibold text-gray-700 mb-2">รหัสผ่าน (Password) <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  id="txt_password"
                  type={showPassword ? "text" : "password"} 
                  name="txt_password" 
                  value={form.txt_password} 
                  onChange={handleChange} 
                  disabled={loading}
                  /* 🛠️ เปลี่ยนสี focus:ring เป็น yellow */
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 pr-12 disabled:opacity-50" 
                  placeholder="••••••••" 
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button 
                type="button" 
                onClick={handleReset}
                disabled={loading}
                className="w-full sm:w-1/2 py-3 px-4 font-bold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-all duration-200 shadow-sm disabled:opacity-50"
              >
                ล้างข้อมูล
              </button>

              <button 
                type="submit" 
                disabled={loading}
                /* 🛠️ เปลี่ยนสีปุ่มกดยืนยันเป็นเหลืองให้เข้ากับธีม */
                className={`w-full sm:w-1/2 py-3 px-4 font-bold rounded-lg shadow-md transition-all duration-200 
                  ${loading 
                    ? "bg-yellow-300 text-white cursor-not-allowed" 
                    : "bg-yellow-500 hover:bg-yellow-600 text-white hover:shadow-lg transform hover:-translate-y-0.5" 
                  }
                `}
              >
                {loading ? "กำลังบันทึกข้อมูล..." : "ยืนยันการสมัครสมาชิก"}
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  )
}