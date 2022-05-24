import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import axios from "axios";


export default function Navbar() {
  const router = useRouter();
  const token = null

  return (
    <>
      <nav className="container navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <div className="rm-5">
            <Image
              src="/logo2.png"
              width={137}
              height={35}
              layout="fixed"
              alt="gambar"
            ></Image>
          </div>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          style={{ justifyContent: "flex-end" }}
          id="navbarSupportedContent"
        >
          {!token && token === null ? (
            <>
              <button
                className={style.button1}
                onClick={() => {
                  router.push("/login");
                }}
              >
                Masuk
              </button>{" "}
              <button
                className={style.button2}
                onClick={() => {
                  router.push("/register");
                }}
              >
                Daftar
              </button>
            </>
          ) : (
            <div className={style.formUser}>
              <div className=""></div>
              <div className=""></div>
              <div className={style.photo}>
                {" "}
                <Image
                  src={`${process.env.HOST}/a1829ae4-bccb-47ff-a42e-8672f5554ff4`}
                  style={{ borderRadius: "50%" }}
                  width={30}
                  height={30}
                  layout="fixed"
                  alt="gambar"
                ></Image>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
