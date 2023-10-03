import { useState } from "react";
import HeaderSecond from "../componans/HeaderSecond";
import ManagerProduct from "../componans/ManagerProduct";
import { useSelector } from "react-redux";
import LoadingLogic from "../componans/Loading";
import ManagerUser from "../componans/ManagerAdmin";
import Footer from "../componans/Footer";
import { CheckLoginPage, checkLoginAdmin } from "../CheckLogin";

function AdminPage() {
  const [page, setPage] = useState(false);
  const { isLoading } = useSelector((state) => state.getProducts);
  // checkLoginPage();
  CheckLoginPage();
  checkLoginAdmin();
  return (
    <>
      {isLoading && <LoadingLogic />}

      <HeaderSecond setPage={setPage} />
      {page ? <ManagerUser /> : <ManagerProduct />}
      <Footer />
    </>
  );
}

export default AdminPage;
