import React from "react";

function Features() {
  const features = [
    {
      title: "Unprocessed A2 Cow Milk",
      desc: "Pure, natural A2 milk from Purba Burdwan’s desi cows, free from additives, sourced directly from local farmers.",
    },
    {
      title: "Zero Plastic Packaging",
      desc: "Delivered in eco-friendly stainless steel cans, ensuring freshness and sustainability for Purba Burdwan residents.",
    },
    {
      title: "Free Grazing A2 Cows",
      desc: "Our desi cows roam freely in Purba Burdwan’s fields, producing nutritious A2 milk with authentic flavor.",
    },
    {
      title: "Daily Micro Testing",
      desc: "Rigorous daily testing with lactometers and analyzers ensures the highest quality and safety for Purba Burdwan customers.",
    },
    {
      title: "Keeping Milk Alive",
      desc: "Our milk retains its natural nutrients through careful handling, delivered fresh to Purba Burdwan homes.",
    },
    {
      title: "Delivered within 30 minutes!",
      desc: "Fresh A2 milk delivered to your doorstep in Purba Burdwan within 30 minutes, straight from our local carts.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-milkvilla-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-milkvilla-green mb-8">
          Why Choose Malati Dairy in Purba Burdwan?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-lg font-semibold text-milkvilla-green">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
