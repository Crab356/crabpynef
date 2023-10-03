import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIdProductThunk } from "../slice/getIdProductSlice";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import LoadingLogic from "../componans/Loading";
import ModalProduct from "../componans/modal/ModalProduct";
import { CheckNotifiContext } from "../App";
import CheckNotification from "../componans/modal/CheckNotifi";
import { setStatus } from "../slice/editProductSlice";
import ModalDelete from "../componans/modal/ModalDelete";
import { setStatusDelete } from "../slice/deleteProductSlice";
import { CheckLoginPage, checkLoginAdmin } from "../CheckLogin";

function DetailManagerProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const productId = params.productId;
  const { product, isLoading } = useSelector((state) => state.getIdProduct);
  const [isModal, setModal] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [productChoose, setProductChoose] = useState();
  const { isLoadingEdit, statusEdit } = useSelector(
    (state) => state.editProduct
  );
  const { statusDelete } = useSelector((state) => state.deleteProduct);
  const editContext = useContext(CheckNotifiContext);
  const { isCheckNotifi, setCheckNotifi, checkNotification } = editContext;

  CheckLoginPage();
  checkLoginAdmin();

  function modalHander() {
    if (isModal === true) {
      setProductChoose(undefined);
      setModal(!isModal);
    } else {
      setModal(!isModal);
    }
  }
  function deleteHander() {
    if (isDelete === true) {
      setProductChoose(undefined);
      setDelete(!isDelete);
    } else {
      setDelete(!isDelete);
    }
  }
  useEffect(() => {
    if (statusEdit == "success") {
      setCheckNotifi(1);
      dispatch(setStatus("default"));
      modalHander();
      getIdProduct();
    } else if (statusEdit == "unsuccess") {
      setCheckNotifi(2);
      dispatch(setStatus("default"));
      modalHander();
    }
  }, [statusEdit]);

  useEffect(() => {
    checkNotification();
  }, [isCheckNotifi == 1 || isCheckNotifi == 2]);

  function editClick() {
    setProductChoose(product);
    modalHander();
  }
  function deleteClick() {
    deleteHander();
    setProductChoose(product);
  }
  useEffect(() => {
    if (statusDelete == "success") {
      deleteHander();
      dispatch(setStatusDelete("default"));
      navigate("/adminPage");
      setProductChoose(undefined);
    } else if (statusDelete == "unsuccess") {
      setProductChoose(undefined);
      dispatch(setStatusDelete("default"));
      alert("Thất bại");
    }
  }, [statusDelete]);

  async function getIdProduct() {
    dispatch(getIdProductThunk(productId));
  }

  useEffect(() => {
    getIdProduct();
  }, []);

  return (
    <>
      {isDelete && (
        <ModalDelete productChoose={productChoose} closeDelete={deleteHander} />
      )}
      {isModal && (
        <ModalProduct
          modalHander={modalHander}
          title="Edit"
          productChoose={productChoose}
        />
      )}
      {(isLoading || isLoadingEdit) && <LoadingLogic />}
      {isCheckNotifi == 1 && (
        <CheckNotification
          icon="fa-solid fa-circle-check fa-2xl text_notifi-sc"
          message="Edit Product is successful"
          colorBorder="notif-box-cs"
        />
      )}
      {isCheckNotifi == 2 && (
        <CheckNotification
          icon="fa-solid fa-circle-exclamation fa-2xl text_notifi-usc"
          message="Edit Product is unsuccessful"
          colorBorder="notif-box-ucs"
        />
      )}
      <div className="banner_manager">
        <h2>Management</h2>
        <h5>
          <a onClick={() => navigate("/adminPage")}>Product</a> / Detail
        </h5>
      </div>
      <div className=" product__box container ">
        <div className="row">
          <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-12">
            <BorderImg>
              <StyleImg src={product.productimg} />
            </BorderImg>
          </div>
          <div className="col-xl-7 col-lg-7 col-md-7 col-sm-6 col-12">
            <InfoProduct>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Sale: {product.sale}%</p>
              {product.quanlity == 0 ? (
                <p>Quanlity: Sold out</p>
              ) : (
                <p>Quanlity: {product.quanlity} of them</p>
              )}
              <p>Category: {product.category}</p>
              <p>
                <i className="fa-solid fa-heart" style={{ color: "red" }}></i>{" "}
                {product.like}
              </p>
            </InfoProduct>
            <BoxBtn>
              <Btnbtn onClick={deleteClick}>Delete</Btnbtn>
              <Btnbtn onClick={editClick}>Edit</Btnbtn>
            </BoxBtn>
          </div>
        </div>
      </div>
      <div className="container">
        <b style={{ margin: "30px 0 0", display: "block" }}>DESCRIPTION:</b>
        <Description>{product.description}</Description>
      </div>
    </>
  );
}

export default DetailManagerProduct;

const BorderImg = styled.div`
  border-right: 1px solid black;
`;
const StyleImg = styled.img`
  max-width: 100%;
`;
const InfoProduct = styled.div`
  padding: 0 0 0 20px;
`;

const BoxBtn = styled.div``;
const Btnbtn = styled.button`
  border: none;
  padding: 5px 20px;
  margin-left: 20px;
  border-radius: 20px;
  float: right;
  background-color: #d9d9d9;
  &:hover {
    background-color: #c3c3c3;
  }
`;

const Description = styled.p`
  text-align: justify;
`;
