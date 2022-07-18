import React from "react";
import Container from "@mui/material/Container";
import FooterMenu from "./FooterMenu";
import Header from "./Header";
import TitleBar from "./TitleBar";

const Layout = ({ children, userPhoneStatus, userLineStatus }) => {
  return (
    <>
      <TitleBar />
      <Container component="header" maxWidth="sm">
        <Header
          userPhoneStatus={userPhoneStatus}
          userLineStatus={userLineStatus}
        />
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
