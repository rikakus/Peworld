import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/Edit.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Row, Col } from "reactstrap";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat, { masks } from "dateformat";

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  const user = context.req.cookies.users;
  const api1 = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.HOST}/worker/${user}`,
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
      data: token,
      api1: await api1(),
    },
  };
}

function EditProfile(props) {
  const router = useRouter();
  const data1 = props.api1.data.data;
  const [photo, setPhoto] = useState(data1.user.photo);
  const [isChangePhoto, setIsChangePhoto] = useState(false);
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [type, setType] = useState(0);
  const [exp, setExp] = useState({
    position: "",
    companyName: "",
    dateJoin: "",
    dateOut: "",
    desc: "",
    id: data1.user.id,
  });
  const [porto, setPorto] = useState({
    name: "",
    repository: "",
    type,
    id: data1.user.id,
  });

  const [form, setForm] = useState({
    name: data1.user.name,
    jobDesk: data1.user.job_desk,
    residence: data1.user.residence,
    workplace: data1.user.workplace,
    desc: data1.user.description,
    phone: data1.user.phone,
    instagram: data1.user.instagram,
    github: data1.user.github,
    twitter: data1.user.twitter,
    photo: data1.user.photo,
    skill: data1.skills,
    exp: data1.experience,
    porto: data1.portofolio,
  });

  const SubmitData = async () => {
    axios
      .put(`${process.env.HOST}/worker/${data1.user.id}`, form)
      .then((response) => {
        Swal.fire(response.data.message, "", "success");

        return router.push("/profile/worker");
      })
      .catch((err) => {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      });
  };

  const getData = async () => {
    const token = props.data;
    await axios
      .get(`${process.env.HOST}/worker/${data1.user.login_id}`, {
        headers: { token },
      })
      .then((response) => {
        setForm({
          name: response.data.data.user.name,
          jobDesk: response.data.data.user.job_desk,
          residence: response.data.data.user.residence,
          workplace: response.data.data.user.workplace,
          desc: response.data.data.user.description,
          phone: response.data.data.user.phone,
          instagram: response.data.data.user.instagram,
          github: response.data.data.user.github,
          twitter: response.data.data.user.twitter,
          photo: response.data.data.user.photo,
          skill: response.data.data.skills,
          exp: response.data.data.experience,
          porto: response.data.data.portofolio,
        });
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      });
  };

  const cancel = () => {
    // setForm({
    //   name: data1.user.name,
    //   jobDesk: data1.user.job_desk,
    //   residence: data1.user.residence,
    //   workplace: data1.user.workplace,
    //   desc: data1.user.description,
    //   phone: data1.user.phone,
    //   instagram: data1.user.instagram,
    //   github: data1.user.github,
    //   twitter: data1.user.twitter,
    //   photo: data1.user.photo,
    //   skill: data1.skills,
    //   exp: data1.experience,
    //   porto: data1.portofolio,
    // });
    return router.push("/profile/worker");
  };

  const handleChangeImage = async () => {
    const formData = new FormData();
    formData.append("photo", photo);
    setLoading(true);
    axios
      .put(`${process.env.HOST}/worker/${data1.user.id}/photo`, formData)
      .then((response) => {
        Swal.fire(response.data.message, "", "success");
        router.reload(window.location.pathname);
        getData();
        return;
      })
      .catch((err) => {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      });
  };

  const addSkill = async () => {
    setLoading(true);
    const data = {
      skill,
      id: data1.user.id,
    };
    axios
      .post(`${process.env.HOST}/skill`, data)
      .then((response) => {
        Swal.fire(response.data.message, "", "success");
        setSkill("");
        return getData();
      })
      .catch((err) => {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      });
  };
  const addExp = async () => {
    setLoading(true);
    axios
      .post(`${process.env.HOST}/experience`, exp)
      .then((response) => {
        Swal.fire(response.data.message, "", "success");
        setExp({
          position: "",
          companyName: "",
          dateJoin: "",
          dateOut: "",
          desc: "",
          id: data1.user.id,
        });
        return getData();
      })
      .catch((err) => {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      });
  };

  const addPorto = async () => {
    setLoading(true);
    axios
      .post(`${process.env.HOST}/portofolio`, porto)
      .then((response) => {
        Swal.fire(response.data.message, "", "success");
        setPorto({
          name: "",
          repository: "",
          type,
          id: data1.user.id,
        });
        return getData();
      })
      .catch((err) => {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      });
  };

  const handleDeleteSkill = async (id) => {
    Swal.fire({
      title: 'Apakah kamu yakin?',
      text: "Skill tidak dapat dikembalikan",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5E50A1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .delete(`${process.env.HOST}/skill/${id}`)
        .then((response) => {
          Swal.fire(response.data.message, "Skill Berhasil Terhapus", "success");
          return getData();
        })
        .catch((err) => {
          Swal.fire(err.response.data.message, err.response.data.error, "error");
        });
      }
    })

  };

  const handleDeleteExp = async (id) => {
    Swal.fire({
      title: 'Apakah kamu yakin?',
      text: "Pengalaman Kerja tidak dapat dikembalikan",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5E50A1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .delete(`${process.env.HOST}/experience/${id}`)
        .then((response) => {
          Swal.fire(response.data.message, "Pengalaman Kerja Berhasil Terhapus", "success");
          return getData();
        })
        .catch((err) => {
          Swal.fire(err.response.data.message, err.response.data.error, "error");
        });
      }
    })
  };

  const handleDeletePortofolio = async (id) => {
    Swal.fire({
      title: 'Apakah kamu yakin?',
      text: "Portofolio tidak dapat dikembalikan",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5E50A1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .delete(`${process.env.HOST}/Portofolio/${id}`)
        .then((response) => {
          Swal.fire(response.data.message, "Portofolio Berhasil Terhapus", "success");
          return getData();
        })
        .catch((err) => {
          Swal.fire(err.response.data.message, err.response.data.error, "error");
        });
      }
    })
  };

    const [width, setWidth] = useState(0);
    useEffect(() => {
      setWidth(window.innerWidth);
    }, []);

    const height =
      width > 550
        ? 2347 + form.exp.length * 700 + form.porto.length * 700
        : 2347 + form.exp.length * 830 + form.porto.length * 830 


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero" style={{ height: `${height}px` }}>
        <div className={styles.background}>
          <div className={styles.container}>
            <div className={styles.user}>
              <div className={styles.profile}>
                <div className={styles.image}>
                  <Image
                    src={`${process.env.HOST}/${
                      form.photo ? form.photo : "profile.jpg"
                    }`}
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
                <h1 className={styles.name}>{form.name}</h1>
                <h3 className={styles.job}>{form.jobDesk}</h3>
                <div className={styles.formLocation}>
                  <div className={styles.location}></div>
                  <p className={styles.desc}>{form.residence}</p>
                </div>
                <div className={styles.desc}>{form.jobDesk}</div>
              </div>
              <button
                type="submit"
                className={styles.button}
                onClick={SubmitData}
              >
                Simpan
              </button>
              <button className={styles.button2} onClick={() => cancel()}>
                Batal
              </button>
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
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className={styles.formInput}>
                  <div className={styles.title}>Job Desk</div>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="  Masukan job desk"
                    value={form.jobDesk}
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
                    value={form.residence}
                    onChange={(e) =>
                      setForm({ ...form, residence: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formInput}>
                  <div className={styles.title}>Tempat Kerja</div>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="  Masukan tempat kerja"
                    value={form.workplace}
                    onChange={(e) =>
                      setForm({ ...form, workplace: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formInput}>
                  <div className={styles.title}>Deskripsi Singkat</div>
                  <textarea
                    type="text"
                    className={styles.inputDesc}
                    placeholder="  Tuliskan deskripsi singkat"
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  />
                </div>
              </div>
              <div className={styles.formSkill}>
                <div className={styles.cover}>
                  <h3>Skill</h3>
                </div>
                <div className={styles.line}></div>
                <Row style={{ margin: "10px" }}>
                  {loading ? (
                    <>yes</>
                  ) : (
                    form.skill &&
                    form.skill.map((item) => {
                      return (
                        <Col className={styles.skills} key={item.id}>
                          {item.name}
                          <button
                            className={styles.button4}
                            onClick={() => handleDeleteSkill(item.id)}
                          >
                            x
                          </button>
                        </Col>
                      );
                    })
                  )}
                </Row>
                <div className={styles.skill}>
                  <input
                    type="text"
                    placeholder="      tambah skill"
                    value={skill}
                    className={styles.inputSkill}
                    onChange={(e) => setSkill(e.target.value)}
                  />
                  <button className={styles.button3} onClick={() => addSkill()}>
                    Tambah
                  </button>
                </div>
              </div>
              <div className={styles.portofolio}>
                <div className={styles.cover}>
                  <h3>Pengalaman kerja</h3>
                </div>
                <div className={styles.line}></div>
                {loading ? (
                  <>yes</>
                ) : (
                  form.exp &&
                  form.exp.map((item) => {
                    return (
                      <>
                        <div className={styles.formInput} key={item.id}>
                          <div className={styles.title}>Posisi</div>
                          <input
                            disabled
                            type="text"
                            className={styles.input}
                            placeholder="  web developer"
                            value={item.position}
                          />
                        </div>
                        <div className={styles.formInput}>
                          <div className={styles.title}>Nama Perusahaan</div>
                          <input
                            disabled
                            type="text"
                            className={styles.input}
                            placeholder="  PT Harus Bisa"
                            value={item.company_name}
                          />
                        </div>
                        <div
                          className={styles.formInput}
                          style={{ display: "flex" }}
                        >
                          <div>
                            <div className={styles.title}>Tanggal Masuk</div>
                            <DatePicker
                              disabled
                              value={dateFormat(
                                item.date_join,
                                "paddedShortDate"
                              )}
                              className={styles.inputDate}
                              selected={startDate}
                            />
                          </div>
                          <div>
                            <div className={styles.title}>Tanggal Keluar</div>
                            <DatePicker
                              disabled
                              value={dateFormat(
                                item.date_out,
                                "paddedShortDate"
                              )}
                              className={styles.inputDate}
                              selected={startDate}
                              onChange={(date) => {
                                setStartDate(
                                  dateFormat(date, "isoUtcDateTime")
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className={styles.formInputDesc}>
                          <div className={styles.title}>Deskripsi Singkat</div>
                          <textarea
                            disabled
                            type="text"
                            className={styles.inputDesc}
                            placeholder="  Deskripsikan pekerjaan anda"
                            value={item.description}
                          />
                        </div>
                        <button
                          className={styles.button5}
                          onClick={() => handleDeleteExp(item.id)}
                          style={{
                            border: "1px solid red",
                            color: "red",
                            borderRadius: "10px",
                            backgroundColor: "transparent",
                          }}
                        >
                          Hapus Pengalaman Kerja
                        </button>
                        <div className={styles.line}></div>
                      </>
                    );
                  })
                )}
                <div className={styles.formInput}>
                  <div className={styles.title}>Posisi</div>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="  web developer"
                    value={exp.position}
                    onChange={(e) =>
                      setExp({ ...exp, position: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formInput}>
                  <div className={styles.title}>Nama Perusahaan</div>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="  PT Harus Bisa"
                    value={exp.companyName}
                    onChange={(e) =>
                      setExp({ ...exp, companyName: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formInput} style={{ display: "flex" }}>
                  <div>
                    <div className={styles.title}>Tanggal Masuk</div>
                    <DatePicker
                      className={styles.inputDate}
                      value={dateFormat(exp.dateJoin, "paddedShortDate")}
                      onChange={(e) =>
                        setExp({
                          ...exp,
                          dateJoin: dateFormat(e, "isoUtcDateTime"),
                        })
                      }
                    />
                  </div>
                  <div>
                    <div className={styles.title}>Tanggal Keluar</div>
                    <DatePicker
                      className={styles.inputDate}
                      value={dateFormat(exp.dateOut, "paddedShortDate")}
                      onChange={(e) =>
                        setExp({
                          ...exp,
                          dateOut: dateFormat(e, "isoUtcDateTime"),
                        })
                      }
                    />
                  </div>
                </div>
                <div className={styles.formInputDesc}>
                  <div className={styles.title}>Deskripsi Singkat</div>
                  <textarea
                    type="text"
                    className={styles.inputDesc}
                    placeholder="  Deskripsikan pekerjaan anda"
                    value={exp.desc}
                    onChange={(e) => setExp({ ...exp, desc: e.target.value })}
                  />
                </div>
                <div className={styles.line}></div>
                <button className={styles.button5} onClick={() => addExp()}>
                  Tambah Pengalaman Kerja
                </button>
              </div>
              <div className={styles.portofolio}>
                <div className={styles.cover}>
                  <h3>Portofolio</h3>
                </div>
                <div className={styles.line}></div>
                {loading ? (
                  <>yes</>
                ) : (
                  form.porto &&
                  form.porto.map((item) => {
                    return (
                      <>
                        <div className={styles.formInput}>
                          <div className={styles.title}>Nama Aplikasi</div>
                          <input
                            disabled
                            type="text"
                            className={styles.input}
                            value={item.name}
                            placeholder="  Masukan nama aplikasi"
                          />
                        </div>
                        <div className={styles.formInput}>
                          <div className={styles.title}>Link repository</div>
                          <input
                            disabled
                            type="text"
                            className={styles.input}
                            value={item.repository}
                            placeholder="  Masukan link repository"
                          />
                        </div>
                        <div className={styles.formInput}>
                          <div className={styles.title}>Type Portofolio</div>
                          <div className={styles.input} style={{padding:"17px"}}>
                            {item.type == 0
                              ? "Aplikasi Mobile"
                              : "Aplikasi Website"}
                          </div>
                        </div>
                        <div className={styles.image}>
                          <Image
                            src={`${process.env.HOST}/${
                              item.photo ? item.photo : "profile.jpg"
                            }`}
                            style={{ borderRadius: "50%" }}
                            width={200}
                            height={200}
                            layout="fixed"
                            alt="gambar"
                          ></Image>
                        </div>
                        <div className={styles.formInput}>
                          <button
                            className={styles.button5}
                            style={{
                              border: "1px solid red",
                              color: "red",
                              borderRadius: "10px",
                              backgroundColor: "transparent",
                            }}
                            onClick={() => handleDeletePortofolio(item.id)}
                          >
                            Hapus Portofolio
                          </button>
                          <div className={styles.line}></div>
                        </div>
                      </>
                    );
                  })
                )}
                <div className={styles.formInput}>
                  <div className={styles.title}>Nama Aplikasi</div>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="  Masukan nama aplikasi"
                    value={porto.name}
                    onChange={(e) => {
                      setPorto({ ...porto, name: e.target.value });
                    }}
                  />
                </div>
                <div className={styles.formInput}>
                  <div className={styles.title}>Link repository</div>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="  Masukan link repository"
                    value={porto.repository}
                    onChange={(e) => {
                      setPorto({ ...porto, repository: e.target.value });
                    }}
                  />
                </div>
                <div className={styles.title} style={{ margin: "30px" }}>
                  Type Portofolio
                </div>
                <label className={styles.check}>
                  <div className={styles.check}>
                    <input
                      type="radio"
                      checked={type == 0 ? true : false}
                      name="radio"
                      onChange={() => setType(0)}
                    />
                    <span className="checkmark"></span>
                    Aplikasi Mobile
                  </div>
                  <div className={styles.check}>
                    <input
                      type="radio"
                      checked={type == 1 ? true : false}
                      name="radio"
                      onChange={() => setType(1)}
                    />
                    Aplikasi Web
                    <span className="checkmark"></span>
                  </div>
                </label>
                <div className={styles.formInput}>
                  <div className={styles.title}>upload gambar</div>
                  <input type="file" />
                </div>
                <div className={styles.line}></div>
                <button className={styles.button5} onClick={() => addPorto()}>
                  Tambah Portofolio
                </button>
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
