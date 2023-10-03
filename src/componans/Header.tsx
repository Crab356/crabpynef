import Avatar from "@mui/material/Avatar";
import igm from "../assets/img/aloja.jpg";
import { memo } from "react";

function Header() {
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
              <div className="user__header-top">
                <Avatar
                  color="neutral"
                  alt="Your"
                  sx={{ width: 30, height: 30 }}
                />

                <p className="user__text">Your Name</p>
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
