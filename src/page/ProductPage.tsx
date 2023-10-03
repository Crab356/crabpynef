import { useEffect } from "react";
import Banner from "../componans/Banner";
import Header from "../componans/Header";
import HeaderSecond from "../componans/HeaderSecond";
import { CheckLoginPage } from "../CheckLogin";

function ProductHome() {
  // CheckLoginPage();
  return (
    <>
      <Header />
      <HeaderSecond />
      <Banner />
    </>
  );
}

export default ProductHome;
