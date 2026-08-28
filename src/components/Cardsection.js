import Image from 'next/image';
import Link from 'next/link';

export default function Cardsection() {
  // ข้อมูลห้องพัก
  const rooms = [
    {
      id: 1,
      name: "ห้องซูพีเรีย (Superior Room)",
      typeValue: "Standard",
      description: "เตียงคิงไซส์หรือเตียงคู่ พื้นที่กว้างขวาง 30 ตร.ม. พร้อมวิวเมืองที่สวยงาม และฟรี Wi-Fi ความเร็วสูง",
      originalPrice: "฿2,000",
      price: "1500", // แนะนำให้เก็บเป็นตัวเลขเพียวๆ เพื่อให้ฟอร์มคำนวณง่ายขึ้น
      displayPrice: "฿1,500",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&q=80"
    },
    {
      id: 2,
      name: "ห้องดีลักซ์ (Deluxe Sea View)",
      typeValue: "Deluxe",
      description: "พักผ่อนอย่างมีระดับกับระเบียงส่วนตัวรับลมทะเล อ่างอาบน้ำ สมาร์ททีวี และมินิบาร์ทานฟรีตลอดการเข้าพัก",
      originalPrice: null,
      price: "2800",
      displayPrice: "฿2,800",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80"
    },
    {
      id: 3,
      name: "เอ็กเซ็กคิวทีฟ สวีท (Executive Suite)",
      typeValue: "Suite",
      description: "ห้องพักสุดหรูขนาด 60 ตร.ม. แยกโซนห้องนอนและห้องนั่งเล่น พร้อมสิทธิพิเศษเข้าใช้คลับเลานจ์และอาหารเช้าฟรี",
      originalPrice: null,
      price: "5500",
      displayPrice: "฿5,500",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500&q=80"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* หัวข้อ Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">ห้องพักยอดนิยม</h2>
          <p className="mt-2 text-gray-600">เลือกห้องพักที่เหมาะกับการพักผ่อนของคุณ พร้อมสิ่งอำนวยความสะดวกครบครัน</p>
        </div>

        {/* ตะแกรง Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col">
              <div className="relative w-full h-56 bg-gray-100">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                  {room.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-grow">
                  {room.description}
                </p>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    {room.originalPrice && (
                      <span className="text-sm text-gray-400 line-through mr-2">{room.originalPrice}</span>
                    )}
                    <span className="text-xl font-bold text-blue-600">{room.displayPrice}</span>
                    <span className="text-sm text-gray-500"> / คืน</span>
                  </div>
                  
                  {/* 🛠️ แก้ไขลิงก์: ส่ง URL Parameters ไปทั้งประเภทห้องและราคา */}
                  <Link 
                    href={`/rooms?room=${room.typeValue}&price=${room.price}&name=${encodeURIComponent(room.name)}`}
                    className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors inline-block text-center"
                  >
                    จองเลย
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}