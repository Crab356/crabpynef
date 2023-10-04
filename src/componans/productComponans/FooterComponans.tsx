import { memo } from "react";
import styled from "styled-components";

function FooterComponans() {
  return (
    <>
      <FooterStyle>
        <div className="container" style={{ paddingTop: "25px" }}>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-6 col-sm-6 col-lg-3">
              <H6Style>QUICK LINKS</H6Style>
              <PStyle>Store Location</PStyle>
              <PStyle>Orders Tracking</PStyle>
              <PStyle>Size Guide</PStyle>
              <PStyle>FAQs</PStyle>
            </div>
            <div className="col-6 col-sm-6 col-lg-3">
              <H6Style>INFORMATION</H6Style>
              <PStyle>Privacy Page</PStyle>
              <PStyle>About Us</PStyle>
              <PStyle>Delivery Information</PStyle>
              <PStyle>Term & Conditions</PStyle>
            </div>
            <div className="col-6 col-sm-6 col-lg-3">
              <H6Style>ABOUT OUR SHOP</H6Style>
              <PStyle>Shipping Policy</PStyle>
              <PStyle>Help & Contract Us</PStyle>
              <PStyle>Returns & Refunds</PStyle>
              <PStyle>Online Store</PStyle>
            </div>
            <div className="col-6 col-sm-6 col-lg-3">
              <H6Style>ABOUT OUR SHOP</H6Style>
              <PStyle>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                ducimus harum, explicabo possimu
              </PStyle>
              <PStyle>
                <IconPay className="fa-brands fa-cc-paypal"></IconPay>
                <IconPay className="fa-brands fa-cc-visa"></IconPay>
                <IconPay className="fa-brands fa-cc-amazon-pay"></IconPay>
                <IconPay className="fa-brands fa-cc-mastercard"></IconPay>
                <IconPay className="fa-brands fa-cc-apple-pay"></IconPay>
              </PStyle>
            </div>
          </div>
          <EndFooterBox>
            <Endp>@2023-JUST FOR YOU</Endp>
            <div>
              <IconEndStyle className="fa-brands fa-facebook-f"></IconEndStyle>
              <IconEndStyle className="fa-brands fa-twitter"></IconEndStyle>
              <IconEndStyle className="fa-brands fa-instagram"></IconEndStyle>
              <IconEndStyle className="fa-brands fa-tiktok"></IconEndStyle>
            </div>
          </EndFooterBox>
        </div>
      </FooterStyle>
    </>
  );
}

export default memo(FooterComponans);

const IconPay = styled.i`
  margin: 5px 15px 0 0;
  font-size: 20px;
`;

const H6Style = styled.h6`
  margin: 15px 0;
  color: white;
`;
const PStyle = styled.p`
  color: #747474;
  margin: 0 0 5px;
  font-size: 14px;
  cursor: pointer;
`;
const FooterStyle = styled.div`
  background-color: #25292c;
  padding-top: 20px;
  border-top: 1px solid black;
`;
const EndFooterBox = styled.div`
  border-top: 1px solid #747474;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  margin-top: 30px;
`;
const IconEndStyle = styled.i`
  color: #747474;
  font-size: 12px;
  margin: 0 5px;
`;
const Endp = styled.p`
  font-family: monospace;
  color: #747474;
  font-size: 12px;
  margin: 5px 0 0;
`;
