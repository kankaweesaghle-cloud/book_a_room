import Image from 'next/image';

export default function Cardsection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* หัวข้อ Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">ห้องพักยอดนิยม</h2>
          <p className="mt-2 text-gray-600">เลือกห้องพักที่เหมาะกับการพักผ่อนของคุณ พร้อมสิ่งอำนวยความสะดวกครบครัน</p>
        </div>

        {/* ตะแกรง Grid แบบ 3 คอลัมน์ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* ==================== การ์ดใบที่ 1: ห้อง Superior ==================== */}
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col">
            <div className="relative w-full h-56 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&q=80"
                alt="ห้องซูพีเรีย (Superior Room)"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                ห้องซูพีเรีย (Superior Room)
              </h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-grow">
                เตียงคิงไซส์หรือเตียงคู่ พื้นที่กว้างขวาง 30 ตร.ม. พร้อมวิวเมืองที่สวยงาม และฟรี Wi-Fi ความเร็วสูง
              </p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <span className="text-sm text-gray-400 line-through mr-2">฿2,000</span>
                  <span className="text-xl font-bold text-blue-600">฿1,500</span>
                  <span className="text-sm text-gray-500"> / คืน</span>
                </div>
                <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                  จองเลย
                </button>
              </div>
            </div>
          </div>

          {/* ==================== การ์ดใบที่ 2: ห้อง Deluxe ==================== */}
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col">
            <div className="relative w-full h-56 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80"
                alt="ห้องดีลักซ์ วิวทะเล (Deluxe Sea View)"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                ห้องดีลักซ์ (Deluxe Sea View)
              </h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-grow">
                พักผ่อนอย่างมีระดับกับระเบียงส่วนตัวรับลมทะเล อ่างอาบน้ำ สมาร์ททีวี และมินิบาร์ทานฟรีตลอดการเข้าพัก
              </p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <span className="text-xl font-bold text-blue-600">฿2,800</span>
                  <span className="text-sm text-gray-500"> / คืน</span>
                </div>
                <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                  จองเลย
                </button>
              </div>
            </div>
          </div>

          {/* ==================== การ์ดใบที่ 3: ห้อง Suite ==================== */}
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col">
            <div className="relative w-full h-56 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500&q=80"
                alt="ห้องเอ็กเซ็กคิวทีฟ สวีท (Executive Suite)"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                เอ็กเซ็กคิวทีฟ สวีท (Executive Suite)
              </h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-grow">
                ห้องพักสุดหรูขนาด 60 ตร.ม. แยกโซนห้องนอนและห้องนั่งเล่น พร้อมสิทธิพิเศษเข้าใช้คลับเลานจ์และอาหารเช้าฟรี
              </p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <span className="text-xl font-bold text-blue-600">฿5,500</span>
                  <span className="text-sm text-gray-500"> / คืน</span>
                </div>
                <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                  จองเลย
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}