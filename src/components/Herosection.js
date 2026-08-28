import Link from 'next/link';
import Image from 'next/image';

export default function Herosection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-gray-900">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur">
              ✨ สัมผัสประสบการณ์การพักผ่อนระดับพรีเมียม
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
              ค้นพบสถานที่พักผ่อน
              <span className="block text-yellow-400 mt-2">
                ที่สมบูรณ์แบบที่สุด
              </span>
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              จองห้องพักหรูในราคาที่ดีที่สุด พร้อมสิ่งอำนวยความสะดวกครบครัน ตอบโจทย์ทุกไลฟ์สไตล์ เพื่อให้ทุกการเดินทางของคุณเป็นความทรงจำที่น่าประทับใจ
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/rooms"
                className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-gray-900 shadow-lg transition hover:scale-105 hover:bg-yellow-400"
              >
                จองห้องพักเลย
              </Link>

              <Link
                href="/service"
                className="rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-gray-900"
              >
                สิ่งอำนวยความสะดวก
              </Link>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg h-[400px]">
              {/* แสงด้านหลังรูปภาพ */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-blue-400/20 blur-3xl"></div>

              <Image
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80"
                alt="Luxury Hotel Resort"
                fill
                className="object-cover rounded-3xl shadow-2xl border border-white/10"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}