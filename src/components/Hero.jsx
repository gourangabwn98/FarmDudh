import React from "react";

function Hero() {
  return (
    <section
      id="home"
      className="bg-milkvilla-light py-16 md:py-20 text-center"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-milkvilla-green mb-4">
          Pure A2 Desi Cow Milk & Ghee for Purba Burdwan
        </h1>
        <p className="text-base md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
          Sourced directly from Burdwan’s local farmers, our A2 dairy is rich in
          flavor, nutrition, and tradition. Delivered fresh in eco-friendly
          stainless steel cans.
        </p>
        <a
          href="#products"
          className="bg-milkvilla-green text-white py-2 px-6 rounded-full hover:bg-green-700 text-lg font-medium"
        >
          Order Now in Purba Burdwan
        </a>
      </div>
    </section>
  );
}

export default Hero;
