import React, { useState } from "react";
import "./Page1.css";
import img from "../../assets/img.png";

const getObjectsByIndex = (array, index) => {
  let idRangeStart, idRangeEnd;

  switch (index) {
    case 1:
      idRangeStart = 1;
      idRangeEnd = 5;
      break;
    case 2:
      idRangeStart = 10;
      idRangeEnd = 15;
      break;
    case 3:
      idRangeStart = 20;
      idRangeEnd = 25;
      break;
    // Add more cases if needed
    default:
      idRangeStart = null;
      idRangeEnd = null;
  }

  if (idRangeStart && idRangeEnd) {
    return array.filter(
      (comic) => comic.id >= idRangeStart && comic.id <= idRangeEnd
    );
  }
  return [];
};

const Page1 = ({ items }) => {
  // let namesObj = items
  //   ? items.reduce((acc, cur, index) => {
  //       acc[`name${index + 1}`] = cur;
  //       return acc;
  //     }, {})
  //   : {};

  const filteredComics = getObjectsByIndex(ComicsImages, index);

  return (
    <div className="demoPage screen3-container">
      <div>
        <div className="screen3-cont1">
          {filteredComics[0] && (
            <div className="screen3-one item">
              <img
                src={filteredComics[0].Image}
                className="img1"
                alt={filteredComics[0].Name}
              />
            </div>
          )}
          {filteredComics[1] && (
            <div className="screen3-two item">
              <img
                src={filteredComics[1].Image}
                className="img1"
                alt={filteredComics[1].Name}
              />
            </div>
          )}
          {filteredComics[2] && (
            <div className="screen3-three item">
              <img
                src={filteredComics[2].Image}
                className="img1"
                alt={filteredComics[2].Name}
              />
            </div>
          )}
        </div>
      </div>
      <div className="screen3-cont2">
        {filteredComics[3] && (
          <div className="screen3-four item">
            <img
              src={filteredComics[3].Image}
              className="img1"
              alt={filteredComics[3].Name}
            />
          </div>
        )}
        {filteredComics[4] && (
          <div className="screen3-five item">
            <img
              src={filteredComics[4].Image}
              className="img1"
              alt={filteredComics[4].Name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page1;
