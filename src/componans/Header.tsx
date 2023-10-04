import Avatar from "@mui/material/Avatar";
import igm from "../assets/img/aloja.jpg";
import { memo, useState } from "react";
import styled from "styled-components";

function Header() {
  const [isMyAcc, setMyAcc] = useState(false);
  function MyAccHandle() {
    setMyAcc(!isMyAcc);
  }
  return (
    <>
      <div className="container">
        <div className="header-top">
          <h2 className="logo__header-top">CrabPynef</h2>
          <div className="box__header-top">
            <div className="option__header-top">
              <div className="phone__header">
                <div className="icon-Phone">
                  <i className="fa-solid fa-phone fa-xl"></i>
                </div>
                <div className="phone__header-text">
                  <p>PHONE</p>
                  <p>(+84) 123 456 789</p>
                </div>
              </div>
              <div className="search__header-top">
                <input type="text" placeholder="Search Your Itemes" />
                <i className="fa-solid fa-magnifying-glass fa-lg"></i>
              </div>
              <div className="cart__header-top">
                <div className="icon-cart">
                  <i className="fa-solid fa-bag-shopping fa-xl"></i>
                  <div className="quanlity__cart">
                    <p>0</p>
                  </div>
                </div>
                <div className="text-cart">
                  <p>YOUR CART</p>
                  <p className="cart__price-icon">$ 5200.86</p>
                </div>
              </div>
              <div className="user__header-top" onClick={MyAccHandle}>
                <Avatar color="neutral" alt="" sx={{ width: 30, height: 30 }} />
                <p className="user__text">Your Name</p>
                {isMyAcc && (
                  <>
                    <Overlay></Overlay>
                    <SpanStyle></SpanStyle>
                    <NavbarLogin>
                      <UlNavbar>
                        <LiNavbar>My Account</LiNavbar>
                        <LiNavbar>Logout</LiNavbar>
                      </UlNavbar>
                    </NavbarLogin>
                  </>
                )}
              </div>
              <div className="bars__header-top">
                <i className="fa-solid fa-bars fa-lg"></i>
                <ul className="modal-bars__header">
                  <li>My account</li>
                  <li>My cart</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Header);

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  cursor: default;
`;
const SpanStyle = styled.div`
  position: absolute;
  height: 30px;
  width: 30px;
  background-color: white;
  right: 0;
  bottom: -100%;
  border-right: 4px solid #e2cabd;
`;

const NavbarLogin = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 0 0 0 20px;
  right: 0;
  bottom: 0;
  transform: translateY(110%);
  width: 150px;
  padding: 5px 0 0;
  z-index: 1;
  border-right: 4px solid #e2cabd;
  border-bottom: 1px solid gray;
  border-left: 0.5px solid #cccccc;
  cursor: default;
`;
const UlNavbar = styled.ul`
  list-style: none;
  padding: 0;
`;

const LiNavbar = styled.li`
  padding: 5px 15px;
  text-align: right;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #c3c3c3;
  }
`;
