import React from "react";
import img from "../../assets/img2.png";

const Page3 = () => {
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
      </div>
      <div class="screen1-cont3">
        <div class="screen1-four item">
          <img src={img} class="img" alt="Italian Trulli" />
        </div>
        <div class="screen1-five item">
          <img src={img} class="img" alt="Italian Trulli" />
        </div>
      </div>
    </div>
  );
};

export default Page3;
