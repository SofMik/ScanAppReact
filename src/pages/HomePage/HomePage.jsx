import React from "react";
import Layout from "../../layout/Layout";
import CustomSlider from "../../components/Slider/Slider";
import RequestDataButton from "../../components/Button/RequestDataButton";
import Cards from "../../components/Cards/Cards";
import homeImageFirst from "../../assets/Images/homeImage/homeImageFirst.png";
import homeImageSecond from "../../assets/Images/homeImage/homeImageSecond.png";
import homeImageSecondMobile from "../../assets/Images/homeImage/homeImageSecondMobile.png";
import "./HomePage.css";
import "../global.css";

const HomePage = () => {
  return (
    <>
      <Layout>
        <main className="page-main">
          <div className="home_content first">
            <div className="text-box home_text_box">
              <h3 className="page-h3 home_h3">
                сервис по поиску публикаций <br></br>о компании <br></br>по его
                ИНН
              </h3>
              <p className="page-p home_p">
                Комплексный анализ публикаций, получение данных в формате PDF на
                электронную почту.
              </p>
              <RequestDataButton />
            </div>
            <div className="home_img_box">
              <img
                className="home_img first"
                src={homeImageFirst}
                alt={"foto"}
              />
            </div>
          </div>
          <div className="home_content second">
            <div className="home_h4_box">
              <h4 className="home_h4">почему именно мы</h4>
            </div>
            <CustomSlider className="slider-box" />
            <div className="home_img second_box">
              <img
                className="home_img second"
                src={homeImageSecond}
                alt={"foto"}
              />
            </div>
            <div className="home_img second__mobile_box">
              <img
                className="home_img second_mobile"
                src={homeImageSecondMobile}
                alt={"foto"}
              />
            </div>
          </div>

          <div className="home_content third">
            <div className="home_h4_box">
              <h4 className="home_h4">наши тарифы</h4>
            </div>
            <div className="home_cards">
              <Cards title="Beginner" />
              <Cards title="Pro" />
              <Cards title="Business" />
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default HomePage;
