import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function CheckLoginPage() {
  const { isLogin } = useSelector((state) => state.logSlide);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin == "" || isLogin == "unsucces") {
      navigate("/login");
    }
  }, []);
}

export function CheckLoginRole() {
  const { isLogin, account } = useSelector((state) => state.logSlide);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin == "success" && account?.role == "user") {
      navigate("/home_product");
    } else if (isLogin == "success" && account?.role == "admin") {
      navigate("/adminPage");
    }
  }, [isLogin == "success"]);
}

export function checkLoginAdmin() {
  const { isLogin, account } = useSelector((state) => state.logSlide);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin == "success" && account?.role == "user") {
      navigate("/home_product");
    }
  }, []);
}

export function checkLoginUser() {
  const { isLogin, account } = useSelector((state) => state.logSlide);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin == "success" && account?.role == "admin") {
      navigate("/adminPage");
    }
  }, []);
}
