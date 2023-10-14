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
import CartPage from "../componans/productComponans/CartPage";
import { CheckLoginPage, checkLoginUser } from "../CheckLogin";
import ProfileUser from "../componans/productComponans/ProfileUser";

function ProductHome() {
  const [page, setPageProduct] = useState(1);
  const [searchHome, setSearchHome] = useState<string>();
  const [cartItem, setCartItem] = useState<Array<ProductsType>>([]);
  const totalDolarProduct = cartItem.map(
    (item) => item.buyquanlity * item.discount
  );
  const totalDolar = totalDolarProduct
    .reduce((dolar, currentDolar) => dolar + currentDolar, 0)
    .toFixed(2);

  CheckLoginPage();
  checkLoginUser();
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
      {page != 5 && (
        <Header
          setSearchHome={setSearchHome}
          cartItem={cartItem}
          totalDolar={totalDolar}
          setPageProduct={setPageProduct}
        />
      )}

      {searchHome == undefined && (
        <HeaderSecond setPageProduct={setPageProduct} />
      )}
      {page == 0 && (
        <HomeProducts searchHome={searchHome} setPageProduct={setPageProduct} />
      )}
      {page == 1 && <Banner />}
      {page == 1 && <HomeProducts setPageProduct={setPageProduct} />}
      {page == 2 && (
        <FashionProducts getRedux="Fashion" setPageProduct={setPageProduct} />
      )}
      {page == 3 && (
        <FashionProducts getRedux="Shoes" setPageProduct={setPageProduct} />
      )}
      {page == 4 && (
        <DetailProduct setCartItem={setCartItem} cartItem={cartItem} />
      )}
      {page == 5 && (
        <CartPage
          cartItem={cartItem}
          totalDolar={totalDolar}
          setCartItem={setCartItem}
          setPageProduct={setPageProduct}
        />
      )}
      {page == 6 && <ProfileUser />}
      <News />
      <FooterComponans />
    </>
  );
}

export default ProductHome;
