import { useContext, useEffect, useRef, useState } from "react";
import CheckNotification from "../componans/modal/CheckNotifi";
import { CheckNotifiContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../slice/loginSlice";
import LoadingLogic from "../componans/Loading";
import styled from "styled-components";
import { CheckLoginRole } from "../CheckLogin";
import ModalResertPass from "../componans/modal/ModalResertPass";

function LoginPage() {
  const emailUser = useRef(null);
  const passUser = useRef(null);
  const [isPassHiden, setPassHiden] = useState(false);
  const navigate = useNavigate();
  const checkRegisContext = useContext(CheckNotifiContext);
  const dispatch = useDispatch();
  const { loadingLogin, isLogin, account } = useSelector(
    (state) => state.logSlide
  );

  const [isModalPass, setModalPass] = useState(false);

  function handleModalPass() {
    setModalPass(!isModalPass);
  }

  CheckLoginRole();
  function passHidenHandle() {
    setPassHiden(false);
  }

  function passUnhidenHandle() {
    setPassHiden(true);
  }
  useEffect(() => {
    checkRegisContext?.checkNotification();
  }, [checkRegisContext?.isCheckNotifi == 1]);

  async function loginClick() {
    const emailU = emailUser.current?.value;
    const passU = passUser.current?.value;
    await dispatch(checkLogin({ emailU, passU })).unwrap();
  }

  return (
    <>
      {isModalPass && <ModalResertPass handleModalPass={handleModalPass} />}
      {loadingLogin && <LoadingLogic />}
      <div className="loginform">
        <h1 className="logo-form-login">CrabPynef</h1>

        <div className="box-input">
          <input type="text" placeholder="Enter your email" ref={emailUser} />
        </div>
        <div className="box-input">
          <input
            type={isPassHiden ? "text" : "password"}
            placeholder="Enter your password"
            ref={passUser}
          />
          {isPassHiden ? (
            <i
              className="fa-regular fa-eye-slash"
              onClick={passHidenHandle}
            ></i>
          ) : (
            <i className="fa-regular fa-eye" onClick={passUnhidenHandle}></i>
          )}
        </div>
        {isLogin == "unsuccess" && (
          <LoginWrong>email or password is wrong</LoginWrong>
        )}
        <ActionLogin>
          <a className="login_link-regis" onClick={handleModalPass}>
            You forgot Your password?
          </a>
          <span>|</span>
          <a className="login_link-regis" onClick={() => navigate("/register")}>
            Do not have an account ?
          </a>
        </ActionLogin>
        <button className="btn-login" onClick={loginClick}>
          Login
        </button>
      </div>
      {checkRegisContext?.isCheckNotifi == 1 && (
        <CheckNotification
          icon="fa-solid fa-circle-check fa-2xl text_notifi-sc"
          message="Register is success"
          colorBorder="notif-box-cs"
        />
      )}
    </>
  );
}
export default LoginPage;

const LoginWrong = styled.p`
  color: red;
  font-size: 14px;
`;

const ActionLogin = styled.div`
  margin-bottom: 40px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;
