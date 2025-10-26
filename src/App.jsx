import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import WhyUs from "./pages/WhyUs";
import Testimonials from "./pages/Testimonials";
import News from "./pages/News";
// import FAQ from "./pages/FAQ";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/about" element={<Testimonials />} />
        <Route path="/contact" element={<News />} />
        {/* <Route path="/faq" element={<FAQ />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
