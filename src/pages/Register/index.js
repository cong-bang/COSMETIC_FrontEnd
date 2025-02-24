import React from "react";
import AuthForm from "components/AuthForm";
import Header from "components/Layout/Header"
import Footer from "components/Layout/Footer"

const Register = () => {
  return(
    <>
    <Header />
    <AuthForm type="register" />
    <Footer />
    </>
  ) 
};

export default Register;
