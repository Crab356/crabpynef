import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CheckNotification from "../componans/modal/CheckNotifi";
import { CheckNotifiContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { createUser, setStatusRegis } from "../slice/RegisterSlice";
import Loadinglogic from "../componans/Loading";
import { CheckLoginRole } from "../CheckLogin";

const schema = yup.object({
  fullname: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().trim().required(),
  phonenumber: yup.string().length(10).required(),
  password: yup.string().min(10).max(50).required(),
  role: yup.string().required(),
});

export type TypeUser = {
  fullname: string;
  username: string;
  email: string;
  phonenumber: number;
  password: string;
  role: string;
  id?: number;
  avatar: string;
};
function RegisterPage() {
  const [isPassHiden, setPassHiden] = useState(false);
  const navigate = useNavigate();
  const checkRegisContext = useContext(CheckNotifiContext);
  const { isCheckNotifi } = checkRegisContext;
  const { setCheckNotifi } = checkRegisContext;
  const dispatch = useDispatch();
  const { statusRegis } = useSelector((state) => state.regisUser);
  CheckLoginRole();

  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitUser = (data: TypeUser) => {
    addUser({
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      phonenumber: data.phonenumber,
      password: data.password,
      role: data.role,
      avatar: "imgAvata",
    });
    resetField("fullname");
    resetField("email");
    resetField("password");
    resetField("phonenumber");
    resetField("username");
  };
  // CheckLoginRole();

  async function addUser(data: TypeUser) {
    await dispatch(createUser(data)).unwrap();
  }
  useEffect(() => {
    if (statusRegis == "success") {
      setCheckNotifi(1);
      navigate("/login");
      dispatch(setStatusRegis("default"));
    } else if (statusRegis == "false") {
      setCheckNotifi(2);
      dispatch(setStatusRegis("default"));
    }
  }, [statusRegis]);

  useEffect(() => {
    checkRegisContext?.checkNotification();
  }, [isCheckNotifi == 1]);

  function passHidenHandle() {
    setPassHiden(false);
  }
  function passUnhidenHandle() {
    setPassHiden(true);
  }

  return (
    <>
      <h1 className="logo-regis">CrabPynef</h1>
      <div className="register-form">
        <form onSubmit={handleSubmit(onSubmitUser)}>
          <input
            type="text"
            placeholder="Full Your name"
            {...register("fullname")}
          />
          {errors.fullname && (
            <p className="erorr-reg">{errors.fullname.message}</p>
          )}
          <input
            type="text"
            placeholder="Enter Your Username"
            {...register("username")}
          />
          {errors.username && (
            <p className="erorr-reg">{errors.username.message}</p>
          )}
          <input
            type="email"
            placeholder="Enter Your email"
            {...register("email")}
          />
          {errors.email && <p className="erorr-reg">{errors.email.message}</p>}
          <input
            type="number"
            placeholder="Enter Your phone number"
            {...register("phonenumber")}
          />
          {errors.phonenumber && (
            <p className="erorr-reg">{errors.phonenumber.message}</p>
          )}

          <div className="box-input">
            <input
              type={isPassHiden ? "text" : "password"}
              placeholder="Enter Your password"
              {...register("password")}
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
          {errors.password && (
            <p className="erorr-reg">{errors.password.message}</p>
          )}
          <input
            className="input_role"
            type="text"
            value="user"
            {...register("role")}
          />

          <a className="login_link-login" onClick={() => navigate("/login")}>
            you have an account !
          </a>
          <button type="submit" className="btn-login">
            Register
          </button>
        </form>
      </div>

      {statusRegis === "loading" && <Loadinglogic />}

      {isCheckNotifi == 2 && (
        <CheckNotification
          icon="fa-solid fa-circle-exclamation fa-2xl text_notifi-usc"
          message="Register is unsuccessful"
          colorBorder="notif-box-ucs"
        />
      )}
    </>
  );
}

export default RegisterPage;
