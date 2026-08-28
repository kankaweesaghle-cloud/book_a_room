'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function LoginModal({ isOpen, onClose }) {
  // 1. State สำหรับเก็บข้อมูลฟอร์ม Login
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 2. รีเซ็ตฟอร์มเมื่อเปิด Modal
  useEffect(() => {
    if (isOpen) {
      setEmail('')
      setPassword('')
    }
  }, [isOpen])

  if (!isOpen) return null

  // 3. ฟังก์ชันจัดการ Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('เข้าสู่ระบบด้วย:', { email, password })
    // เพิ่ม Logic การเรียก API ที่นี่
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
      
      {/* กล่อง Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* ปุ่มปิด Modal */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ส่วนหัว */}
        <div className="text-center mb-8 mt-2">
          {/* เปลี่ยนสีโลโก้ให้เป็นสีทอง/เหลืองเหมือน Navigation */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-yellow-500 to-yellow-600 text-white font-bold text-xl shadow-lg shadow-yellow-500/30 mb-4">
            L
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            ยินดีต้อนรับกลับมา
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบบัญชีของคุณ
          </p>
        </div>

        {/* ฟอร์ม */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* อีเมล */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-colors"
              placeholder="name@example.com"
            />
          </div>

          {/* รหัสผ่าน */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-yellow-600 hover:text-yellow-500 transition-colors"
                onClick={onClose}
              >
                ลืมรหัสผ่าน?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {/* ปุ่ม Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-3.5 px-4 mt-2 border border-transparent rounded-xl shadow-md text-sm font-bold text-gray-900 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        {/* ตัวคั่น */}
        <div className="mt-6 mb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">หรือ</span>
            </div>
          </div>
        </div>

        {/* ส่วนลิงก์สมัครสมาชิก */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            ยังไม่มีบัญชีใช่ไหม? {' '}
            <Link
              href="/register"
              onClick={onClose}
              className="font-medium text-yellow-600 hover:text-yellow-500 transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-yellow-600 after:transition-all hover:after:w-full"
            >
              สมัครสมาชิกเลย
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  )
}