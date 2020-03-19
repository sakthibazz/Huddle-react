import React, { Component } from "react";
import "./form.css";
import {
  Container,
  Button,
  FormGroup,
  Label,
  Input,
  Span,
  Card
} from "reactstrap";

import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/const";

class ForgotPwd extends Component {
  state = {
    phoneNumber: "",
    otp: ""
  };

  generateOtp = e => {
    e.preventDefault();
    const data = {
      phone: this.state.phoneNumber
    };
    axios
      .post(`${API_URL}/api/sendOtp`, data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  saveOtp = e => {
    e.preventDefault();
    const { phoneNumber } = this.state;
    const details = {
      phone: this.state.phoneNumber,
      otp: this.state.otp
    };
    axios
      .post(`${API_URL}/api/verifyOtp`, details)
      .then(res => {
        console.log(res);
        this.props.history.push("/newpwd");
      })

      .catch(err => {
        console.log(err);
      });
    localStorage.setItem("phone", phoneNumber);
  };

  handlePhone = e => {
    this.setState({
      phoneNumber: e.target.value
    });
    console.log(this.state.phoneNumber);
  };

  handleEmail = e => {
    this.setState({
      otp: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div className="account-home-btn d-none d-sm-block">
          <Link to="/" className="text-white">
            <i className="mdi mdi-home h1"></i>
          </Link>
        </div>

        <section className="bg-account-pages height-100vh">
          <div className="display-table">
            <div className="display-table-cell">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-5">
                    <div className="card account-card">
                      <div className="card-body">
                        <div className="text-center mt-3">
                          <h3 className="font-weight-bold">
                            <Link
                              to="home-one"
                              className="text-dark text-uppercase account-pages-logo"
                            >
                              Huddle Meeting
                            </Link>
                          </h3>
                          <h4 className="text-muted">Forgot Password.</h4>
                        </div>
                        <div className="py-3 px-0">
                          <form>
                            <div className="form-group row mb-0">
                              <label
                                htmlFor="phoneNumber"
                                className="col-sm-3 mt-2 text-right"
                              >
                                 Phone Number
                              </label>
                              <input
                                type="text"
                                className="form-control col-sm-8"
                                id="phoneNumber"
                                placeholder="Enter Phone Number"
                                name="phoneNumber"
                                onChange={e => this.handlePhone(e)}
                              />
                            </div>
                            {/* <div className="mt-1">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={e => this.generateOtp(e)}
                              >
                                Generate Otp&nbsp;
                              </button>
                            </div> */}

                            <div className="form-group row mb-0 mt-3">
                              <label
                                htmlFor="email"
                                className="col-sm-3 mt-2 text-right"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control  col-sm-8"
                                id="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={e => this.handleEmail(e)}
                              />
                            </div>

                            <div className="mt-3">
                              <button
                                type="submit"
                                className="btn btn-custom btn-block"
                                onClick={e => this.saveOtp(e)}
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ForgotPwd;
