import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Edit.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  const user = context.req.cookies.users;
  const api1 = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.HOST}/user/${user}`,
        headers: { token: token },
      });
      return {
        data: res.data,
        error: false,
      };
    } catch (error) {
      return {
        data: [],
        error: true,
      };
    }
  };
  return {
    props: {
      data: [],
      api1: await api1(),
    },
  };
}

function EditProfile(props) {
  const router = useRouter();
  const data1 = props.api1.data.data;
  const [photo, setPhoto] = useState("");
  const [isChangePhoto, setIsChangePhoto] = useState(false);

  const [form, setForm] = useState({
    name: "",
    jobDesk: "",
    domisili: "",
    workplace: "",
    description: ""
  });

  const handleChangeImage = async () => {
    const formData = new FormData();
    formData.append("photo", photo);
    console.log(formData);
    axios
      .put(`${process.env.HOST}/user/${data1.user.id}/photo`, formData)
      .then((response) => {
        alert(response.data.message)
        console.log(response)

        return;
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero" style={{ height: "200vh" }}>
        <div className={styles.background}>
          <div className={styles.container}>
            <div className={styles.user}>
              <div className={styles.profile}>
                <div className={styles.image}>
                  <Image
                    src={`${process.env.HOST}/${data1.user.photo}`}
                    style={{ borderRadius: "50%" }}
                    width={200}
                    height={200}
                    layout="fixed"
                    alt="gambar"
                  ></Image>
                </div>
                <label className={styles.select} htmlFor="files">
                  Pilih Foto
                </label>
                <input
                  className="hidden"
                  hidden
                  type="file"
                  id="files"
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                    setIsChangePhoto(true);
                  }}
                />
                {isChangePhoto && (
                  <button
                    onClick={handleChangeImage}
                    type="submit"
                    className={styles.select}
                  >
                    Simpan Foto
                  </button>
                )}
                <h1 className={styles.name}>{data1.user.name}</h1>
                <h3 className={styles.job}>{data1.user.job_desk}</h3>
                <div className={styles.formLocation}>
                  <div className={styles.location}></div>
                  <p className={styles.desc}>{data1.user.residence}</p>
                </div>
                <div className={styles.desc}>{data1.user.job_desk}</div>
              </div>
              <button className={styles.button}>Simpan</button>
              <button className={styles.button2}>Batal</button>
            </div>
            <div className={styles.formContent}>
              <div className={styles.content}>
                <div className={styles.cover}>
                  <h3>Data Diri</h3>
                </div>
                <div className={styles.line}></div>
                <div className={styles.formInput}>
                  <div className={styles.title}>Nama Lengkap</div>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="  Masukan nama lengkap"
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formInput}>
                  <div className={styles.title}>Job Desk</div>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="  Masukan job desk"
                    onChange={(e) =>
                      setForm({ ...form, jobDesk: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formInput}>
                  <div className={styles.title}>Domisili</div>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="  Masukan domisili"
                    onChange={(e) =>
                      setForm({ ...form, domisili: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formInput}>
                  <div className={styles.title}>Tempat Kerja</div>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="  Masukan tempat kerja"
                    onChange={(e) =>
                      setForm({ ...form, workplace: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formInput}>
                  <div className={styles.title}>Deskripsi Singkat</div>
                  <input
                    type="text"
                    className={styles.inputDesc}
                    placeholder="  Tuliskan deskripsi singkat"
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styles.formSkill}>
              <div className={styles.cover}>
                  <h3>Skill</h3>
                </div>
                <div className={styles.line}></div>
                <div className={styles.skill}>
                <input
                  type="text"
                  placeholder="      tambah skill"
                  className={styles.inputSkill}
                />
                <button className={styles.button3}>Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

EditProfile.layout = "L1";

export default EditProfile;
