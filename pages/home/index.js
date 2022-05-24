import React, { useEffect, useState } from "react";
import style from "../../styles/Home.module.css";
import axios from "axios";
import Image from "next/image";
import { Row, Col } from "reactstrap";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const api1 = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.HOST}/user`,
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

function HomePages(props) {
  const router = useRouter();
  const [data1, setData] = useState(props.api1.data.data);
  const [key, setSearch] = useState(router.query.search);

  const getContent = async () => {
    await axios
      .get(`${process.env.HOST}/user?search=${key}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      router.push(`/home?search=${key}`);
      getContent();
    }
  };
  const handleButton = () => {
    router.push(`/home?search=${key}`);
    return getContent();
  };

  return (
    <>
      <div className={style.topbar}>
        <div className="container-md">
          <h1 className={style.topcontent}>Top Job</h1>
        </div>
      </div>

      <section className={style.container}>
        <div className="search-section">
          <div className={style.formSearch}>
            <input
              type="text"
              placeholder="      Search for any skill"
              className={style.input}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
            <button
              className={style.button}
              onClick={() => {
                handleButton();
              }}
            >
              Search
            </button>
          </div>

          {data1 &&
            data1.map((item) => {
              return (
                <div className={style.card}>
                  <div className={style.image}>
                    <Image
                      src={`${process.env.HOST}/${item.photo}`}
                      style={{ borderRadius: "50%" }}
                      width={200}
                      height={200}
                      layout="fixed"
                      alt="gambar"
                    ></Image>
                  </div>

                  <div className={style.detail}>
                    <h1>{item.name}</h1>
                    <p>{item.job_desk}</p>
                    <div className={style.formLocation}>
                      <div className={style.location}></div>
                      <p>{item.residence}</p>
                    </div>
                    <Row style={{ margin: "10px", maxWidth: "300px" }}>
                      {item.skill &&
                        item.skill.map((item) => {
                          return (
                            <Col className={style.skill} key={item.id}>
                              {item.name}
                            </Col>
                          );
                        })}
                    </Row>
                  </div>
                  <button
                    className={style.button}
                    onClick={() => {
                      router.push(`/profile/${item.id}`);
                    }}
                  >
                    View Profile
                  </button>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}

HomePages.layout = "L1";

export default HomePages;
