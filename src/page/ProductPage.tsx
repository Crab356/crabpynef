import { useEffect, useState } from "react";
import Banner from "../componans/Banner";
import Header from "../componans/Header";
import HeaderSecond from "../componans/HeaderSecond";
import HomeProducts from "../componans/productComponans/HomeProduct";
import News from "../componans/productComponans/News";
import FooterComponans from "../componans/productComponans/FooterComponans";

function ProductHome() {
  const [page, setPage] = useState(1);
  // CheckLoginPage();
  return (
    <>
      <Header />
      <HeaderSecond />
      {page == 1 && <Banner />}
      {page == 1 && <HomeProducts />}
      <News />
      <FooterComponans />
    </>
  );
}

export default ProductHome;
