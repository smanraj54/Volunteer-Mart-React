import { withRouter } from "react-router";
import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Grocery from "../grocery.png";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  axios.defaults.withCredentials = true;

  const formData = {
    email: email
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };

  function emailValidation(event) {
    event.preventDefault();
    if (email.trim() === "") {
      setError("Please Enter E-mail.");
    } else if (
      !/^[a-zA-z0-9]+[_]*[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email)
    ) {
      setError("Enter Valid Email");
    } else {
      const url = "http://localhost:2000/api/users/forgotPassword";
      axios.post(url, formData).then((response) => {
        console.log(response.status)
        console.log(email)
        if (response.status === 500) {
          setError("server error");
        } 
        else if (response.status === 200) 
        {
          localStorage.setItem("resetUser", email);
          localStorage.setItem("resetQuestion", response.data.data[0].question);

          props.history.push({
            pathname: "/question",
          });
        } 
        else if (response.status === 204) 
        {
          setError("No such user Exist's");
        }
      });
    }
  }

  return (
    <div>
      <Header />
      <div className="gap-3">
        <h1></h1>
      </div>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col col-lg-5">
            <img src={Grocery} className="img-fluid" alt="grocery image" />
          </div>
          <div className="col col-lg-5">
            <form onSubmit={emailValidation}>
              <div className="container">
                <div className="text-center">
                  <h4>Reset Password</h4>
                </div>
                <div className="form-group">
                  <label>Enter your Email :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    onChange={emailHandler}
                  />
                </div>
                <div className="text-center">
                  <h6 style={{ color: "blue" }}>{error}</h6>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <h1></h1>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ForgotPassword);
