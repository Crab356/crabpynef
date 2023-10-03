import { memo, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductThunk, setListProduct } from "../slice/getProductsSlice";
import ModalProduct, { ProductsType } from "./modal/ModalProduct";
import LoadingLogic from "./Loading";
import { CheckNotifiContext } from "../App";
import CheckNotification from "../componans/modal/CheckNotifi";
import { setStatus } from "../slice/createProductSlice";
import { useNavigate } from "react-router-dom";
import SearchProductManager from "./SearchProductManager";
import { Box, Pagination, Stack } from "@mui/material";
import PaginationProduct from "./PaginationProduct";
import styled from "styled-components";

function ManagerProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkNotifiProductAdd = useContext(CheckNotifiContext);
  const { productsList } = useSelector((state) => state.getProducts);
  const { isLoading, status } = useSelector((state) => state.createProduct);
  const [modal, setmodal] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const { isCheckNotifi } = checkNotifiProductAdd;
  const { setCheckNotifi } = checkNotifiProductAdd;

  const pageSize = 10;
  const [productsListPage, setProductsListPage] = useState<Array<ProductsType>>(
    []
  );
  const [pagination, setPagination] = useState({
    total: 0,
    sliceFrom: 0,
    sliceTo: pageSize,
    currentPage: 1,
  });

  useEffect(() => {
    if (productsList.length) {
      setProductsListPage(
        productsList.slice(pagination.sliceFrom, pagination.sliceTo)
      );
      setPagination({ ...pagination, total: productsList.length });
    }
  }, [productsList || pagination.sliceFrom, pagination.sliceTo]);

  useEffect(() => {
    setPagination({
      sliceFrom: 0,
      sliceTo: pageSize,
      currentPage: 1,
      total: productsList.length,
    });
  }, [searchName === "" && searchCategory === ""]);

  function modalHander() {
    setmodal(!modal);
  }

  // if (modal) {
  //   document.body.classList.add("active-modal");
  // } else {
  //   document.body.classList.remove("active-modal");
  // }

  function getProducts() {
    dispatch(getProductThunk());
  }
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (status == "success") {
      setCheckNotifi(1);
      dispatch(setStatus("default"));
      modalHander();
      getProducts();
    } else if (status == "unsuccess") {
      setCheckNotifi(2);
      dispatch(setStatus("default"));
      modalHander();
    }
  }, [status]);
  useEffect(() => {
    checkNotifiProductAdd?.checkNotification();
  }, [isCheckNotifi == 1 || isCheckNotifi == 2]);
  return (
    <div>
      <div className="banner_manager">
        <h2>Products Management</h2>
      </div>
      <div className="manager__control-box container">
        <SearchProductManager
          setSearchName={setSearchName}
          setSearchCategory={setSearchCategory}
          valueSelect1="Shoes"
          valueSelect2="Fashion"
          cate="Category"
        />
        <div>
          <button className="btn-manager" onClick={modalHander}>
            Add new
          </button>
        </div>
      </div>
      <div className="container product__table">
        <table className="table__manager">
          <tr>
            <th>#</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>SALE</th>
            <th>DISCOUNT</th>
            <th>QUANLITY</th>
            <th>CATEGORY</th>
            <th>ACTION</th>
          </tr>
          <tbody>
            {(searchName == "" && searchCategory == ""
              ? productsListPage
              : productsList.filter((i) => {
                  if (
                    i.name.toLowerCase().includes(searchName.toLowerCase()) &&
                    i.category
                      .toLowerCase()
                      .includes(searchCategory.toLowerCase())
                  ) {
                    return i;
                  }
                })
            ).map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.sale}%</td>
                <td>${((item.price / 100) * item.sale).toFixed(2)}</td>
                <td>{item.quanlity}</td>
                <td>{item.category}</td>
                <td>
                  <a
                    className="table__link"
                    onClick={() => navigate(`/manager_detail/${item.id}`)}
                  >
                    Detail
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PstyleNote>
          Page {pagination.currentPage} of{" "}
          {Math.ceil(productsList.length / pageSize)} total pages
        </PstyleNote>
        {searchName == "" && searchCategory == "" && (
          <PaginationProduct
            pagination={pagination}
            setPagination={setPagination}
            page={pageSize}
          />
        )}
      </div>
      {modal && <ModalProduct modalHander={modalHander} title="Add new" />}
      {isLoading && <LoadingLogic />}
      {isCheckNotifi == 1 && (
        <CheckNotification
          icon="fa-solid fa-circle-check fa-2xl text_notifi-sc"
          message="Add Product is successful"
          colorBorder="notif-box-cs"
        />
      )}
      {isCheckNotifi == 2 && (
        <CheckNotification
          icon="fa-solid fa-circle-exclamation fa-2xl text_notifi-usc"
          message="Add Product is unsuccessful"
          colorBorder="notif-box-ucs"
        />
      )}
    </div>
  );
}

export default ManagerProduct;

const PstyleNote = styled.p`
  font-size: 14px;
  border: 1px solid black;
  display: inline-block;
  padding: 0 10px;
  border-radius: 20px;
`;
