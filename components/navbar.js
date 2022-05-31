/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { removeCookies } from "cookies-next";

export default function Navbar(props) {
  const router = useRouter();
  const { token } = props;
  const [data, setData] = useState(" ");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${process.env.HOST}/photo`, {
          headers: { token },
        })
        .then((response) => {
          setData(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (token) {
      getData();
    }
    setIsLoading(false);
  }, [token]);

  const level = data.level == 1 ? "worker" : "recruiter";

  const logout = () => {
    removeCookies("token");
    removeCookies("users");
    return router.push("/login");
  };

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
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${!isOpen ? "collapse" : ""} navbar-collapse`}
          style={{ justifyContent: "flex-end" }}
          id="navbarSupportedContent"
        >
          {isLoading ? (
            <></>
          ) : !token ? (
            <div className={style.formButtton}>
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
            </div>
          ) : (
            <div className={style.formUser}>
              <div className={style.notification}></div>
              <div className={style.message}></div>
              <UncontrolledDropdown>
                <DropdownToggle nav>
                  <div className={style.photo}>
                    <Image
                      src={`${process.env.HOST}/${data.photo ? data.photo : "profile.jpg"}`}
                      style={{ borderRadius: "50%" }}
                      width={40}
                      height={40}
                      layout="fixed"
                      alt="gambar"
                    ></Image>
                  </div>
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem
                    onClick={() => {
                      router.push(`/profile/${level}`);
                    }}
                  >
                    Profile
                  </DropdownItem>
                  <hr/>
                  <DropdownItem
                    onClick={() => {
                      logout();
                    }}
                  >
                    log out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
