import { Avatar } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { api } from "../../axios-instance";
import { toast } from "react-toastify";
import { checkLogin } from "../../slice/loginSlice";

function ProfileUser() {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.logSlide);
  const [avatar, setAvatar] = useState(null);
  console.log(account);

  async function changeAvatarClick() {
    if (avatar) {
      await api.get(`/user/${account.id}`).then((res) =>
        api
          .put(`/user/${res.data.id}`, { ...res.data, avatar: avatar })
          .then(() => {
            toast.success("Successfully changed avatar");
            dispatch(
              checkLogin({ emailU: account.email, passU: account.password })
            );
          })
          .catch(() => toast.error("Fail changed avatar"))
      );
    } else {
      toast.warning("Please add avatars");
    }
  }
  return (
    <>
      <BannerDiv>
        <HeadingBanner>My Profile</HeadingBanner>
      </BannerDiv>
      <div className="container">
        <FormProfile>
          <AvatarBox>
            <Avatar
              alt={account?.username}
              src={avatar ? avatar : account?.avatar}
              sx={{ width: 200, height: 200 }}
            />
          </AvatarBox>
          <div style={{ margin: "10px 0" }}>
            <ChangeInputAvatar htmlFor="btn-avatar">
              Chose Avatar
            </ChangeInputAvatar>
            <input
              id="btn-avatar"
              type="file"
              hidden
              onChange={(e) =>
                setAvatar(URL.createObjectURL(e.target.files[0]))
              }
            />
            <BTNAvatar onClick={changeAvatarClick}>Change</BTNAvatar>
          </div>
          <div>
            <HeadingInfomation>INFOMATION</HeadingInfomation>
          </div>
          <BoxInfo>
            <h6>Full Name:</h6>
            <p style={{ margin: "0" }}>{account.fullname}</p>
          </BoxInfo>
          <BoxInfo>
            <h6>Username:</h6>
            <p style={{ margin: "0" }}>{account.username}</p>
          </BoxInfo>
          <BoxInfo>
            <h6>Email:</h6>
            <p style={{ margin: "0" }}>{account.email}</p>
          </BoxInfo>
          <BoxInfo>
            <h6>Phone Number:</h6>
            <p style={{ margin: "0" }}>{account.phonenumber}</p>
          </BoxInfo>
        </FormProfile>
      </div>
    </>
  );
}

export default ProfileUser;

const BoxInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  border-bottom: 1px solid #d4d4d4;
  padding: 10px 0 5px;
`;
const HeadingInfomation = styled.h5`
  text-decoration: underline;
  margin: 20px 0 15px;
  user-select: none;
`;
const AvatarBox = styled.div`
  border-bottom: 1px solid #d6d6d6;
  padding: 0 10px 10px;
`;
const BTNAvatar = styled.button`
  border: none;
  padding: 5px 10px;
  background-color: #d9d9d9;
  border-radius: 15px;
  &:hover {
    background-color: #c3c3c3;
  }
`;
const ChangeInputAvatar = styled.label`
  background-color: #e55473;
  padding: 5px 10px;
  user-select: none;
  cursor: pointer;
  margin-right: 20px;
  border-radius: 15px;
  &:hover {
    background-color: #e48ea0;
  }
`;
const FormProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BannerDiv = styled.div`
  background-color: #f1f1f1;
  width: 100%;
  height: 100px;
  padding: 30px 0;
  margin-bottom: 50px;
`;
const HeadingBanner = styled.h3`
  font-family: sans-serif;
  font-weight: 600;
  text-align: center;
  margin: 0;
`;
