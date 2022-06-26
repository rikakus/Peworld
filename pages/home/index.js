import React, { useEffect, useState } from "react";
import style from "../../styles/Home.module.css";
import axios from "axios";
import Image from "next/image";
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export async function getServerSideProps(context) {
  const api1 = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.HOST}/worker?page=1&limit=3`,
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
  const job = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.HOST}/job`,
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
      job: await job(),
    },
  };
}

function HomePages(props) {
  const router = useRouter();
  const [data1, setData] = useState(props.api1.data.data);
  const [pagination, setPagination] = useState(
    props.api1.data.pagination.totalPage
  );
  const [job, setJob] = useState(props.job.data.data);
  const [key, setSearch] = useState(router.query.search || "");
  const [field, setField] = useState(router.query.field || "name");
  const [sort, setSort] = useState("ASC");

  const getContent = async () => {
    await axios
      .get(
        `${process.env.HOST}/worker?search=${key}&sort=${sort}&field=${field}&page=${currentPage}&limit=${limit}`
      )
      .then((response) => {
        setData(response.data.data);
        setPagination(response.data.pagination);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      });
  };

  const changeField = (item) => {
    if (item == "name") {
      setSearch("");
      return setField("name");
    }
    if (item == "job_desk") {
      return setField("job_desk");
    }
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      router.push(`/home?search=${key}&sort=${sort}&field=${field}`);
      getContent();
    }
  };

  const handleButton = () => {
    router.push(`/home?search=${key}&sort=${sort}&field=${field}`);
    return getContent();
  };
  const [limit, setLimit] = useState(2);
  const [currentPage, setCurrentPage] = useState(pagination);
  let a = [];
  for (var i = 0; i < pagination.totalPage; i++) {
    a.push(i);
  }
  console.log(a);
  const handleClick = async (e, i) => {
    e.preventDefault();
    await setCurrentPage(i + 1);
    return;
  };
  useEffect(() => {
    getContent();
  }, [currentPage]);
  useEffect(() => {
    setCurrentPage(1);
    getContent();
  }, [limit]);
  useEffect(() => {
    setCurrentPage(1);
    getContent();
  }, [key]);
  useEffect(() => {
    getContent();
  }, [sort]);
  console.log(pagination);
  console.log(limit);
  console.log(currentPage);

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
              disabled={field == "job_desk" ? "disabled" : ""}
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

          <div style={{ display: "flex" }}>
            <div id="dropdown">
              <select
                className="form-select"
                style={{ width: "100px", margin: "0px 20px" }}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>
            </div>
            <div id="dropdown">
              <select
                className="form-select"
                style={{ width: "100px", margin: "0px 20px" }}
                onChange={(e) => changeField(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="job_desk">Pekerjaan</option>
              </select>
            </div>
            {field == "job_desk" ? (
              <div id="dropdown">
                <select
                  className="form-select"
                  style={{ width: "100px", margin: "0px 20px" }}
                  onChange={(e) => setSearch(e.target.value)}
                >
                  <option value="">Select Pekerjaan</option>
                  {job &&
                    job.map((item, index) => (
                      <option value={item.job_desk} key={index}>
                        {item.job_desk}
                      </option>
                    ))}
                </select>
              </div>
            ) : null}
          </div>

          {data1.length == 0 ? (
            <h1>Data Not Found</h1>
          ) : (
            data1.map((item) => {
              return (
                <div className={style.card} key={item.id}>
                  <div className={style.image}>
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

                  <div className={style.detail}>
                    <h1>{item.name}</h1>
                    <p>{item.job_desk}</p>
                    {item.residence ? (
                      <div className={style.formLocation}>
                        <div className={style.location}></div>
                        <p>{item.residence}</p>
                      </div>
                    ) : (
                      <></>
                    )}

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
                      router.push(`/profile/${item.login_id}`);
                    }}
                  >
                    View Profile
                  </button>
                </div>
              );
            })
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Pagination
              style={{
                marginTop: "30px",
              }}
            >
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                  onClick={(e) => handleClick(e, currentPage - 2)}
                  previous
                />
              </PaginationItem>
              {a.map((page, i) => (
                <PaginationItem
                  active={i + 1 === pagination.currentPage}
                  key={i}
                >
                  <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={currentPage >= pagination.totalPage}>
                <PaginationLink
                  onClick={(e) => handleClick(e, currentPage)}
                  next
                />
              </PaginationItem>
            </Pagination>
            <select
              className="form-select"
              style={{ height: "50px", width: "100px", margin: "0px 0px" }}
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value={3}>{limit}</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>
      </section>
    </>
  );
}

HomePages.layout = "L1";

export default HomePages;
