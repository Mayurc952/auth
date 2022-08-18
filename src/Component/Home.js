import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const history = useNavigate();
  let Newdata = JSON.parse(localStorage.getItem("users"));
  function logOut() {
    localStorage.clear();
    history("/signup");
  }
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  console.log(data, "jjjjjjjjjjjjjjjjjjj");

  const updatedData = data.slice(0, 20);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-danger">
        <div className="container-fluid">
          <img style={{ width: "3%", height: "3%" }} alt="logo" />

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/home">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            <button onClick={() => logOut()} class="btn btn-danger navbar-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <Outlet />

      <h1>User Informatiom</h1>

      <h2
        className="mt-3"
        style={{
          fontSize: "35px",
          color: "red",
          fontWeight: "bold",
          marginBottom: "7px",
        }}
      >
        {" "}
        View SME List
      </h2>

      <table className="table">
        <thead className="bg-dark text-white">
          <tr>
            <th scope="col">Sr.No.</th>
            <th scope="col">Name</th>
            <th scope="col">Capital</th>
            <th scope="col">Currencies</th>
          </tr>
        </thead>

        <tbody>
          {updatedData?.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{item?.name}</td>
                <td>{item?.capital}</td>
                <td>{item?.capital}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Home;
