import React from "react";
import "./Page2.css";
import img from "../../assets/img2.png";

const Page2 = ({ items }) => {
  let namesObj = items
    ? items.reduce((acc, cur, index) => {
        acc[`name${index + 1}`] = cur;
        return acc;
      }, {})
    : {};
  return (
    <div className="screen2-container">
      <div className="screen2-cont1">
        <div className="screen2-one item">
          <img src={img} className="img" alt={namesObj.name1} />
        </div>
        <div className="screen2-two item">
          <img src={img} className="img" alt={namesObj.name2} />
        </div>
      </div>
      <div className="screen2-cont2">
        <div className="screen2-three item">
          <img src={img} className="img" alt={namesObj.name3} />
        </div>
        <div className="screen2-four item">
          <img src={img} className="img" alt={namesObj.name4} />
        </div>
      </div>
      <div className="screen2-cont3">
        <div className="screen2-five item">
          <img src={img} className="img" alt={namesObj.name5} />
        </div>
        <div className="screen2-six item">
          <img src={img} className="img" alt={namesObj.name1} />
        </div>
        <div className="screen2-seven item">
          <img src={img} className="img" alt={namesObj.name1} />
        </div>
      </div>
    </div>
  );
};

export default Page2;
