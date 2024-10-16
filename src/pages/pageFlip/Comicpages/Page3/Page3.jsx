import React from "react";
import { Typography } from "@material-tailwind/react";

import "./Page3.css";

const PageOne = ({ images }) => {
  return (
    <div className="screen2-container">
      <div className="screen2-cont3">
        <div className="screen2-five item">
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
            <div className="blank-image"></div>
          )}
        </div>
        <div className="screen2-six item">
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
          )}
        </div>
        <div className="screen2-seven item">
          {images[2] && images[2].Image ? (
            <figure className="relative h-96 w-full">
              <img
                className="h-full w-full object-fit object-center"
                src={images[2].Image}
                alt="nature image"
              />
              <figcaption className="absolute bottom-1/4 left-2/4 flex w-[calc(100%)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-2 px-2 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                  <Typography color="blue-gray">{images[2].Name}</Typography>
                  <Typography color="gray" className="mt-2 font-normal">
                    Price: {images[2].Price} Kes
                  </Typography>
                </div>
              </figcaption>
            </figure>
          ) : (
            <div className="blank-image"></div>
          )}
        </div>
      </div>
      <div className="screen2-cont1">
        <div className="screen2-one item">
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
            <div className="blank-image"></div> // Blank div when image is not available
          )}
        </div>
        <div className="screen2-two item">
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
          )}
        </div>
      </div>
      <div className="screen2-cont3">
        <div className="screen2-five item">
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
          )}
        </div>
        <div className="screen2-six item">
          {images[6] && images[6].Image ? (
            <figure className="relative h-96 w-full">
              <img
                className="h-full w-full object-fit object-center"
                src={images[6].Image}
                alt="nature image"
              />
              <figcaption className="absolute bottom-1/4 left-2/4 flex w-[calc(100%)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-2 px-2 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                  <Typography color="blue-gray">{images[6].Name}</Typography>
                  <Typography color="gray" className="mt-2 font-normal">
                    Price: {images[6].Price} Kes
                  </Typography>
                </div>
              </figcaption>
            </figure>
          ) : (
            <div className="blank-image"></div>
          )}
        </div>
        <div className="screen2-seven item">
          {images[7] && images[7].Image ? (
            <figure className="relative h-96 w-full">
              <img
                className="h-full w-full object-fit object-center"
                src={images[7].Image}
                alt="nature image"
              />
              <figcaption className="absolute bottom-1/4 left-2/4 flex w-[calc(100%)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-2 px-2 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                  <Typography color="blue-gray">{images[7].Name}</Typography>
                  <Typography color="gray" className="mt-2 font-normal">
                    Price: {images[7].Price} Kes
                  </Typography>
                </div>
              </figcaption>
            </figure>
          ) : (
            <div className="blank-image"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageOne;
