import React from "react";
import {
  Heart,
  Leaf,
  Users,
  Award,
  Target,
  Eye,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Milk,
  Tractor,
  Shield,
} from "lucide-react";

function Testimonials() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 100 + 50 + "px",
                height: Math.random() * 100 + 50 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animation: `float ${
                  Math.random() * 20 + 10
                }s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
              🌟 OUR STORY
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              About Malati Dairy
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Bringing pure, traditional A2 dairy from Purba Burdwan's local
              farms to your doorstep with love, care, and sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                📖 OUR JOURNEY
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                From Farm to Family
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Malati Dairy was born from a simple vision: to reconnect urban
                families with the pure, traditional dairy that our grandparents
                cherished. In the heart of Purba Burdwan, we partner with local
                farmers who raise free-grazing desi cows with love and care.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our founders grew up drinking fresh A2 milk straight from the
                farm, and we wanted to bring that same purity and freshness to
                every household in Purba Burdwan. Today, we're proud to serve
                over 2 lakh liters of pure dairy to families who trust us for
                their daily nutrition.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                {[
                  { value: "2L+", label: "Liters Delivered" },
                  { value: "50+", label: "Partner Farmers" },
                  { value: "20+", label: "Delivery Carts" },
                  { value: "100%", label: "Pure A2 Milk" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center bg-green-50 rounded-xl p-4 border-2 border-green-200"
                  >
                    <div className="text-3xl font-extrabold text-green-600 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-semibold">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
              <img
                src="/assets/images/cow-grazing.webp"
                alt="Our Farm"
                className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-xl">
                Est. 2020
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-green-100 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Guided by values that put people, purity, and planet first
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                Icon: Target,
                title: "Our Mission",
                desc: "To deliver 100% pure, unprocessed A2 dairy products from Purba Burdwan's local farms, supporting farmer livelihoods while promoting sustainable, eco-friendly practices that benefit our community and environment.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                Icon: Eye,
                title: "Our Vision",
                desc: "To become Purba Burdwan's most trusted dairy brand, known for uncompromising quality, transparency, and commitment to reviving traditional dairy practices that nourish families and preserve our agricultural heritage.",
                color: "from-purple-500 to-pink-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <item.Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              💎 OUR VALUES
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                Icon: Heart,
                title: "Purity & Quality",
                desc: "100% pure A2 milk with no additives, hormones, or preservatives. Just natural goodness.",
                color: "from-red-500 to-pink-500",
              },
              {
                Icon: Leaf,
                title: "Sustainability",
                desc: "Eco-friendly packaging, zero plastic waste, and support for organic farming practices.",
                color: "from-green-500 to-emerald-500",
              },
              {
                Icon: Users,
                title: "Community First",
                desc: "Empowering local farmers, creating jobs, and building a stronger Purba Burdwan community.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                Icon: Shield,
                title: "Trust & Transparency",
                desc: "FSSAI certified, daily testing, and complete transparency in our sourcing and processes.",
                color: "from-purple-500 to-indigo-500",
              },
              {
                Icon: Sparkles,
                title: "Innovation",
                desc: "Combining traditional methods with modern logistics for the best of both worlds.",
                color: "from-yellow-500 to-orange-500",
              },
              {
                Icon: TrendingUp,
                title: "Excellence",
                desc: "Constantly improving our products, services, and commitment to customer satisfaction.",
                color: "from-pink-500 to-rose-500",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.Icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              What Makes Us Different
            </h2>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Not just another dairy company—we're your trusted farm partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                Icon: Milk,
                title: "Pure A2 Only",
                desc: "Only from indigenous desi cows, no mixed breeds",
              },
              {
                Icon: Tractor,
                title: "Direct From Farms",
                desc: "No middlemen, direct partnerships with farmers",
              },
              {
                Icon: CheckCircle,
                title: "Daily Testing",
                desc: "Every batch tested for purity and quality",
              },
              {
                Icon: Leaf,
                title: "Zero Plastic",
                desc: "Reusable steel containers for sustainability",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <item.Icon className="text-white mb-4" size={40} />
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-green-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              👥 MEET THE TEAM
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              The People Behind Malati Dairy
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Passionate individuals dedicated to bringing you the best dairy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Gouranga Ghosh",
                role: "Founder & CEO",
                desc: "15+ years in dairy industry, passionate about sustainable farming",
              },
              {
                name: "Sourav Dutta",
                role: "Head of Operations",
                desc: "Ensuring quality and timely delivery to every customer",
              },
              {
                name: "Rana Ghosh",
                role: "Farmer Relations",
                desc: "Building strong partnerships with local dairy farmers",
              },
            ].map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 h-48 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                    <Users className="text-green-600" size={64} />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-100 to-emerald-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Join the Malati Dairy Family
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Experience the difference of pure, traditional dairy delivered with
            care
          </p>
          <button
            onClick={() => alert("Navigate to products")}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-12 rounded-full hover:from-green-700 hover:to-emerald-700 shadow-2xl text-xl font-bold transition-all duration-300 hover:scale-110"
          >
            Order Now
          </button>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}

export default Testimonials;
