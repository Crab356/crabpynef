import styled from "styled-components";
import imgFashion from "../assets/img/ban1.png";
import imgshose from "../assets/img/pngegg.png";
import { useEffect, useState } from "react";
function Banner() {
  return (
    <>
      <div className="banner__backgroud">
        <div className="banner__chil container">
          <div id="2" className="banner__chil-box bannerOpent">
            <div className="banner__description">
              <h1>Luxury Shoes</h1>
              <h6>Natural & Beautyful Shoes Here</h6>
              <span></span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                culpa numquam deleniti, ea atque perspiciatis sit, ipsum quos,
                mollitia fugiat expedita officiis sequi ducimus maiores optio
                soluta.
              </p>
              <button>Shop Now</button>
            </div>
            <div className="banner__img">
              <img src={imgshose} alt="" />
            </div>
          </div>
        </div>
        <div className="banner__option">
          <div className="banner__option-box"></div>
        </div>
      </div>
    </>
  );
}

export default Banner;
