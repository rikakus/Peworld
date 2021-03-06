import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/WorkerProfile.module.css";
import {
  Nav,
  NavItem,
  NavLink,
  TabPane,
  Row,
  TabContent,
  Col,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dateFormat, { masks } from "dateformat";

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  const { id } = context.params;
  const api1 = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.HOST}/worker/${id}`,
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
  const GetLevel = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.HOST}/photo`,
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
      level: await GetLevel(),
    },
  };
}

function Profile(props) {
  const [activeTab, setActiveTab] = useState("1");
  const data1 = props.api1.data.data;
  const level = props.level.data.data.level;
  console.log(level);

  const host = process.env.HOST;

  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const height =
    width > 550
      ? 1300
      : 1300 +
        (activeTab == "1"
          ? data1.portofolio.length * 180
          : data1.experience.length * 300);

  return (
    <>
      <Head>
        <title>profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero" style={{ height: `${height}px` }}>
        <div className={styles.background}>
          <div className={styles.container}>
            <div className={styles.profile}>
              <div className={styles.image}>
                <Image
                  src={`${process.env.HOST}/${
                    data1.user.photo ? data1.user.photo : "profile.jpg"
                  }`}
                  style={{ borderRadius: "50%" }}
                  width={200}
                  height={200}
                  layout="fixed"
                  alt="gambar"
                ></Image>
              </div>

              <h1 className={styles.name}>{data1.user.name}</h1>
              <h3 className={styles.job}>{data1.user.job_desk}</h3>
              {data1.user.residence ? (
                <div className={styles.formLocation}>
                  <div className={styles.location}></div>
                  <p>{data1.user.residence}</p>
                </div>
              ) : (
                <></>
              )}
              <div className={styles.desc}>{data1.user.job_desk}</div>
              <div className={styles.desc}>{data1.user.description}</div>
              <button
                className={styles.button}
                hidden={level == 1 ? "hidden" : ""}
              >
                Hire
              </button>
              <div className={styles.formSkill}>
                <h1>Skill</h1>
                <Row style={{ margin: "10px" }}>
                  {data1 &&
                    data1.skills.map((item) => {
                      return (
                        <Col className={styles.skill} key={item.id}>
                          {item.name}
                        </Col>
                      );
                    })}
                </Row>
              </div>
              {data1.user.email ? (
                <div className={styles.formLocation}>
                  <div className={styles.email}></div>
                  <p>{data1.user.email}</p>
                </div>
              ) : (
                <></>
              )}
              {data1.user.instagram ? (
                <div className={styles.formLocation}>
                  <div className={styles.instagram}></div>
                  <p>{data1.user.instagram}</p>
                </div>
              ) : (
                <></>
              )}
              {data1.user.github ? (
                <div className={styles.formLocation}>
                  <div className={styles.github}></div>
                  <p>{data1.user.github}</p>
                </div>
              ) : (
                <></>
              )}
              {data1.user.twitter ? (
                <div className={styles.formLocation}>
                  <div className={styles.gitlab}></div>
                  <p>{data1.user.twitter}</p>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.content}>
              <Nav>
                <NavItem>
                  <NavLink
                    className={styles.navTab}
                    onClick={() => setActiveTab("1")}
                    style={
                      activeTab == "1"
                        ? { borderBottom: "4px solid #5e50a1" }
                        : {}
                    }
                  >
                    portofolio
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={styles.navTab}
                    onClick={() => setActiveTab("2")}
                    style={
                      activeTab == "2"
                        ? { borderBottom: "4px solid #5e50a1" }
                        : {}
                    }
                  >
                    pengalaman kerja
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row style={{ margin: "20px" }}>
                    {data1 &&
                      data1.portofolio.map((item) => {
                        return (
                          <Col className={styles.cardPorto} key={item.id}>
                            <div className={styles.porto}>
                              <Image
                                src={`${host}/${
                                  item.photo ? item.photo : "profile.jpg"
                                }`}
                                width={219}
                                height={148}
                                layout="fixed"
                                alt="gambar"
                              ></Image>
                            </div>
                            <div className={styles.namePorto}>{item.name}</div>
                          </Col>
                        );
                      })}
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row style={{ margin: "10px" }}>
                    {data1 &&
                      data1.experience.map((item) => {
                        return (
                          <>
                            <div className={styles.cardExp} key={item.id}>
                              <div className={styles.expImg}>
                                <Image
                                  src={`${host}/${
                                    item.photo ? item.photo : "profile.jpg"
                                  }`}
                                  width={148}
                                  height={148}
                                  layout="fixed"
                                  alt="gambar"
                                ></Image>
                              </div>
                              <div className={styles.formDesc}>
                                <h3 className={styles.position}>
                                  {item.position}
                                </h3>
                                <h3 className={styles.companyName}>
                                  {item.company_name}
                                </h3>
                                <div className={styles.desc}>
                                  {dateFormat(item.date_join, "mmmm dS, yyyy")}{" "}
                                  - {dateFormat(item.date_out, "mmmm dS, yyyy")}
                                </div>
                                <div className={styles.desc}>
                                  {item.description}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Profile.layout = "L1";

export default Profile;
