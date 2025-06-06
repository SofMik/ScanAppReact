import React from "react";
import Layout from "../../layout/Layout";
import SearchForm from "../../components/SearchForm/SearchForm";
import userImageSmallGroup from "../../assets/Images/userImage/userImageSmallGroup.png";
import userImageSmallOne from "../../assets/Images/userImage/userImageSmallOne.png";
import userImageMain from "../../assets/Images/userImage/userImageMain.png";
import "./UserPage.css";
import "../global.css";

const UserPage = () => {
  return (
    <>
      <Layout>
        <main className="page-main">
          <div className="user_content first">
            <div className="text-box">
              <h3 className="page-h3 user_h3">
                Найдите необходимые данные в пару кликов.
              </h3>
              <p className="page-p user_p">
                Задайте параметры поиска. <br></br> Чем больше заполните, тем
                точнее поиск.
              </p>
            </div>
            <img
              className="user_img_small"
              src={userImageSmallOne}
              alt={"foto"}
            />
            <img
              className="user_img_group"
              src={userImageSmallGroup}
              alt={"foto"}
            />
          </div>

          <div className="user_content second">
            <SearchForm />
            <img className="user_img_main" src={userImageMain} alt={"foto"} />
          </div>
        </main>
      </Layout>
    </>
  );
};

export default UserPage;

