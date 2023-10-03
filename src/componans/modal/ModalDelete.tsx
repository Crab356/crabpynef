import { memo, useEffect } from "react";
import styled from "styled-components";
import { ProductsType } from "./ModalProduct";
import { useDispatch, useSelector } from "react-redux";
import LoadingLogic from "../Loading";
import { deleteProductThunk } from "../../slice/deleteProductSlice";
import { getProductThunk } from "../../slice/getProductsSlice";

function ModalDelete({
  productChoose,
  closeDelete,
}: {
  closeDelete: () => void;
  productChoose?: ProductsType;
}) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.deleteProduct);
  console.log(productChoose?.id);

  async function deleteClick() {
    dispatch(deleteProductThunk(productChoose?.id));
  }
  return (
    <>
      {isLoading && <LoadingLogic />}
      <div className="overlay" onClick={() => closeDelete()}></div>
      <StyleModalDelete>
        <DeleteBox>
          <h5>Do You want to delete?</h5>
          <BtnDeletebox>
            <BtnDelete onClick={deleteClick}>YES</BtnDelete>
            <BtnDelete onClick={() => closeDelete()}>NO</BtnDelete>
          </BtnDeletebox>
        </DeleteBox>
      </StyleModalDelete>
    </>
  );
}

export default memo(ModalDelete);

const StyleModalDelete = styled.div`
  position: absolute;
  width: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 20px;
  z-index: 1;
`;

const DeleteBox = styled.div`
  padding: 10px 20px;
  text-align: center;
`;
const BtnDeletebox = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 10px;
`;

const BtnDelete = styled.button`
  border: none;
  padding: 5px 20px;
  margin: 0 20px;
  border-radius: 15px;
  background-color: #d9d9d9;
  &:hover {
    background-color: #c3c3c3;
  }
`;
