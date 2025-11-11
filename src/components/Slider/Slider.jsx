import React, { useRef, useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import arrowNav from "../../assets/Home/arrow-nav.svg";
import "@splidejs/react-splide/css";
import "./Slider.css";

export default function Slider({ renderItem, items, numberOfCards, breakpoints = {} }) {
  const splideRef = useRef(null);
  const wrapperRef = useRef(null);
  const [fixedWidth, setFixedWidth] = useState(null);
  const [currentPerView, setCurrentPerView] = useState(numberOfCards);
  const gapPx = 40; // must match gap in Splide options

  // 🧠 Helper: compute slide width for fractional layout
  const calculateWidth = (perView) => {
    const container = wrapperRef.current;
    if (!container) return null;

    const containerWidth = container.clientWidth;
    const totalGap = (perView - 1) * gapPx;
    const width = (containerWidth - totalGap) / perView;
    return Math.max(80, Math.floor(width));
  };

  // 🔄 Recalculate based on current window width
  const computeResponsiveWidth = () => {
    let perView = numberOfCards;

    // find applicable breakpoint value
    const sortedBreakpoints = Object.keys(breakpoints)
      .map(Number)
      .sort((a, b) => a - b);

    for (const bp of sortedBreakpoints) {
      if (window.innerWidth <= bp) {
        perView = breakpoints[bp];
        break;
      }
    }

    setCurrentPerView(perView);
    const width = calculateWidth(perView);
    setFixedWidth(width);
  };

  useEffect(() => {
    computeResponsiveWidth();
    window.addEventListener("resize", computeResponsiveWidth);
    return () => window.removeEventListener("resize", computeResponsiveWidth);
  }, [numberOfCards, breakpoints]);

  const goPrev = () => splideRef.current?.splide?.go("<");
  const goNext = () => splideRef.current?.splide?.go(">");

  const options = {
    perPage: Math.floor(currentPerView),
    perMove: 1,
    gap: `${gapPx}px`,
    pagination: false,
    arrows: false,
    drag: true,
    trimSpace: false,
    ...(fixedWidth ? { fixedWidth: `${fixedWidth}px` } : {}),
  };

  return (
    <div className="slider-wrapper" ref={wrapperRef}>
      <Splide ref={splideRef} className="latest-slider" options={options}>
        {items.map((item, i) => (
          <SplideSlide key={item.id || i}>{renderItem(item)}</SplideSlide>
        ))}
      </Splide>

      <div className="slider-nav-buttons container">
        <button className="nav-btn nav-btn-left" onClick={goPrev} aria-label="Previous">
          <img src={arrowNav} alt="prev" />
        </button>
        <button className="nav-btn nav-btn-right" onClick={goNext} aria-label="Next">
          <img src={arrowNav} alt="next" />
        </button>
      </div>
    </div>
  );
}
