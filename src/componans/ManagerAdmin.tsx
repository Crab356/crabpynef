import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../slice/getUserSlice";
import LoadingLogic from "./Loading";
import ModalRemoveUser from "./modal/ModalRemoveUser";
import { removeUserThunk } from "../slice/removeUserSlice";
import PaginationProduct from "./PaginationProduct";
import styled from "styled-components";
import { TypeUser } from "../page/Register";
import SearchProductManager from "./SearchProductManager";

function ManagerUser() {
  const pageSize = 10;
  const dispatch = useDispatch();
  const { userList, isLoading } = useSelector((store) => store.getUser);
  const [remove, setRemove] = useState(false);
  const [chooseId, setChooseId] = useState<number>();
  const [userListPage, setUserListPage] = useState<Array<TypeUser>>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchRole, setSearchRole] = useState("");

  const [pagination, setPagination] = useState({
    total: 0,
    sliceFrom: 0,
    sliceTo: pageSize,
    currentPage: 1,
  });

  function handleModal() {
    setRemove(!remove);
  }

  function getUsers() {
    dispatch(getUserThunk());
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (userList.length > 0) {
      setUserListPage(userList.slice(pagination.sliceFrom, pagination.sliceTo));
      setPagination({ ...pagination, total: userList.length });
    }
  }, [userList, pagination.sliceFrom, pagination.sliceTo]);

  useEffect(() => {
    setPagination({
      ...pagination,
      sliceFrom: 0,
      sliceTo: pageSize,
      currentPage: 1,
    });
  }, [searchValue == "" && searchRole == ""]);

  function deleteClick(data: number) {
    setChooseId(data);
    handleModal();
  }

  async function removeClick() {
    if (chooseId) {
      await dispatch(removeUserThunk(chooseId)).then(() => {
        setChooseId(undefined);
        handleModal();
        getUsers();
      });
    }
  }

  return (
    <div>
      {isLoading && <LoadingLogic />}
      <div className="banner_manager">
        <h2>Account Management</h2>
      </div>

      <div className="container product__table">
        <StyleSearchBox>
          <SearchProductManager
            setSearchName={setSearchValue}
            setSearchCategory={setSearchRole}
            valueSelect1="Admin"
            valueSelect2="User"
            cate="Role"
          />
        </StyleSearchBox>

        <table className="table__manager">
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>ACTION</th>
          </tr>
          <tbody>
            {(searchRole == "" && searchValue == ""
              ? userListPage
              : userList.filter((i) => {
                  if (
                    (i.fullname
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                      i.username
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                      i.email
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                      i.phonenumber
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())) &&
                    i.role.toLowerCase().includes(searchRole.toLowerCase())
                  ) {
                    return i;
                  }
                })
            ).map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.fullname}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phonenumber}</td>
                <td>{item.role}</td>
                <td>
                  <a
                    className="table__link"
                    onClick={() => deleteClick(item.id)}
                  >
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PstyleNote>
          Page {pagination.currentPage} of{" "}
          {Math.ceil(userList.length / pageSize)} total pages
        </PstyleNote>
        {searchValue == "" && searchRole == "" && (
          <PaginationProduct
            pagination={pagination}
            setPagination={setPagination}
            page={pageSize}
          />
        )}
      </div>
      {remove && (
        <ModalRemoveUser
          handleModal={handleModal}
          setChooseId={setChooseId}
          removeClick={removeClick}
        />
      )}
    </div>
  );
}

export default ManagerUser;

const PstyleNote = styled.p`
  font-size: 14px;
  border: 1px solid black;
  display: inline-block;
  padding: 0 10px;
  border-radius: 20px;
`;

const StyleSearchBox = styled.div`
  margin: 50px 0 20px 0;
`;
