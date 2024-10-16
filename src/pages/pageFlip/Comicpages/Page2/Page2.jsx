import React from "react";
import "./Page2.css";
import { Typography } from "@material-tailwind/react";

const PageTwo = ({ images }) => {
  return (
    <div class="screen1-container">
      <div class="screen1-cont1">
        <div class="screen1-one item">
          {images[0] && images[0].Image ? (
            <figure className="relative h-96 w-full">
              <img
                className="h-full w-full object-fit object-center"
                src={images[0].Image}
                alt="nature image"
              />
              <figcaption className="absolute bottom-1/4 left-2/4 flex w-[calc(100%)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-2 px-2 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                  <Typography color="blue-gray">{images[0].Name}</Typography>
                  <Typography color="gray" className="mt-2 font-normal">
                    Price: {images[0].Price} Kes
                  </Typography>
                </div>
              </figcaption>
            </figure>
          ) : (
            <div className="blank-image"></div> // Blank div when image is not available
          )}{" "}
        </div>
        <div class="screen1-two item">
          {images[1] && images[1].Image ? (
            <figure className="relative h-96 w-full">
              <img
                className="h-full w-full object-fit object-center"
                src={images[1].Image}
                alt="nature image"
              />
              <figcaption className="absolute bottom-1/4 left-2/4 flex w-[calc(100%)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-2 px-2 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                  <Typography color="blue-gray">{images[1].Name}</Typography>
                  <Typography color="gray" className="mt-2 font-normal">
                    Price: {images[1].Price} Kes
                  </Typography>
                </div>
              </figcaption>
            </figure>
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
            <figure className="relative h-96 w-full">
              <img
                className="h-full w-full object-fit object-center"
                src={images[3].Image}
                alt="nature image"
              />
              <figcaption className="absolute bottom-1/4 left-2/4 flex w-[calc(100%)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-2 px-2 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                  <Typography color="blue-gray">{images[3].Name}</Typography>
                  <Typography color="gray" className="mt-2 font-normal">
                    Price: {images[3].Price} Kes
                  </Typography>
                </div>
              </figcaption>
            </figure>
          ) : (
            <div className="blank-image"></div>
          )}{" "}
        </div>
      </div>
      <div class="screen1-cont3">
        <div class="screen1-five item">
          {images[4] && images[4].Image ? (
            <figure className="relative h-96 w-full">
              <img
                className="h-full w-full object-fit object-center"
                src={images[4].Image}
                alt="nature image"
              />
              <figcaption className="absolute bottom-1/4 left-2/4 flex w-[calc(100%)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-2 px-2 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                  <Typography color="blue-gray">{images[4].Name}</Typography>
                  <Typography color="gray" className="mt-2 font-normal">
                    Price: {images[4].Price} Kes
                  </Typography>
                </div>
              </figcaption>
            </figure>
          ) : (
            <div className="blank-image"></div>
          )}{" "}
        </div>
        <div class="screen1-six item">
          {images[5] && images[5].Image ? (
            <figure className="relative h-96 w-full">
              <img
                className="h-full w-full object-fit object-center"
                src={images[5].Image}
                alt="nature image"
              />
              <figcaption className="absolute bottom-1/4 left-2/4 flex w-[calc(100%)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-2 px-2 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                  <Typography color="blue-gray">{images[5].Name}</Typography>
                  <Typography color="gray" className="mt-2 font-normal">
                    Price: {images[5].Price} Kes
                  </Typography>
                </div>
              </figcaption>
            </figure>
          ) : (
            <div className="blank-image"></div>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default PageTwo;
