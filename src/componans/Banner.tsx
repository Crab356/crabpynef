import styled from "styled-components";
import imgFashion from "../assets/img/ban1.png";
import imgshose from "../assets/img/pngegg.png";
import { useEffect, useState } from "react";
import img from "../assets/img/lincungstock.jpg";
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
      </div>
      <div style={{ position: "relative" }}>
        <BoxItemBanner>
          <ItemBannerDiv className="container">
            <ItemBannerRow className="row">
              <ItemBannerCol className="col-6 col-xl-3 col-lg-3">
                <BoxItem>
                  <DivItem>
                    <Icon className="fa-solid fa-dolly fa-2xl"></Icon>
                  </DivItem>

                  <DivItem>
                    <Heading>Free Shipping</Heading>
                    <TextStyle>On all orders over $49.00</TextStyle>
                  </DivItem>
                </BoxItem>
              </ItemBannerCol>
              <ItemBannerCol className="col-6 col-xl-3 col-lg-3">
                <BoxItem>
                  <DivItem>
                    <Icon className="fa-solid fa-hand-holding-dollar fa-2xl"></Icon>
                  </DivItem>
                  <DivItem>
                    <Heading>15 days returns</Heading>
                    <TextStyle>Moneyback guarante</TextStyle>
                  </DivItem>
                </BoxItem>
              </ItemBannerCol>
              <ItemBannerCol className="col-6 col-xl-3 col-lg-3">
                <BoxItem>
                  <DivItem>
                    <Icon className="fa-regular fa-credit-card fa-2xl"></Icon>
                  </DivItem>
                  <DivItem>
                    <Heading>Secure checkout</Heading>
                    <TextStyle>Protected by Paypal</TextStyle>
                  </DivItem>
                </BoxItem>
              </ItemBannerCol>
              <ItemBannerCol className="col-6 col-xl-3 col-lg-3">
                <BoxItem>
                  <DivItem>
                    <Icon className="fa-solid fa-gifts fa-2xl"></Icon>
                  </DivItem>
                  <DivItem>
                    <Heading>Offer & gift here</Heading>
                    <TextStyle>On all orders over</TextStyle>
                  </DivItem>
                </BoxItem>
              </ItemBannerCol>
            </ItemBannerRow>
          </ItemBannerDiv>
        </BoxItemBanner>
      </div>
      <SecondBanner>
        <div className="container">
          <div className="row g-4">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 ">
              <div className="banner__second1"></div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
              <div className="banner__second2"></div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="banner__second3 "></div>
            </div>
          </div>
        </div>
      </SecondBanner>
    </>
  );
}

export default Banner;

const SecondBanner = styled.div`
  margin-top: 100px;
  @media screen and (max-width: 1070px) {
    margin-top: 150px;
  }
  @media screen and (max-width: 991px) {
    margin-top: 200px;
  }
`;

const BoxItemBanner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(-50%);

  @media screen and (max-width: 1070px) {
    transform: translateY(10%);
    top: 0;
    margin-top: -10px;
  }
`;

const ItemBannerDiv = styled.div`
  background-color: white;
  border-radius: 20px;
  border-bottom: 1px solid gray;
  padding: 15px 30px;
  @media screen and (max-width: 992px) {
    border-top: 1px solid gray;
  }
`;
const ItemBannerRow = styled.div``;

const ItemBannerCol = styled.div``;

const BoxItem = styled.div`
  display: flex;
  padding: 5px;
`;

const DivItem = styled.div`
  padding: 0 5px 0 10px;
  margin: 0;
`;

const Icon = styled.i`
  display: block;
  margin-top: 25px;
`;

const Heading = styled.h6``;

const TextStyle = styled.p`
  margin: 0;
  font-size: 14px;
  color: gray;
`;
