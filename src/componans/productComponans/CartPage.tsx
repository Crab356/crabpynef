import styled from "styled-components";
import { ProductsType } from "../modal/ModalProduct";
import { useDispatch } from "react-redux";
import { api } from "../../axios-instance";
import { useState } from "react";
import LoadingLogic from "../Loading";
import { CheckoutThunk } from "../../slice/CheckOutSlice";
import { toast } from "react-toastify";

function CartPage({
  cartItem,
  totalDolar,
  setCartItem,
  setPageProduct,
}: {
  cartItem: Array<ProductsType>;
  totalDolar: string;
  setCartItem: (val: Array<ProductsType>) => void;
  setPageProduct: (val: number) => void;
}) {
  const [isLoad, setLoad] = useState(false);
  const excise = cartItem.map(
    (item) => ((item.discount * item.buyquanlity) / 100) * 10
  );
  const totalExcise = excise
    .reduce((exc, curent) => exc + curent, 0)
    .toFixed(2);

  function DeleteCartClick(data: number) {
    setCartItem(cartItem.filter((item) => item.id != data));
  }

  async function CheckoutClick() {
    setLoad(true);
    for (const item of cartItem) {
      await api.get(`/products/${item.id}`).then((res) =>
        api.put(`/products/${res.data.id}`, {
          ...res.data,
          quanlity: res.data.quanlity - item.buyquanlity,
        })
      );
    }
    toast.info("Order Success");
    setLoad(false);
    setCartItem([]);
    setPageProduct(1);
  }

  return (
    <>
      {isLoad && <LoadingLogic />}
      <BannerDiv>
        <HeadingBanner>Cart Page</HeadingBanner>
      </BannerDiv>
      <div className="container">
        {cartItem.length ? (
          <RowCart className="row g-5">
            <div className="col-lg-8">
              <HeadingCart>BAG</HeadingCart>
              {cartItem.map((item) => (
                <RowProduct className="row g-3" key={item.id}>
                  <div className="col-2">
                    <ImgProduct src={item.productimg} />
                  </div>
                  <div className="col-10">
                    <HeadingProduct>
                      <NameProduct>{item.name}</NameProduct>
                      <PriceProduct>
                        ${(item.discount * item.buyquanlity).toFixed(2)}
                      </PriceProduct>
                    </HeadingProduct>
                    <PProduct>Category: {item.category}</PProduct>
                    <HeadingProduct>
                      <div>
                        <PProduct>Size: {item.size}</PProduct>
                        <PProduct>Quantity: {item.buyquanlity}</PProduct>
                      </div>
                      <DeleteStyle onClick={() => DeleteCartClick(item.id)}>
                        <i className="fa-solid fa-trash-can"></i>
                      </DeleteStyle>
                    </HeadingProduct>
                  </div>
                </RowProduct>
              ))}
            </div>
            <div className="col-lg-4">
              <HeadingCart>SUMMARY</HeadingCart>
              <HeadingProduct>
                <div>
                  <h6>Excise (10%): </h6>
                  <h6>Estimated Delivery & Handling: </h6>
                </div>
                <div style={{ textAlign: "right" }}>
                  <h6>${totalExcise}</h6>
                  <h6>FREE</h6>
                </div>
              </HeadingProduct>
              <TotalDiv>
                <h5>Total</h5>
                <h5>
                  ${(parseInt(totalDolar) + parseInt(totalExcise)).toFixed(2)}
                </h5>
              </TotalDiv>
              <BTNCheckout onClick={CheckoutClick}>Checkout</BTNCheckout>
              <BTNCheckout>Credit Cart</BTNCheckout>
            </div>
          </RowCart>
        ) : (
          <NoneCart>
            <h5>Your shopping cart is empty, please add products</h5>
            <IconCartEmpty className="fa-solid fa-cart-plus fa-2xl"></IconCartEmpty>
          </NoneCart>
        )}
      </div>
    </>
  );
}

export default CartPage;

const BTNCheckout = styled.button`
  width: 100%;
  border: none;
  margin: 5px 0;
  padding: 10px 0;
  border-radius: 5px;
  background-color: #d9d9d9;
  &:hover {
    background-color: #c3c3c3;
  }
`;
const TotalDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  padding: 20px 0;
  margin-bottom: 15px;
`;
const DeleteStyle = styled.div`
  cursor: pointer;
`;
const PProduct = styled.p`
  display: inline-block;
  color: gray;
  padding-right: 20px;
  margin: 0;
`;

const NameProduct = styled.h4`
  text-transform: uppercase;
  padding-right: 20px;
`;
const PriceProduct = styled.h5`
  color: #e55473;
`;
const HeadingProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImgProduct = styled.img`
  width: 100%;
`;

const RowProduct = styled.div`
  padding: 10px 0 5px;
  border-bottom: 1px solid #dddddd;
`;

const HeadingCart = styled.h4`
  margin: 10px 0 20px;
`;

const RowCart = styled.div`
  margin: 50px 0;
`;
const NoneCart = styled.div`
  text-align: center;
  margin: 60px 0;
`;
const IconCartEmpty = styled.i`
  font-size: 100px;
  margin-top: 100px;
`;

const BannerDiv = styled.div`
  background-color: #f1f1f1;
  width: 100%;
  height: 100px;
  padding: 30px 0;
`;
const HeadingBanner = styled.h3`
  font-family: sans-serif;
  font-weight: 600;
  text-align: center;
  margin: 0;
`;
