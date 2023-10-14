import { useSelector } from "react-redux";
import styled from "styled-components";
import LoadingLogic from "../Loading";
import { useRef, useState } from "react";
import { ProductsType } from "../modal/ModalProduct";
import { toast } from "react-toastify";

function DetailProduct({
  setCartItem,
  cartItem,
}: {
  cartItem: Array<ProductsType>;
  setCartItem: (val: Array<ProductsType>) => void;
}) {
  const { product, isLoading } = useSelector((store) => store.getIdProduct);
  const discount = (
    product.price -
    (product.price / 100) * product.sale
  ).toFixed(2);
  const SizeRef = useRef(null);
  const [BuyQuanlity, setBuyQuanlity] = useState<number>(1);
  const [isQuanAdd, setQuanAdd] = useState(false);

  function minusQuan() {
    if (BuyQuanlity > 0) {
      setBuyQuanlity(() => BuyQuanlity - 1);
    }
  }
  function plusQuan() {
    if (BuyQuanlity < product.quanlity) {
      setBuyQuanlity(() => BuyQuanlity + 1);
    }
  }
  function addToCart() {
    toast.info("Add to cart successfully");
    if (BuyQuanlity == 0) {
      setQuanAdd(true);
    } else {
      const size = SizeRef.current?.value;
      setQuanAdd(false);
      const cartDup = cartItem.find(
        (item) => item.id == product.id && item.size == size
      );
      const newCartDup = cartItem.filter((item) => item !== cartDup);
      if (cartDup) {
        setCartItem([
          ...newCartDup,
          { ...cartDup, buyquanlity: cartDup.buyquanlity + BuyQuanlity },
        ]);
      } else
        setCartItem([
          ...cartItem,
          {
            ...product,
            buyquanlity: BuyQuanlity,
            size: size,
            discount: discount,
          },
        ]);
    }
  }
  return (
    <>
      {isLoading && <LoadingLogic />}
      <BannerDiv>
        <HeadingBanner>Detail Product</HeadingBanner>
      </BannerDiv>
      <Container className="container">
        <div className="row g-4">
          <ImgColBox className="col-sm-12 col-md-5">
            <ImgDetail src={product.productimg} />
            {product.sale != 0 && <SaleProduct>-{product.sale}%</SaleProduct>}
          </ImgColBox>
          <DetailCol className="col-sm-12 col-md-7">
            <NameProduct>{product.name}</NameProduct>
            {product.sale == 0 ? (
              <PriceDisplay>${product.price}</PriceDisplay>
            ) : (
              <>
                <PriceOld>${product.price} </PriceOld>
                <PriceDisplay>${discount}</PriceDisplay>
              </>
            )}
            <LikeQuanlity>
              <IconLike className="fa-brands fa-gratipay fa-sm"></IconLike>{" "}
              {product.like}
            </LikeQuanlity>
            <Description>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
              rerum provident aut beatae blanditiis minus quia iste aliquam
              omnis sed excepturi dolo. Lorem ipsum dolor sit
            </Description>
            <h6 style={{ display: "inline-block" }}>Size:</h6>
            <SizeStyle ref={SizeRef}>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </SizeStyle>
            {product.quanlity == 0 ? (
              <ActionCart>
                <ChangeQuan onClick={minusQuan}>-</ChangeQuan>
                <Quan>0</Quan>
                <ChangeQuan onClick={plusQuan}>+</ChangeQuan>
                <BTNAddCart style={{ backgroundColor: "grey" }}>
                  Sold Out
                </BTNAddCart>
              </ActionCart>
            ) : (
              <ActionCart>
                <ChangeQuan onClick={minusQuan}>-</ChangeQuan>
                <Quan>{BuyQuanlity}</Quan>
                <ChangeQuan onClick={plusQuan}>+</ChangeQuan>
                <BTNAddCart onClick={addToCart}>Add to cart</BTNAddCart>
              </ActionCart>
            )}
            {isQuanAdd && (
              <ErrorQuan>Quantity must be greater than 0</ErrorQuan>
            )}
            <h6 style={{ marginTop: "20px" }}>
              Share:{" "}
              <IconEndStyle className="fa-brands fa-facebook-f"></IconEndStyle>
              <IconEndStyle className="fa-brands fa-twitter"></IconEndStyle>
              <IconEndStyle className="fa-brands fa-instagram"></IconEndStyle>
              <IconEndStyle className="fa-brands fa-tiktok"></IconEndStyle>
            </h6>
            <div>
              <PStyle>SKU:</PStyle>
              <P2Style>12D03K18A10</P2Style>
            </div>
            <div>
              <PStyle>Category:</PStyle>
              <P2Style>{product.category}</P2Style>
            </div>
            <div>
              <PStyle>Tag:</PStyle>
              <P2Style>Beauty, Trend, Style</P2Style>
            </div>
          </DetailCol>
        </div>
        <DescripEnd>{product.description}</DescripEnd>
      </Container>
    </>
  );
}

export default DetailProduct;
const ErrorQuan = styled.p`
  margin: 0;
  font-size: 12px;
  color: red;
`;

const P2Style = styled.p`
  display: inline-block;
  margin: 0;
  font-size: 14px;
`;
const PStyle = styled.p`
  color: gray;
  min-width: 80px;
  margin: 0;
  font-size: 14px;
  display: inline-block;
`;

const IconEndStyle = styled.i`
  padding: 0 10px;
  font-size: 14px;
  color: gray;
`;
const BTNAddCart = styled.button`
  margin-left: 20px;
  border: none;
  color: white;
  background-color: #e75373;
  padding: 0 10px;
  font-size: 14px;
  height: 30px;
  &:hover {
    background-color: #af5e70;
  }
`;

const Quan = styled.p`
  padding: 3px 10px;
`;
const ChangeQuan = styled.p`
  padding: 2px 10px;
  background-color: #d9d9d9;
  cursor: pointer;
  border-radius: 5px;
  user-select: none;
  &:hover {
    background-color: #c3c3c3;
  }
`;
const ActionCart = styled.div`
  display: flex;
  margin-top: 20px;
`;

const SizeStyle = styled.select`
  margin-left: 10px;
  border: none;
  border-bottom: 2px solid pink;
  &:focus {
    outline: none;
  }
`;
const Description = styled.p`
  font-size: 14px;
  text-align: justify;
  @media screen and (max-width: 992px) {
    display: none;
  }
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
const IconLike = styled.i`
  color: red;
`;
const LikeQuanlity = styled.p`
  margin-bottom: 10px;
`;
const DescripEnd = styled.p`
  text-align: center;
  margin-top: 50px;
`;
const PriceOld = styled.p`
  text-decoration: line-through;
  display: inline-block;
  color: gray;
  margin-right: 10px;
`;
const PriceDisplay = styled.h5`
  color: #e55473;
  display: inline-block;
`;
const NameProduct = styled.h4`
  margin-bottom: 15px;
  text-transform: uppercase;
`;
const DetailCol = styled.div`
  padding: 10px 20px;
  border-left: 1px solid #e55473;
  @media screen and (max-width: 768px) {
    border: none;
    border-top: 1px solid #e55473;
    border-bottom: 1px solid #e55473;
  }
`;
const Container = styled.div`
  margin: 50px auto 30px;
`;
const ImgColBox = styled.div`
  position: relative;
`;
const SaleProduct = styled.p`
  position: absolute;
  top: 0;
  right: 10px;
  padding: 1px 5px;
  background-color: #9cc55d;
  color: white;
  font-size: 14px;
`;

const ImgDetail = styled.img`
  width: 100%;
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
