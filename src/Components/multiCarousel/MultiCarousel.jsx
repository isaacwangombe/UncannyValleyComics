import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardHover from "../cardHover/CardHover";
import "./MultiCarousel.css";
import Button from "react-bootstrap/Button";

export const MultiCarousel = ({ products = [] }) => {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="px-5">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlaySpeed={2500}
        keyBoardControl={true}
        customTransition="all 0.5s ease"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["mobile"]}
        itemClass="px-3"
      >
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="carousel-items">
              <CardHover product={product} />
            </div>
          ))
        ) : (
          <p>No trending products found.</p>
        )}
      </Carousel>
    </div>
  );
};
