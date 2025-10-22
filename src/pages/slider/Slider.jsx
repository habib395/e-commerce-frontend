import React, { useEffect, useState } from "react";
import sliderImg1 from "../../assets/slide/img-one.jpg";
import sliderImg2 from "../../assets/slide/img-two.jpg";
import sliderImg3 from "../../assets/slide/img-three.jpg";

const images = [sliderImg3, sliderImg2, sliderImg1];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full mx-auto">
      <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] overflow-hidden shadow-lg">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
              index === current ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      {/* <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-75"
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-75"
        onClick={nextSlide}
      >
        ❯
      </button> */}

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? "bg-white w-4 h-4" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;