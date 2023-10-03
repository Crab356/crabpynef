import ReactLoading from "react-loading";
import styled from "styled-components";

function LoadingLogic() {
  return (
    <>
      <Styleoverlay></Styleoverlay>
      <LoadingStyle>
        <ReactLoading type="bubbles" color="#e55473" height={70} width={70} />
      </LoadingStyle>
    </>
  );
}

export default LoadingLogic;

const LoadingStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;
const Styleoverlay = styled.div`
  background-color: rgba(128, 128, 128, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`;
