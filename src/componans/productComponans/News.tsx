import styled from "styled-components";
import img1 from "../../assets/img/Trending-Fashion-News.jpg";
import img2 from "../../assets/img/newShoes.png";
import img3 from "../../assets/img/spring-sale-banner-with-photo-hand-drawn-flowers_1188-294.jpg";
import { memo } from "react";

function News() {
  return (
    <>
      <div className="container" style={{ margin: "0 auto 30px" }}>
        <HeadingNews>LATEST NEWS</HeadingNews>
        <DivLine></DivLine>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-4">
            <NewBoxStyle>
              <BoxImg>
                <ImgStyle src={img3}></ImgStyle>
              </BoxImg>
              <DescriptionNewBox>
                <DayTimeNew>October 05, 2023</DayTimeNew>
                <NameNewStyle>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </NameNewStyle>
                <LineNameNew></LineNameNew>
              </DescriptionNewBox>
            </NewBoxStyle>
          </div>
          <div className="col-12 col-sm-12 col-md-4">
            <NewBoxStyle>
              <BoxImg>
                <ImgStyle src={img2}></ImgStyle>
              </BoxImg>
              <DescriptionNewBox>
                <DayTimeNew>October 05, 2023</DayTimeNew>
                <NameNewStyle>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </NameNewStyle>
                <LineNameNew></LineNameNew>
              </DescriptionNewBox>
            </NewBoxStyle>
          </div>
          <div className="col-12 col-sm-12 col-md-4 ">
            <NewBoxStyle>
              <BoxImg>
                <ImgStyle src={img1}></ImgStyle>
              </BoxImg>
              <DescriptionNewBox>
                <DayTimeNew>October 05, 2023</DayTimeNew>
                <NameNewStyle>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </NameNewStyle>
                <LineNameNew></LineNameNew>
              </DescriptionNewBox>
            </NewBoxStyle>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(News);

const NewBoxStyle = styled.div`
  margin-bottom: 30px;
`;
const BoxImg = styled.div`
  height: 209px;
  @media screen and (max-width: 1200px) {
    height: 174px;
  }
  @media screen and (max-width: 992px) {
    height: 127px;
  }
  @media screen and (max-width: 768px) {
    height: auto;
  }
`;
const ImgStyle = styled.img`
  max-width: 100%;
  margin: auto;
`;
const DescriptionNewBox = styled.div`
  padding: 10px 0;
`;
const DayTimeNew = styled.p`
  color: gray;
  font-size: 12px;
  margin: 5px 0;
`;

const NameNewStyle = styled.h5`
  text-align: justify;
  font-family: sans-serif;
`;
const LineNameNew = styled.div`
  background-color: #e2cabd;
  height: 2px;
  width: 50%;
`;
const HeadingNews = styled.h3`
  margin-top: 30px;
  text-align: center;
  font-family: monospace;
`;
const DivLine = styled.div`
  border-radius: 20px;
  height: 5px;
  width: 150px;
  background-color: #e2cabd;
  margin: 0 auto 20px;
`;
