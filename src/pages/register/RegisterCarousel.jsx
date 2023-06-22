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

const renderSlides = imageData.map((image) => (
  <div key={image.alt} className='relative rounded-r-xl h-[52rem]'>
    <img src={image.url} alt={image.alt} className=' h-full object-cover' />
    <p className="absolute text-gray-200 bg-black font-bold text-6xl bottom-10 py-2 text-center w-full drop-shadow-xl opacity-75">{image.label}</p>
  </div>
));

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