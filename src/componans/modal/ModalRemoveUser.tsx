import styled from "styled-components";
import LoadingLogic from "../Loading";
import { useSelector } from "react-redux";

function ModalRemoveUser({
  setChooseId,
  handleModal,
  removeClick,
}: {
  setChooseId: (val: any) => void;
  removeClick: () => void;
  handleModal: () => void;
}) {
  const { isLoading } = useSelector((state) => state.deleteUser);
  function closeRemove() {
    setChooseId(undefined);
    handleModal();
  }
  return (
    <>
      {isLoading && <LoadingLogic />}
      <div className="overlay" onClick={() => closeRemove()}></div>
      <StyleModalDelete>
        <DeleteBox>
          <h5>Do You want to remove this User?</h5>
          <BtnDeletebox>
            <BtnDelete onClick={() => removeClick()}>YES</BtnDelete>
            <BtnDelete onClick={() => closeRemove()}>NO</BtnDelete>
          </BtnDeletebox>
        </DeleteBox>
      </StyleModalDelete>
    </>
  );
}

export default ModalRemoveUser;

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
