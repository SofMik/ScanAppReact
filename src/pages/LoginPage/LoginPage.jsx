import React from "react";
import Layout from "../../layout/Layout";
import LoginForm from "../../components/LoginForm/LoginForm";
import loginImage from "../../assets/Images/loginImage/loginImage.png";
import "./LoginPage.css";
import "../global.css";

const LoginPage = () => {
  return (
    <>
      <Layout>
        <main className="page-main login_page-main">
          <div className="text-box login_page_text-box">
            <h3 className="page-h3 login_page_h3">
              Для оформления подписки на тариф, необходимо авторизоваться.
            </h3>
            <img className="login_page_img" src={loginImage} alt={"foto"} />
          </div>
          <div className="login_page-form-box">
            <LoginForm />
          </div>
          <img
            className="login_page_img-mobile"
            src={loginImage}
            alt={"foto"}
          />
        </main>
      </Layout>
    </>
  );
};

export default LoginPage;

