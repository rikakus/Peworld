import Background from "../../components/background";
import React, { useState } from "react";
import style from "../../styles/Auth.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.HOST}/login`, form)
      .then((response) => {
        Swal.fire(response.data.message, "", "success");
        document.cookie = `token=${response.data.data.token};path=/`;
        document.cookie = `users=${JSON.stringify(
          response.data.data.id
        )};path=/`;
        router.push("/");
        return;
      })
      .catch((err) => {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      });
  }; 
  return (
    <>
      <div className={style.jumbotron}>
        <Background className={style.background} />
        <div className={style.content} style={{ height: "100vh" }}>
          <div className={style.formText}>
            <h1>Halo, Pewpeople</h1>
            <h6>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </h6>
          </div>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className={style.formInput}>
              <div className={style.title}>Email</div>
              <input
                type="text"
                className={style.input}
                placeholder="  Masukan alamat email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className={style.formInput}>
              <div className={style.title}>Kata Sandi</div>
              <div className={style.formPassword}>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  className={style.input}
                  placeholder="  Masukan kata sandi"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className={style.password}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                ></button>
              </div>
            </div>
            <div className={style.forgot}>
              <Link href="/forgot">
                <a className={style.forgot}>Lupa kata sandi?</a>
              </Link>
            </div>
            <button type="submit" className={style.button}>
              Masuk
            </button>
          </form>
          <div>
            <small>Anda belum punya akun?</small>
            <small>
              <Link href="/register">
                <a className={style.link}> Daftar disini</a>
              </Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
