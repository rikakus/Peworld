import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Layout(props) {
  const { children, token, user } = props;
  return (
    <>
      <Navbar token={token} user={user} />
      <main>{children}</main>
      <div></div>
      <Footer />
    </>
  );
}
