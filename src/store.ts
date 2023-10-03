import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./slice/RegisterSlice";
import loginSlice from "./slice/loginSlice";
import getProductSlice from "./slice/getProductsSlice";
import createProductSlice from "./slice/createProductSlice";
import getIdProductSlice from "./slice/getIdProductSlice";
import editProductSlice from "./slice/editProductSlice";
import deleteProductSlice from "./slice/deleteProductSlice";
import getUserSlice from "./slice/getUserSlice";
import removeUserSlice from "./slice/removeUserSlice";
import forgotPassSlice from "./slice/forgotPassSlice";

export default configureStore({
  reducer: {
    regisUser: registerSlice,
    logSlide: loginSlice,
    getProducts: getProductSlice,
    createProduct: createProductSlice,
    getIdProduct: getIdProductSlice,
    editProduct: editProductSlice,
    deleteProduct: deleteProductSlice,
    getUser: getUserSlice,
    deleteUser: removeUserSlice,
    fogotPass: forgotPassSlice,
  },
});
