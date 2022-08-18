import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const Login = () => {
 

  const history = useNavigate();

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  console.log(inpval);

  const getdata = (e) => {
    // console.log(e.target.value);

    const { value, name } = e.target;
    // console.log(value,name);

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addData = (e) => {
    e.preventDefault();

    const getuserArr = localStorage.getItem("users");
    console.log(getuserArr);

    const { email, password } = inpval;
    if (email === "") {
      alert("email field is requred");
    } else if (!email.includes("@")) {
      alert("plz enter valid email addres");
    } else if (password === "") {
      alert("password field is requred");
    } else if (password.length < 5) {
      alert("password length greater five");
    } else {
      if (getuserArr && getuserArr.length) {
        const userdata = JSON.parse(getuserArr);
        const userlogin = userdata.filter((el, k) => {
          return el.email === email && el.password === password;
        });

        if (userlogin.length === 0) {
          alert("invalid details");
        } else {
          alert("user login succesfully");
          localStorage.setItem("user_login", JSON.stringify(userlogin));
          history("/home");
        }
      }
    }
  };

  return (
    <div className="container">
      <form>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={getdata}
            />
          </div>
          <br />
          <div className="field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={getdata}
            />
          </div>
          <br />
          <button onClick={addData} className="fluid ui button blue">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
