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
        <div className="banner-home">
          <div className="row rowToCol g-5">
            <div className="col-12 col-sm-6">
              <div className="img1"></div>
              <div className="des-1">
                <h3>Style Tips For Women In Business</h3>
                <p>
                  The “what to wear to work” dilemma is one many of us business
                  women face. How we handle this will impact how others view us.
                </p>
                <button className="btn-banner1">learn more</button>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="posisonRela">
                <div className="img2"></div>
                <div className="block1"></div>
                <div className="block2"></div>
              </div>
            </div>
          </div>
          <div className="row rowToCol" style={{ marginTop: "50px" }}>
            <div className="col-12 col-sm-6">
              <div className="posisonRela">
                <div className="img3"></div>
                <div className="block3"></div>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="img4"></div>
              <div className="des-1 des-2">
                <h3>New This Week</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam
                  nunc justo sagittis suscipit ultrices, sit amet, consectetur
                  adipiscing elit nullam nunc justo sagittis suscipit ultrices
                </p>
                <button className="btn-banner1">learn more</button>
              </div>
            </div>
          </div>
        </div>
        <div className="home__end">
          <h1>Subscribe To Our Newsletter</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc
            justo sagittis suscipit ultrices. Sample text. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit nullam nunc justo sagittis
            suscipit ultrices.
          </p>
          <input type="text" placeholder="Enter Your Name" />
          <input type="text" placeholder="Enter Your email" />
          <button>Submit</button>
        </div>
      </div>
      <div className="footer__Home">
        <div className="container">
          <div className="box-footer">
            <div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <h6>@CrabPynef Shop - SomeThing - Otc 14 2023</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
