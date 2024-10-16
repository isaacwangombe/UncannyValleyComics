import React from "react";

const FlipPage = ({ images, className }) => {
  return (
    <div className={`${className}-test`}>
      <div className="screen-container">
        <div className="screen2-container">
          <div className="screen2-cont1">
            <div className="screen2-one item">
              {images[0] && images[0].Image ? (
                <img src={images[0].Image} className="img" alt="" />
              ) : (
                <div className="blank-image"></div> // Blank div when image is not available
              )}
            </div>
            <div className="screen2-two item">
              {images[1] && images[1].Image ? (
                <img src={images[1].Image} className="img" alt="" />
              ) : (
                <div className="blank-image"></div>
              )}
            </div>
          </div>
          <div className="screen2-cont2">
            <div className="screen2-three item">
              {images[2] && images[2].Image ? (
                <img src={images[2].Image} className="img" alt="" />
              ) : (
                <div className="blank-image"></div>
              )}
            </div>
            <div className="screen2-four item">
              {images[3] && images[3].Image ? (
                <img src={images[3].Image} className="img" alt="" />
              ) : (
                <div className="blank-image"></div>
              )}
            </div>
          </div>
          <div className="screen2-cont3">
            <div className="screen2-five item">
              {images[4] && images[4].Image ? (
                <img src={images[4].Image} className="img" alt="" />
              ) : (
                <div className="blank-image"></div>
              )}
            </div>
            <div className="screen2-six item">
              {images[5] && images[5].Image ? (
                <img src={images[5].Image} className="img" alt="" />
              ) : (
                <div className="blank-image"></div>
              )}
            </div>
            <div className="screen2-seven item">
              {images[6] && images[6].Image ? (
                <img src={images[6].Image} className="img" alt="" />
              ) : (
                <div className="blank-image"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipPage;
