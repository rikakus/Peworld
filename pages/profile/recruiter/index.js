import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/RecruiterProfile.module.css";
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
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  const user = context.req.cookies.users;
  const api1 = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.HOST}/recruiter/${user}`,
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

function Profile(props) {
  const router = useRouter();
  const data1 = props.api1.data.data;
  const host = process.env.HOST;

  return (
    <>
      <Head>
        <title>profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.hero}>
        <div className={styles.background}>
          <div className={styles.container}>
            <div className={styles.profile}>
              <div className={styles.image}>
                <Image
                  src={`${process.env.HOST}/${
                    data1.photo ? data1.photo : "profile.jpg"
                  }`}
                  style={{ borderRadius: "50%" }}
                  width={200}
                  height={200}
                  layout="fixed"
                  alt="gambar"
                ></Image>
              </div>

              <h1 className={styles.name}>{data1.name_company}</h1>
              <h6 className={styles.job}>{data1.business_fields}</h6>
              {data1.city ? (
                <div className={styles.formLocation}>
                  <div className={styles.location}></div>
                  <p>{data1.city}</p>
                </div>
              ) : (
                <></>
              )}
              <div className={styles.desc}>{data1.description}</div>
              <button
                className={styles.button}
                onClick={() => router.push("/edit-profile/recruiter")}
              >
                Edit Profile
              </button>
              <div className={styles.formSocial}>
              {data1.email_company ? (
                <div className={styles.formLocation}>
                  <div className={styles.email}></div>
                  <p>{data1.email_company}</p>
                </div>
              ) : (
                <></>
              )}
              {data1.instagram ? (
                <div className={styles.formLocation}>
                  <div className={styles.instagram}></div>
                  <p>{data1.instagram}</p>
                </div>
              ) : (
                <></>
              )}
              {data1.phone ? (
                <div className={styles.formLocation}>
                  <div className={styles.github}></div>
                  <p>{data1.phone}</p>
                </div>
              ) : (
                <></>
              )}
              {data1.linkedin ? (
                <div className={styles.formLocation}>
                  <div className={styles.gitlab}></div>
                  <p>{data1.linkedin}</p>
                </div>
              ) : (
                <></>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Profile.layout = "L1";

export default Profile;
