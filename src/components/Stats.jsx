import React from "react";

function Stats() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-milkvilla-green mb-8">
          Delivering Trust, Quality, and Freshness in Purba Burdwan
        </h2>
        <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto">
          Malati Dairy partners with Purba Burdwan’s local farmers to deliver
          pure A2 milk, achieving incredible milestones for our community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-2xl font-bold text-milkvilla-green">
              2 Lakhs+
            </h3>
            <p className="text-gray-600">Liters Milk Delivered</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-milkvilla-green">1</h3>
            <p className="text-gray-600">City Live (Purba Burdwan)</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-milkvilla-green">20+</h3>
            <p className="text-gray-600">Carts On Road</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-milkvilla-green">50+</h3>
            <p className="text-gray-600">Local Farmers</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
