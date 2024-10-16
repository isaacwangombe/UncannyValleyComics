import React from "react";
import "./Page2.css";

const PageTwo = ({ images }) => {
  return (
    <div className="screen-container">
      <div class="screen1-container">
        <div class="screen1-cont1">
          <div class="screen1-one item">
            {images[0] && images[0].Image ? (
              <img src={images[0].Image} className="img" alt="" />
            ) : (
              <div className="blank-image"></div> // Blank div when image is not available
            )}{" "}
          </div>
          <div class="screen1-two item">
            {images[1] && images[1].Image ? (
              <img src={images[1].Image} className="img" alt="" />
            ) : (
              <div className="blank-image"></div>
            )}{" "}
          </div>
        </div>
        <div class="screen1-cont2">
          <div class="screen1-three item">
            {images[2] && images[2].Image ? (
              <img src={images[2].Image} className="img" alt="" />
            ) : (
              <div className="blank-image"></div>
            )}{" "}
          </div>
          <div class="screen1-four item">
            {images[3] && images[3].Image ? (
              <img src={images[3].Image} className="img" alt="" />
            ) : (
              <div className="blank-image"></div>
            )}{" "}
          </div>
        </div>
        <div class="screen1-cont3">
          <div class="screen1-five item">
            {images[4] && images[4].Image ? (
              <img src={images[4].Image} className="img" alt="" />
            ) : (
              <div className="blank-image"></div>
            )}{" "}
          </div>
          <div class="screen1-six item">
            {images[5] && images[5].Image ? (
              <img src={images[5].Image} className="img" alt="" />
            ) : (
              <div className="blank-image"></div>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTwo;
