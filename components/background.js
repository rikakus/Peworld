import style from "../styles/Background.module.css";
import React from "react";
import Image from "next/image";

export default function Background() {
  return (
    <>

      <div className={style.ianBackground}>
        <div className={style.image}>
          <div className={style.jumbotron}>
            <div className={style.logo}>
              <Image
                className={style.logo}
                src="/logo.png"
                width={137}
                height={35}
                layout="fixed"
                alt="gambar"
              ></Image>
            </div>
            <h1 className={style.text}>
              Temukan developer berbakat & terbaik di berbagai bidang keahlian
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
