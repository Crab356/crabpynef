import { useNavigate } from "react-router-dom";
import { CheckLoginRole, checkLoginRole } from "../CheckLogin";

const Home = () => {
  const naviga = useNavigate();
  CheckLoginRole();

  return (
    <>
      <div className="header-home">
        <div>
          <h3 className="logo-home">CrabPynef</h3>
        </div>
        <div>
          <button className="btn-home" onClick={() => naviga("/login")}>
            Login
          </button>
          <button className="btn-home" onClick={() => naviga("/register")}>
            Register
          </button>
        </div>
      </div>
      <div className="container body-home">
        <div className="banner1-home">
          <div className="banner1-img2"></div>
          <div className="banner1-block1"></div>
          <div className="banner1-block2"></div>
          <div className="description_banner1-home">
            <h1 className="heading1-home">Style Tips For Women In Business</h1>
            <p className="descrip1-home">
              The “what to wear to work” dilemma is one many of us business
              women face. How we handle this will impact how others view us.
            </p>
            <button className="btn-banner1">learn more</button>
          </div>
          <div className="banner1-img1"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
