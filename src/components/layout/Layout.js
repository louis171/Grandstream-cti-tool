import React from "react";
import Container from "@mui/material/Container";
import FooterMenu from "./FooterMenu";
import Header from "./Header";

const Layout = ({ children, userPhoneStatus }) => {
  return (
    <>
      <Container component="header" maxWidth="sm">
        <Header userPhoneStatus={userPhoneStatus} />
      </Container>
      <Container component="main" maxWidth="sm">
        {children}
      </Container>
      <Container component="footer" maxWidth="sm">
        <FooterMenu />
      </Container>
    </>
  );
};

export default Layout;
