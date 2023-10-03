import { createContext, useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import Loginpage from "./page/Login";
import ProductHome from "./page/ProductPage";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import RegisterPage from "./page/Register";
import AdminPage from "./page/AdminPage";
import DetailManagerProduct from "./page/DetailManagerProduct";
import loginSlice, { setGetLocalStore } from "./slice/loginSlice";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Loginpage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/home_product",
    element: <ProductHome />,
  },
  {
    path: "/adminPage",
    element: <AdminPage />,
  },
  {
    path: "/manager_detail/:productId",
    element: <DetailManagerProduct />,
  },
]);

export const CheckNotifiContext = createContext(null);

function App() {
  const [isCheckNotifi, setCheckNotifi] = useState(0);

  const accountStore = store.getState();

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("localAccount"));
    if (localData) {
      store.dispatch(setGetLocalStore(localData));
    }
  }, [accountStore.logSlide.account === null]);

  function checkNotification() {
    if (isCheckNotifi > 0) {
      document.getElementById("notifi__status")?.classList.remove("off");
      document.getElementById("notifi__status")?.classList.add("on");
      setTimeout(() => {
        document.getElementById("notifi__status")?.classList.remove("on");
        document.getElementById("notifi__status")?.classList.add("off");
        setTimeout(() => {
          setCheckNotifi(0);
        }, 500);
      }, 2000);
    }
  }

  return (
    <>
      <Provider store={store}>
        <CheckNotifiContext.Provider
          value={{ isCheckNotifi, setCheckNotifi, checkNotification }}
        >
          <RouterProvider router={router} />
        </CheckNotifiContext.Provider>
      </Provider>
    </>
  );
}

export default App;
