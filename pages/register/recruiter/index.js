import Background from "../../../components/background";
import React, { useState } from "react";
import style from "../../../styles/Auth.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    user: "",
    email: "",
    company: "",
    position: "",
    password: "",
    confirmPassword: "",
    phone: "",
    level: 2,
    isVerified: true,
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return Swal.fire(err.response.data.message, err.response.data.error, "error");
    }
    axios
      .post(`${process.env.HOST}/register/recruiter`, form)
      .then((response) => {
        console.log(response);
        Swal.fire(response.data.message, "sekarang anda bisa login", "success");
        router.push("/login");
        return;
      })
      .catch((err) => {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      });
  };
  return (
    <>
      <div className={style.jumbotron}>
        <Background />
        <div className={style.content}>
          <div className={style.formText}>
            <h1>Halo, Pewpeople</h1>
            <h6>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </h6>
          </div>
          <div className={style.formInput}>
            <div className={style.title}>Nama</div>
            <input
              type="text"
              className={style.input}
              placeholder="  Masukan nama panjang"
              onChange={(e) => setForm({ ...form, user: e.target.value })}
            ></input>
          </div>
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
            <div className={style.title}>Perusahaan</div>
            <input
              type="text"
              className={style.input}
              placeholder="  Masukan nama perusahaan"
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            ></input>
          </div>
          <div className={style.formInput}>
            <div className={style.title}>Jabatan</div>
            <input
              type="text"
              className={style.input}
              placeholder="  Posisi di perusahaan Anda"
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            />
          </div>
          <div className={style.formInput}>
            <div className={style.title}>No Handphone</div>
            <input
              type="text"
              className={style.input}
              placeholder="  Masukan no handphone"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className={style.formInput}>
            <div className={style.title}>Kata Sandi</div>
            <div className={style.formPassword}>
              <input
                type={`${showPassword ? "text" : "password"}`}
                className={style.input}
                placeholder="  Masukan kata sandi"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
          <div className={style.formInput}>
            <div className={style.title}>Konfirmasi Kata Sandi</div>
            <div className={style.formPassword}>
              <input
                type={`${showConfirmPassword ? "text" : "password"}`}
                className={style.input}
                placeholder="  Masukan Konfirmasi kata sandi"
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
              <button
                type="button"
                className={style.password}
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              ></button>
            </div>
          </div>
          <button
            type="submit"
            className={style.button}
            onClick={(e) => onSubmit(e)}
          >
            Daftar
          </button>
          <div style={{marginBottom: "30px"}}>
            <small className={style.txt}>Anda sudah punya akun?</small>
            <small>
              <Link href="/login">
                <a className={style.link}> Masuk disini</a>
              </Link>
            </small>
          </div>
          <button
            type="button"
            className={style.button}
            onClick={() => router.push("/register/worker")}
          >
            Daftar sebagai pekerja
          </button>
        </div>
      </div>
    </>
  );
}
