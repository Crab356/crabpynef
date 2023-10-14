import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getProductThunk } from "../../slice/getProductsSlice";
import { api } from "../../axios-instance";
import PaginationProduct from "../PaginationProduct";
import { ProductsType } from "../modal/ModalProduct";
import { getIdProductThunk } from "../../slice/getIdProductSlice";
import LoadingLogic from "../Loading";

function HomeProducts({
  searchHome,
  setPageProduct,
}: {
  searchHome?: string;
  setPageProduct: (val: number) => void;
}) {
  const pageSize = 12;
  const dispatch = useDispatch();
  const { productsList, isLoading } = useSelector((store) => store.getProducts);
  const [idHeart, setIdHeart] = useState([]);
  const [productPageList, setProductPageList] = useState<Array<ProductsType>>(
    []
  );
  const searchProducts = productsList.filter((e) => {
    if (e.name.toLowerCase().includes(searchHome?.toLowerCase())) {
      return e;
    }
  });
  const [pagination, setpagination] = useState({
    total: 0,
    sliceFrom: 0,
    sliceTo: pageSize,
    currentPage: 1,
  });

  useEffect(() => {
    setProductPageList(
      productsList.slice(pagination.sliceFrom, pagination.sliceTo)
    );
    setpagination({ ...pagination, total: productsList.length });
  }, [productsList, pagination.sliceTo, pagination.sliceFrom]);

  async function HeartClick(data: any) {
    setIdHeart([...idHeart, data.id]);
    await api
      .get(`/products/${data.id}`)
      .then((res) => {
        api
          .put(`/products/${res.data.id}`, {
            ...res.data,
            like: res.data.like + 1,
          })
          .then(() => {
            getProducts();
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  async function HeartCloseClick(data: any) {
    setIdHeart(idHeart.filter((i) => i != data.id));
    await api
      .get(`/products/${data.id}`)
      .then((res) => {
        api
          .put(`/products/${res.data.id}`, {
            ...res.data,
            like: res.data.like - 1,
          })
          .then(() => {
            getProducts();
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function getProducts() {
    dispatch(getProductThunk(""));
  }
  useEffect(() => {
    getProducts();
  }, []);

  function Ondetail(data) {
    dispatch(getIdProductThunk(data));
    setPageProduct(4);
  }
  return (
    <>
      {/* {isLoading && <LoadingLogic />} */}
      {searchHome == undefined && (
        <>
          <HeadingProduct>NEW ARRIVAL ITEM</HeadingProduct>
          <DivLine></DivLine>
        </>
      )}
      <div className="container">
        {searchHome && <h5>Search for: "{searchHome}"</h5>}
        <div className="row g-4">
          {(searchHome ? searchProducts : productPageList).map(
            (item, index) => (
              <div
                className="col-6 col-sm-6 col-xl-3 col-lg-3 col-md-4"
                key={item.id}
              >
                <ProductBox>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => Ondetail(item.id)}
                  >
                    <BoxImg>
                      <ImgProduct src={item.productimg} />
                    </BoxImg>
                    <SaleProduct>
                      {item.sale != 0 && <PriceSaleP>-{item.sale}%</PriceSaleP>}
                    </SaleProduct>
                    <ProductHead>{item.name}</ProductHead>
                  </div>
                  <DescripProductBox>
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
            )
          )}
        </div>
        <StylePagination>
          {searchHome == undefined && (
            <PaginationProduct
              pagination={pagination}
              setPagination={setpagination}
              page={pageSize}
            />
          )}
        </StylePagination>
      </div>
    </>
  );
}

export default HomeProducts;

const StylePagination = styled.div`
  margin: 50px 0;
`;

const ImgProduct = styled.img`
  width: 100%;
  border-radius: 20px;
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
  text-transform: uppercase;
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
  border-top: 1px solid #c3c3c3;
  border-bottom: 1px solid #c3c3c3;
  &:hover {
    transform: scale(0.95, 0.95);
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
  cursor: pointer;
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
