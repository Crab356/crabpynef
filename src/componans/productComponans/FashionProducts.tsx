import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { getProductThunk } from "../../slice/getProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ProductsType } from "../modal/ModalProduct";
import { api } from "../../axios-instance";
import PaginationProduct from "../PaginationProduct";
import LoadingLogic from "../Loading";

function FashionProducts({ getRedux }: { getRedux: string }) {
  const [priceSearch, setPriceSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const pageSize = 6;
  const dispatch = useDispatch();
  const { productsList, isLoading } = useSelector((store) => store.getProducts);
  const [idHeart, setIdHeart] = useState([]);
  const [productPageList, setProductPageList] = useState<Array<ProductsType>>(
    []
  );
  const lengthSearch = productsList.filter((i) => {
    if (
      (priceSearch == "" ? i : i.price <= priceSearch == true) &&
      i.name.toLowerCase().includes(nameSearch.toLowerCase())
    ) {
      return i;
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
    dispatch(getProductThunk(getRedux));
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {isLoading && <LoadingLogic />}
      <BannerDiv>
        <HeadingBanner>{getRedux} Products</HeadingBanner>
      </BannerDiv>
      <div style={{ margin: "50px 0 25px" }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3">
              <Rownavbar className="row g-4">
                <BoxSearch className=" col-xl-12">
                  <SearchInput
                    placeholder="Search Item"
                    onChange={(e) => setNameSearch(e.target.value)}
                  />
                  <IconSearch className="fa-solid fa-magnifying-glass"></IconSearch>
                </BoxSearch>
                <BoxSearch className="col-xl-12">
                  <HeadingNavbar>Price:</HeadingNavbar>
                  <SearchInput
                    placeholder="Price: from $0 to ..."
                    type="number"
                    onChange={(e) => setPriceSearch(e.target.value)}
                  />
                  <NavbarP>
                    Price: $0 {priceSearch != "" && `to $${priceSearch}`}
                  </NavbarP>
                </BoxSearch>
                <BoxSearch className="col-xl-12">
                  <HeadingNavbar>Category:</HeadingNavbar>
                  <NavbarP>Clothing</NavbarP>
                  <NavbarP>Bags</NavbarP>
                  <NavbarP>Shoes</NavbarP>
                  <NavbarP>Jewelry</NavbarP>
                  <NavbarP>Accessories</NavbarP>
                  <NavbarP>Gift Store</NavbarP>
                  <NavbarP>Food / Drink Store</NavbarP>
                  <NavbarP>Watch</NavbarP>
                  <NavbarP>Other</NavbarP>
                </BoxSearch>
                <BoxSearch className="col-xl-12">
                  <HeadingNavbar>Tags:</HeadingNavbar>
                  <NavbarP>
                    Clothing / Bags / Shoes / Jewelry / Accessories / Gift Store
                    /Food / Drink Store / Watch / Other
                  </NavbarP>
                </BoxSearch>
              </Rownavbar>
            </div>
            <div className="col-sm-12 col-md-8 col-lg-9 col-xl-9">
              <div className="row g-4">
                <BoxSearch className="col-12">
                  <p style={{ margin: "0" }}>
                    <Pcolor>{lengthSearch.length}</Pcolor> Product Found of{" "}
                    <Pcolor>{pagination.total}</Pcolor>
                  </p>
                </BoxSearch>
                {(nameSearch == "" && priceSearch == ""
                  ? productPageList
                  : lengthSearch
                ).map((item, index) => (
                  <div
                    className="col-6 col-sm-6 col-xl-4 col-lg-4 col-md-6"
                    key={item.id}
                  >
                    <ProductBox>
                      <div style={{ cursor: "pointer" }}>
                        <BoxImg>
                          <ImgProduct src={item.productimg} />
                        </BoxImg>
                        <SaleProduct>
                          {item.sale != 0 && (
                            <PriceSaleP>-{item.sale}%</PriceSaleP>
                          )}
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
                                  HeartCloseClick({
                                    id: item.id,
                                    like: item.like,
                                  })
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
              {nameSearch == "" && priceSearch == "" && (
                <StylePagination>
                  <PaginationProduct
                    pagination={pagination}
                    setPagination={setpagination}
                    page={pageSize}
                  />
                </StylePagination>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(FashionProducts);

const Rownavbar = styled.div``;
const BoxSearch = styled.div`
  position: relative;
  margin-bottom: 30px;
  @media screen and (max-width: 768px) {
    &:nth-child(3) {
      display: none;
    }
    &:nth-child(4) {
      display: none;
    }
  }
`;

const StylePagination = styled.div`
  margin: 50px 0;
`;

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

const Pcolor = styled.p`
  margin: 0;
  color: #d8a991;
  display: inline-block;
`;
const NavbarP = styled.p`
  margin: 0;
  font-size: 14px;
  color: gray;
  line-height: 30px;
`;
const HeadingNavbar = styled.h6`
  border-bottom: 1px solid #d6d6d6;
  padding-bottom: 5px;
`;

const SearchInput = styled.input`
  padding: 5px 10px;
  border: 1px solid #c3c3c3;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const IconSearch = styled.i`
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translate(0%, -50%);
  color: #c3c3c3;
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
