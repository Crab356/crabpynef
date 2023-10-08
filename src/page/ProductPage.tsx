import { useEffect, useState } from "react";
import Banner from "../componans/Banner";
import Header from "../componans/Header";
import HeaderSecond from "../componans/HeaderSecond";
import HomeProducts from "../componans/productComponans/HomeProduct";
import News from "../componans/productComponans/News";
import FooterComponans from "../componans/productComponans/FooterComponans";
import FashionProducts from "../componans/productComponans/FashionProducts";
import { ProductsType } from "../componans/modal/ModalProduct";
import DetailProduct from "../componans/productComponans/DetailProduct";

function ProductHome() {
  const [page, setPageProduct] = useState(1);
  const [searchHome, setSearchHome] = useState<string>();
  const [cartItem, setCartItem] = useState<Array<ProductsType>>([]);
  console.log(cartItem);

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
      <Header setSearchHome={setSearchHome} cartItem={cartItem} />
      {searchHome == undefined && (
        <HeaderSecond setPageProduct={setPageProduct} />
      )}
      {page == 0 && (
        <HomeProducts searchHome={searchHome} setPageProduct={setPageProduct} />
      )}
      {page == 1 && <Banner />}
      {page == 1 && <HomeProducts setPageProduct={setPageProduct} />}
      {page == 2 && <FashionProducts getRedux="Fashion" />}
      {page == 3 && <FashionProducts getRedux="Shoes" />}
      {page == 4 && (
        <DetailProduct setCartItem={setCartItem} cartItem={cartItem} />
      )}
      <News />
      <FooterComponans />
    </>
  );
}

export default ProductHome;
