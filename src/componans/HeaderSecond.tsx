import { memo, useState } from "react";
import { useSelector } from "react-redux";

function HeaderSecond({ setPage }: { setPage?: (val: boolean) => void }) {
  const { account } = useSelector((state) => state.logSlide);
  function pageHanderProduct() {
    setPage?.(false);
  }
  function pageHanderAccount() {
    setPage?.(true);
  }
  return (
    <>
      <div className="header__second">
        <div className="navbar container">
          {account?.role == "admin" ? (
            <ul className="navbar__list">
              <li onClick={pageHanderProduct}>PRODUCTS</li>
              <li onClick={pageHanderAccount}>ACCOUNT</li>
            </ul>
          ) : (
            <ul className="navbar__list">
              <li>HOME</li>
              <li>FASHION</li>
              <li>SHOES</li>
              <li>BLOG</li>
              <li>CONTRACT US</li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default memo(HeaderSecond);
