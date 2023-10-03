import { useEffect, useState } from "react";
import Banner from "../componans/Banner";
import Header from "../componans/Header";
import HeaderSecond from "../componans/HeaderSecond";
import { CheckLoginPage } from "../CheckLogin";
import HomeProducts from "../componans/productComponans/HomeProduct";

function ProductHome() {
  const [page, setPage] = useState(1);
  // CheckLoginPage();
  return (
    <>
      <Header />
      <HeaderSecond />
      {page == 1 && <Banner />}
      <HomeProducts />
    </>
  );
}

export default ProductHome;
