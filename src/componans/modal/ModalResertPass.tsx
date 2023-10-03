import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { forgotPassThunk, setStatusForgot } from "../../slice/forgotPassSlice";
import LoadingLogic from "../Loading";

const ModalResertPass = ({
  handleModalPass,
}: {
  handleModalPass: () => void;
}) => {
  const dispatch = useDispatch();
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [isError, setError] = useState(false);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const { isLoadingForgot, statusForgot } = useSelector(
    (store) => store.fogotPass
  );

  function HiddenPass() {
    setPasswordHidden(!passwordHidden);
  }

  function changeClick() {
    const email = emailRef.current?.value;
    const pass = passRef.current?.value;
    dispatch(forgotPassThunk({ mail: email, pass: pass }));
  }

  useEffect(() => {
    if (statusForgot == "success") {
      handleModalPass();
      dispatch(setStatusForgot("default"));
      alert("Change Password Success !!");
    } else if (statusForgot == "unsuccess") {
      setError(true);
    }
  }, [statusForgot]);

  return (
    <>
      {isLoadingForgot && <LoadingLogic />}

      <div className="overlay" onClick={() => handleModalPass()}></div>
      <StyleDiv>
        <BoxStyle>
          <HeadingStyle>Change Your password</HeadingStyle>
          <LabelStyle>Your Email:</LabelStyle>
          <InputStyle
            type="text"
            placeholder="Email"
            ref={emailRef}
          ></InputStyle>
          {isError && <PError>wrong email !!!</PError>}
          <LabelStyle>New Password:</LabelStyle>
          <div style={{ position: "relative" }}>
            <InputStyle
              type={passwordHidden ? "text" : "password"}
              placeholder="password"
              ref={passRef}
            ></InputStyle>
            {passwordHidden ? (
              <IconStyle
                className="fa-regular fa-eye-slash"
                onClick={HiddenPass}
              ></IconStyle>
            ) : (
              <IconStyle
                className="fa-solid fa-eye"
                onClick={HiddenPass}
              ></IconStyle>
            )}
          </div>
          <BtnBox>
            <BtnBtn onClick={changeClick}>Change</BtnBtn>
            <BtnBtn onClick={() => handleModalPass()}>Close</BtnBtn>
          </BtnBox>
        </BoxStyle>
      </StyleDiv>
    </>
  );
};

export default ModalResertPass;

const StyleDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: white;
  border-radius: 20px;
  width: 300px;
`;

const BoxStyle = styled.div`
  padding: 10px 20px;
`;
const HeadingStyle = styled.h4`
  padding: 5px 0 20px;
`;
const LabelStyle = styled.label``;
const InputStyle = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid #e2cabd;
  margin-bottom: 10px;
  &:focus {
    outline: none;
  }
  padding: 0 5px;
`;

const BtnBox = styled.div`
  margin: 20px 10px 10px;
  display: flex;
  justify-content: space-between;
`;
const BtnBtn = styled.button`
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
  background-color: #d9d9d9;
  &:hover {
    background-color: #c3c3c3;
  }
`;

const PError = styled.p`
  font-size: 14px;
  color: red;
`;

const IconStyle = styled.i`
  position: absolute;
  right: 0;
  color: #c0c6d4;
  cursor: pointer;
`;
