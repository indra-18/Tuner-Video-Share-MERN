import React, { useEffect, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "react-feather";
import moneyHeist from '../../assets/moneyHeist.jpg';
import strangerThings from '../../assets/strangerThings.jpg';
import kyloRen from '../../assets/kyloRen.jpg';
import justiceLeague from '../../assets/justiceLeague.jpg';
import avengers from '../../assets/avengers.jpg'


const HomeCarousel = () => {
  const [curr, setCurr] = useState(0);

  const autoSlide = true;
  const autoSlideInterval = 2500;

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  const slides = [
    strangerThings,
    moneyHeist,
    kyloRen,
    justiceLeague,
    avengers,
  ];

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div
      className="max-w-fit relative overflow-hidden w-screen h-72"
    >
      <div
        style={{ transform: `translateX(-${curr * 100}%)` }}
        className="flex transition-transform ease-out duration-500"
      >
        {slides.map((slide, index) => (
          <img key={index} src={slide} alt={`Slide ${index}`} />
        ))}
      </div>
      <div className="flex items-center justify-between absolute inset-0">
        <button
          onClick={prev}
          className="opacity-30 hover:opacity-80 bg-white rounded-full"
        >
          <ChevronsLeft size={40} color="black" />
        </button>
        <button
          onClick={next}
          className="opacity-30 hover:opacity-80 bg-white rounded-full"
        >
          <ChevronsRight size={40} color="black" />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`
                  transition-all w-3 h-3 bg-white rounded-full
                  ${curr === i ? "p-2" : "bg-opacity-50"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
