import React, { useState, useEffect } from "react";
import "./loginSignup.css";
import axios from "axios";
import TaskBoard from "../TaskBoard/TaskBoard";
import { BASE_URL } from "../../Constants.js";

const LoginSignup = () => {
  const [auth, setAuth] = useState(false);
  const [login, setLogin] = useState(true);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event:any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event:any) => {
    event.preventDefault();
    if (login) {
      doLogin();
    } else {
      doRegister();
    }
  };

  const doLogin = async () => {
    try {
      let login = await axios.post(`${BASE_URL}/user/login`, values);
      if (login.status === 200) {
        localStorage.setItem("userData", JSON.stringify(login.data));
        setAuth(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  const doRegister = async () => {
    try {
      let register = await axios.post(`${BASE_URL}/user`, values);
      if (register.status === 201) {
        setLogin(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginSignup = (event:any) => {
    event.preventDefault();
    login ? setLogin(false) : setLogin(true);
  };

  useEffect(() => {
    let userData:any = localStorage.getItem("userData");
    userData = JSON.parse(userData);
    if (userData && userData.data.token) {
      setAuth(true);
    }
  }, []);

  if (auth) {
    return <TaskBoard/>;
  } else {
    if (login) {
      return (
        <>
          <div className="loginPageCover">
            <form className="userform">
              <h3>Login</h3>
              <label className="loginLabel">Email</label>
              <input
                className="userInput"
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />

              <label className="loginLabel">Password</label>
              <input
                className="userInput"
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <div className="buttoncover">
                <button
                  className="buttonStyle_1"
                  onClick={(event) => handleFormSubmit(event)}
                >
                  Submit
                </button>
                <button
                  className="buttonStyle"
                  onClick={(event) => handleLoginSignup(event)}
                >
                  Sign Up ?
                </button>
              </div>
            </form>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="loginPageCover">
          <form className="userform">
            <h3>Sign Up</h3>

            <label className="loginLabel">Name</label>
            <input
              className="userInput"
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
            />

            <label className="loginLabel">Email</label>
            <input
              className="userInput"
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />

            <label className="loginLabel">Password</label>
            <input
              className="userInput"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />

            <div className="buttoncover">
              <button
                className="buttonStyle_1"
                onClick={(event) => handleFormSubmit(event)}
              >
                Submit
              </button>
              <button
                className="buttonStyle"
                onClick={(event) => handleLoginSignup(event)}
              >
                Login ?
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
};

export default LoginSignup;