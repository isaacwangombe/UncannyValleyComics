import React from "react";
import "./Page4.css";
import img from "../../assets/img3.png";

const Page4 = () => {
  return (
    <div class="screen1-container">
      <div class="screen1-cont1">
        <div class="screen1-one item">
          <img src={img} class="img" alt="Italian Trulli" />
        </div>
        <div class="screen1-two item">
          <img src={img} class="img" alt="Italian Trulli" />
        </div>
      </div>
      <div class="screen1-cont2">
        <div class="screen1-three item">
          <img src={img} class="img" alt="Italian Trulli" />
        </div>
        <div class="screen1-four item">
          <img src={img} class="img" alt="Italian Trulli" />
        </div>
      </div>
      <div class="screen1-cont3">
        <div class="screen1-five item">
          <img src={img} class="img" alt="Italian Trulli" />
        </div>
        <div class="screen1-six item">
          <img src={img} class="img" alt="Italian Trulli" />
        </div>
      </div>
    </div>
  );
};

export default Page4;
