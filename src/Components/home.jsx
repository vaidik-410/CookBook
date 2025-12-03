import React, { useEffect, useState } from 'react';
import homepage from "../assets/homepage.png";
import homepage2 from "../assets/homepage2.png";
import homepage3 from "../assets/homepage3.png";

const Home = () => {
  const [images] = useState([homepage, homepage2, homepage3]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, idx) => (
          <img key={idx} src={src} alt="" className="w-full h-[calc(103vh-80px)] object-cover flex-shrink-0"/>
        ))}
      </div>
    </div>
  );
};

export default Home;
