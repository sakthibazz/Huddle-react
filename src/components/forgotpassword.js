import React, { Component } from "react";

import swal from 'sweetalert'

import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/const";

class ForgotPwd extends Component {
  state = {
    phoneNumber: "",
    email: ""
  };

 

  saveDetails = e => {
    e.preventDefault();
    const { phoneNumber,email } = this.state;
    const details = {
      phone: this.state.phoneNumber,
      email: this.state.email
    };
    axios
      .post(`${API_URL}/api/validateCred`, details)
      .then(res => {
        console.log(res);
        const {success} = res.data
        swal( success,{
          icon: "success",
          button: "OK",
        });
        this.props.history.push("/newpwd");
      })
      .catch(err =>{
        console.log(err)
        // const {error} = err.response.data
       
        swal( "Enter credentials",{
            icon: "warning",
            button: "OK",
          });
    })
    localStorage.setItem("phone", phoneNumber);
    localStorage.setItem("email", email);
  };

  handlePhone = e => {
    this.setState({
      phoneNumber: e.target.value
    });
    console.log(this.state.phoneNumber);
  };

  handleEmail = e => {
    this.setState({
      email: e.target.value
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
                          <h3 className="font-weight-bold text-dark text-uppercase account-pages-logo">
                            {/* <Link
                              to="/"
                              className=""
                            > */}
                              Huddle Meeting
                            {/* </Link> */}
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
                                onClick={e => this.saveDetails(e)}
                              >
                                Verify
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
