"use client";

import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

interface WorkSliderBtnsProps {
  containerStyles?: string;
  btnStyles?: string;
  iconStyles?: string;
}

const WorkSliderBtns = ({
  containerStyles,
  btnStyles,
  iconStyles,
}: WorkSliderBtnsProps) => {
  const swiper = useSwiper();

  return (
    <div className={containerStyles}>
      <button
        type="button"
        aria-label="Prev slide"
        className={btnStyles}
        onClick={() => swiper.slidePrev()}
      >
        <PiCaretLeftBold className={iconStyles} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className={btnStyles}
        onClick={() => swiper.slideNext()}
      >
        <PiCaretRightBold className={iconStyles} />
      </button>
    </div>
  );
};

export default WorkSliderBtns;
