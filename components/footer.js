import React from "react";
import Image from "next/image";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.image}>
            <Image
              src="/logo.png"
              width={178}
              height={50}
              layout="fixed"
              alt="gambar"
            ></Image>
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
            ipsum et dui rhoncus auctor.
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.bottom}>
            <div className={styles.cover}>
            <div>2020 Pewworld. All right reserved</div>
            </div>
            <div className={styles.cover2}>
            <div className={styles.phone}>Telepon</div>
            <div>Email</div>
            </div>
        </div>
      </div>
    </>
  );
}
