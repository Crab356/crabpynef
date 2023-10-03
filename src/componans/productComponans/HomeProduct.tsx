import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getProductThunk } from "../../slice/getProductsSlice";

function HomeProducts() {
  const dispatch = useDispatch();
  const { productsList } = useSelector((store) => store.getProducts);

  const [idHeart, setIdHeart] = useState([]);
  console.log(idHeart);

  function HeartClick(data: any) {
    setIdHeart([...idHeart, data.id]);
  }
  function HeartCloseClick(data: any) {
    setIdHeart(idHeart.filter((i) => i != data.id));
  }
  function getProducts() {
    dispatch(getProductThunk());
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <HeadingProduct>NEW ARRIVAL ITEM</HeadingProduct>
      <DivLine></DivLine>
      <div className="container">
        <div className="row g-3">
          {productsList.map((item, index) => (
            <div
              className="col-6 col-sm-6 col-xl-3 col-lg-3 col-md-4"
              key={item.id}
            >
              <ProductBox>
                <BoxImg>
                  <ImgProduct src={item.productimg} />
                </BoxImg>
                <SaleProduct>
                  {item.sale != 0 && <PriceSaleP>-{item.sale}%</PriceSaleP>}
                </SaleProduct>
                <DescripProductBox>
                  <ProductHead>{item.name}</ProductHead>
                  <ProductLine></ProductLine>
                  <BoxAcProduct>
                    <ProductPrice>${item.price}</ProductPrice>
                    <ProductPrice>
                      {idHeart.find((i) => i == item.id) ? (
                        <IconHeart
                          className="fa-solid fa-heart"
                          onClick={() =>
                            HeartCloseClick({ id: item.id, like: item.like })
                          }
                        ></IconHeart>
                      ) : (
                        <IconHeart
                          className="fa-regular fa-heart"
                          onClick={() =>
                            HeartClick({ id: item.id, like: item.like })
                          }
                        ></IconHeart>
                      )}

                      {item.like}
                    </ProductPrice>
                  </BoxAcProduct>
                  {item.quanlity == 0 ? (
                    <SoldOut>Sold Out</SoldOut>
                  ) : (
                    <QuanlityProduct>
                      Remaining: {item.quanlity}
                    </QuanlityProduct>
                  )}
                </DescripProductBox>
              </ProductBox>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeProducts;

const ImgProduct = styled.img`
  width: 100%;
`;

const BoxImg = styled.div`
  height: 247px;
  @media screen and (max-width: 1200px) {
    height: 200px;
  }
  @media screen and (max-width: 768px) {
    height: 240px;
  }
  @media screen and (max-width: 576px) {
    height: 210px;
  }
`;
const ProductHead = styled.h5`
  font-family: monospace;
  text-align: center;
  font-size: 18px;
  min-height: 44px;
`;

const SoldOut = styled.p`
  width: 50%;
  margin: 0 auto;
  background-color: #e2cabd;
  text-align: center;
  font-weight: 500;
  border-radius: 5px;
`;
const QuanlityProduct = styled.p`
  font-family: monospace;
  margin: 0;
  text-align: center;
`;
const SaleProduct = styled.div`
  position: absolute;
  top: 5%;
  left: 0;
  background-color: #e55473;
  border-radius: 0 10px 10px 0;
`;
const PriceSaleP = styled.p`
  font-family: monospace;
  margin: 0;
  padding: 0 5px;
`;

const ProductBox = styled.div`
  position: relative;
  background-color: white;
  border-radius: 20px;
  padding: 10px;
  border-bottom: 1px solid #c3c3c3;
  &:hover {
    transform: scale(0.95, 0.95);
    cursor: pointer;
  }
`;

const DescripProductBox = styled.div``;

const ProductLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e2cabd;
`;
const BoxAcProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductPrice = styled.p`
  font-family: monospace;
  padding: 10px;
  margin: 0;
`;
const IconHeart = styled.i`
  padding: 0 10px;
  color: red;
`;

const HeadingProduct = styled.h3`
  margin-top: 30px;
  text-align: center;
  font-family: monospace;
`;

const DivLine = styled.div`
  border-radius: 20px;
  height: 5px;
  width: 150px;
  background-color: #e2cabd;
  margin: 0 auto 20px;
`;
