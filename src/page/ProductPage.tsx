import { useEffect, useState } from "react";
import Banner from "../componans/Banner";
import Header from "../componans/Header";
import HeaderSecond from "../componans/HeaderSecond";
import HomeProducts from "../componans/productComponans/HomeProduct";
import News from "../componans/productComponans/News";
import FooterComponans from "../componans/productComponans/FooterComponans";
import FashionProducts from "../componans/productComponans/FashionProducts";

function ProductHome() {
  const [page, setPageProduct] = useState(1);
  const [searchHome, setSearchHome] = useState<string>();
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    if (page != 0) {
      setSearchHome(undefined);
    } else if (searchHome == "") {
      setPageProduct(1);
    }
  }, [searchHome == "", page != 0]);
  useEffect(() => {
    if (searchHome) {
      setPageProduct(0);
    }
  }, [searchHome != undefined]);

  return (
    <>
      <Header setSearchHome={setSearchHome} />
      {searchHome == undefined && (
        <HeaderSecond setPageProduct={setPageProduct} />
      )}
      {page == 0 && <HomeProducts searchHome={searchHome} />}
      {page == 1 && <Banner />}
      {page == 1 && <HomeProducts />}
      {page == 2 && <FashionProducts getRedux="Fashion" />}
      {page == 3 && <FashionProducts getRedux="Shoes" />}
      <News />
      <FooterComponans />
    </>
  );
}

export default ProductHome;
