import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Layout(props) {
  const { children } = props;
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <div></div>
      <Footer />
    </>
  );
}
