import Background from "../../components/background";
import React from "react";
import style from "../../styles/Auth.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  return (
    <>
      <div className={style.jumbotron}>
        <Background />
        <div className={style.content} style={{height: "100vh"}}>
          <div className={style.formText}>
            <h1>Halo, Pewpeople</h1>
            <h6>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </h6>
          </div>
          <button
            type="button"
            className={style.button}
            onClick={() => router.push("/register/worker")}
          >
            Daftar sebagai pekerja
          </button>
          <button
            type="button"
            className={style.button}
            onClick={() => router.push("/register/recruiter")}
          >
            Daftar sebagai perekrut
          </button>
          <div>
            <small className={style.txt}>Anda sudah punya akun?</small>
            <small>
              <Link href="/login">
                <a className={style.link}> Masuk disini</a>
              </Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
