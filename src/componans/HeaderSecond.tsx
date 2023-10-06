import { memo, useState } from "react";
import { useSelector } from "react-redux";

function HeaderSecond({
  setPage,
  setPageProduct,
}: {
  setPageProduct?: (val: number) => void;
  setPage?: (val: boolean) => void;
}) {
  const { account } = useSelector((state) => state.logSlide);
  function pageHanderProduct() {
    setPage?.(false);
  }
  function pageHanderAccount() {
    setPage?.(true);
  }
  function pageHandleUser(data: number) {
    setPageProduct?.(data);
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
              <li onClick={() => pageHandleUser(1)}>HOME</li>
              <li onClick={() => pageHandleUser(2)}>FASHION</li>
              <li onClick={() => pageHandleUser(3)}>SHOES</li>
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
