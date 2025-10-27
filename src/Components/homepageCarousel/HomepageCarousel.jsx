import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

import photo1 from "../../assets/HomepageImages/African.jpg";
import photo2 from "../../assets/HomepageImages/Clothes.jpg";
import photo3 from "../../assets/HomepageImages/Community.jpg";
import "./HomepageCarousel.css";

const HomepageCarousel = ({ onShopClick }) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // 🔗 Navigate to the shop, optionally to a specific category slug
  const handleShop = (slug = null) => {
    if (onShopClick) {
      onShopClick(slug); // allow parent override
    } else {
      if (slug) navigate(`/store?category=${encodeURIComponent(slug)}`);
      else navigate("/store");
    }
  };

  const handleCommunity = () => {
    navigate("/store?category=events");
  };

  return (
    <div>
      <Carousel
        className="carousel-hero"
        activeIndex={index}
        onSelect={handleSelect}
      >
        {/* Slide 1 - Comics */}
        <Carousel.Item interval={10000}>
          <img className="d-block w-100 " src={photo1} alt="First slide" />
          <Carousel.Caption>
            <h3 className="font-large mona-sans-base ">
              Explore the <span className="mona-sans-italic">hottest</span>{" "}
              comics
            </h3>
            <div className="d-flex gap-2 mb-2">
              <Button
                variant="light"
                size="lg"
                className="btn-wide"
                onClick={() => handleShop("comics")}
              >
                Shop
              </Button>
              <Button
                variant="light"
                size="lg"
                className="btn-wide"
                onClick={handleCommunity}
              >
                Community
              </Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 2 - Merchandise */}
        <Carousel.Item interval={10000}>
          <img className="d-block w-100" src={photo2} alt="Second slide" />
          <Carousel.Caption>
            <h3 className="font-large mona-sans-base ">
              Discover <span className="mona-sans-italic">awesome</span> merch
            </h3>
            <div className="d-flex gap-2 mb-2">
              <Button
                variant="light"
                size="lg"
                className="btn-wide"
                onClick={() => handleShop("merch")}
              >
                Shop
              </Button>
              <Button
                variant="light"
                size="lg"
                className="btn-wide"
                onClick={handleCommunity}
              >
                Community
              </Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 3 - Community */}
        <Carousel.Item interval={10000}>
          <img className="d-block w-100" src={photo3} alt="Third slide" />
          <Carousel.Caption>
            <h3 className="font-large mona-sans-base ">
              Join our <span className="mona-sans-italic">vibrant</span>{" "}
              community
            </h3>
            <div className="d-flex gap-2 mb-2">
              <Button
                variant="light"
                size="lg"
                className="btn-wide"
                onClick={() => handleShop("events")}
              >
                Shop
              </Button>
              <Button
                variant="light"
                size="lg"
                className="btn-wide"
                onClick={handleCommunity}
              >
                Community
              </Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomepageCarousel;
