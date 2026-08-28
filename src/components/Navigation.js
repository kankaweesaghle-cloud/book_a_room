'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LoginModal from '@/components/LoginModal'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // 🛠️ ปรับเมนูให้ตรงกับเว็บไซต์โรงแรม
  const menuItems = [
    { name: 'หน้าแรก', href: '/' },
    { name: 'จองห้องพักและราคา', href: '/rooms' },
    { name: 'สิ่งอำนวยความสะดวก', href: '/service' },
    { name: 'ติดต่อเรา', href: '/contact' },
  ]

  const textColor = isScrolled ? 'text-gray-900' : 'text-white'
  const hoverBgColor = isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-lg border-gray-100 shadow-md py-0'
            : 'bg-transparent py-2'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-yellow-500 to-yellow-600 text-white font-bold text-lg shadow-lg shadow-yellow-500/30 transition-transform group-hover:scale-105">
                L
              </div>

              <div className="flex flex-col">
                <h1 className={`text-xl font-extrabold tracking-tight transition-colors duration-300 ${textColor}`}>
                  Lanna Resort
                </h1>
                <p className={`text-[11px] font-medium uppercase tracking-wider transition-colors duration-300 ${isScrolled ? 'text-gray-500' : 'text-gray-300'}`}>
                  Hotel & Resort
                </p>
              </div>
            </Link>

            {/* Right Section: Menu, Booking Cart, Login, Mobile Toggle */}
            <div className="flex items-center gap-2 md:gap-4">
              
              {/* Desktop Menu Items */}
              <div className="hidden md:flex items-center gap-1 mr-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${textColor} ${hoverBgColor}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Booking/Cart Icon */}
              <Link
                href="/booking"
                className={`relative p-2.5 rounded-full transition-all duration-300 ${textColor} ${hoverBgColor}`}
              >
                {/* เปลี่ยนเป็นไอคอนปฏิทิน */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-bold text-white ring-2 ring-white shadow-sm">
                  1
                </span>
              </Link>

              {/* Login Button (Desktop) */}
              <div className="hidden md:block">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isScrolled
                      ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-md'
                      : 'bg-white text-gray-900 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  เข้าสู่ระบบ
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden rounded-full p-2.5 transition-all duration-300 ${textColor} ${hoverBgColor}`}
              >
                <div className="space-y-1.5">
                  <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
                  <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out origin-top ${
              isOpen ? 'opacity-100 scale-y-100 mb-4' : 'opacity-0 scale-y-0 h-0'
            }`}
          >
            <div className="flex flex-col gap-1 p-4 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-gray-600 rounded-xl transition-all duration-200 hover:bg-gray-50 hover:text-yellow-600"
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="h-px bg-gray-100 my-2 w-full"></div>
              
              <button
                onClick={() => {
                  setIsOpen(false)
                  setIsLoginModalOpen(true)
                }}
                className="mt-1 w-full rounded-xl bg-gray-900 px-4 py-3 text-center text-sm font-medium text-white shadow-md transition-all hover:bg-gray-800"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}