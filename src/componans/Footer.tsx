import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logOutAccount } from "../slice/loginSlice";
import { useNavigate } from "react-router-dom";

function Footer() {
  const [time, setTime] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();

    setTime({ year, month, day, hour, minute });
  }, []);

  function logoutUser() {
    dispatch(logOutAccount());
    navigate("/");
  }
  return (
    <>
      <FooterBox>
        <div className="container-xxl">
          <div className="row">
            <PtextAdmin className="col-6">
              Admin@admin--Page Managerment
              <BtnLogout onClick={logoutUser}>Logout</BtnLogout>
            </PtextAdmin>
            <PtextTime className="col-6">
              @{time.year}-{time.month}-{time.day} {time.hour}:{time.minute}
            </PtextTime>
          </div>
        </div>
      </FooterBox>
    </>
  );
}

export default memo(Footer);

const FooterBox = styled.div`
  background-color: #25292c;
  margin-top: 50px;
  padding: 15px 0 0;
  border-top: 1px solid black;
`;

const PtextAdmin = styled.p`
  text-align: left;
  padding: 0 10px;
  color: #838383;
  font-family: monospace;
  font-size: 12px;
  font-weight: 100;
`;

const PtextTime = styled.p`
  text-align: right;
  padding: 0 10px;
  color: #838383;
  font-size: 12px;
  font-weight: 100;
`;

const BtnLogout = styled.button`
  border: none;
  color: white;
  background-color: #838383;
  margin-left: 20px;
  border-radius: 10px;
  color: #000000;

  &:hover {
    background-color: #3d3d3d;
    color: white;
  }
`;
