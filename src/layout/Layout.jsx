import React from "react";
import Header from "../components/Header/Header";
import HeaderBurgerMenu from "../components/Header/HeaderBurgerMenu";
import Footer from "../components/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <HeaderBurgerMenu />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
