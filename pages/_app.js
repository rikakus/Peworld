import Layout1 from "../layout/layout1";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const layouts = {
  L1: Layout1,
};

const NoLayout = ({ children }) => {
  return <>{children}</>;
};
function MyApp({ Component, pageProps }) {

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);

  const Layout = layouts[Component.layout] || NoLayout;
  return (
    <>
      <Layout token={getCookie("token")} user={getCookie("users")}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyApp;
