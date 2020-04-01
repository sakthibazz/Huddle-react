import React,{Component} from 'react'
import axios from 'axios';
import { API_URL } from "../utils/const";
import { Link } from "react-router-dom";

class NewPwd extends Component{
    state={
        password:"",
        newpassword:""
    }

    handlepassword = (e) =>{
        e.preventDefault()
        const data = {
            phone:localStorage.getItem('phone'),
            email:localStorage.getItem('email'),
            new_password:this.state.password,
            confirm_password:this.state.newpassword
        }
        axios.post(`${API_URL}/api/passwordUpdate`,data,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res=>{
            console.log(res)
            this.props.history.push('/login')
        })
        .catch(err=>{
            console.log(err)
        })

    }

    handlePwd = (e) =>{
        this.setState({
            password:e.target.value
        })
    }

    handleNewpwd = (e) =>{
        this.setState({
            newpassword:e.target.value
        })
    }

    render(){
        return(
            <div>
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
                              RESET PASSWORD
                            </Link>
                          </h3>
                          {/* <p className="text-muted">Enter New Password.</p> */}
                        </div>
                        <div className="py-3 px-0">
                          <form>
                            <div className="form-group row mb-0">
                              <label
                                htmlFor="username "
                                className="col-sm-3 mt-2 text-right"
                              >
                                New Password
                              </label>
                              <input
                                type="password"
                                className="form-control col-sm-8"
                                id="pswd"
                                placeholder="Enter password"
                                name="pswd"
                                onChange={(e)=>this.handlePwd(e)}
                              />
                            </div>
                           

                            <div className="form-group row mb-0 mt-3">
                              <label
                                htmlFor="userpassword"
                                className="col-sm-3 mt-2 text-right"
                              >
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                className="form-control  col-sm-8"
                                id="pwd"
                                placeholder="Confirm password"
                                name="pwd"
                                onChange={(e) =>this.handleNewpwd(e) }
                              />
                            </div>

                            <div className="mt-3">
                              <button
                                type="submit"
                                className="btn btn-custom btn-block"
                                onClick={(e)=>this.handlepassword(e)}
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
        )
    }
}

export default NewPwd