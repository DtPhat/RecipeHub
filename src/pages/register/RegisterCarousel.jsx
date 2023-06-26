import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const imageData = [
  {
    label: "Simplify your life",
    alt: "image2",
    url: "img/register-carousel/simplify.jpg"
  },
  {
    label: "Plan your meals",
    alt: "image3",
    url: "img/register-carousel/plan.jpg"
  },
  {
    label: "Organize recipes online",
    alt: "image1",
    url: "img/register-carousel/organize.jpg"
  },
  {
    label: "Find other recipes",
    alt: "image4",
    url: "img/register-carousel/find.jpg"
  }
];



export default function RegisterCarousel() {
  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }
  return (
    <Carousel
      className="h-full"
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      selectedItem={imageData[currentIndex]}
      onChange={handleChange}
      showThumbs={false}
      showStatus={false}
    >
      {renderSlides}
    </Carousel>
  );
}