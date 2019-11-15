import React from 'react';
import Aux from './hoc/Aux_';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert'
import { API_URL } from './utils/const';


class SignUp extends React.Component {
    state={
        fname:"",
        email:"",
        pwd:"",
        c_pwd:"",
        phone:"",
        info:""
    }

    handleFname = (e) =>{
        const fname = e.target.value
        this.setState({
            fname:fname
        })
    }

    handlePhone = (e) =>{
        const {value} = e.target
        this.setState({
            phone:value
        })
    }

    handleEmail = (e) =>{
        const {value} = e.target
        this.setState({
            email:value
        })
    }

    handlePassword = (e) =>{
        const {value} = e.target
        this.setState({
            pwd:value
        })
    }

    handleCpassword = (e) =>{
        const {value} = e.target
        this.setState({
            c_pwd:value
        })

    }

    submit = (e) =>{
        e.preventDefault()
        
        const user ={
            first_name:this.state.fname,
            last_name:this.state.lname,
            email:this.state.email,
            phone:this.state.phone,
            password:this.state.pwd,
            c_password:this.state.c_pwd
        }
        console.log(API_URL)
        axios.post(`${API_URL}/api/register` , user)
        
            .then(res =>{
                const {success} = res.data.success;
                this.setState({
                    
                //    info:success
                })
                console.log(success)
                console.log(res);
                swal( success,{
                    icon: "success",
                    button: "OK",
                  });

               
               
                    this.props.history.push('/login')
              
            })
            .catch(err =>{
                console.log(err) ;            
            })
    }   
  render() {
  	return (
        <Aux>
         <div className="account-home-btn d-none d-sm-block">
          <Link to="/" className="text-white"><i className="mdi mdi-home h1"></i></Link>
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
                                            <h3 className="font-weight-bold"> <Link to="home-one" className="text-dark text-uppercase account-pages-logo">Huddle Meeting</Link></h3>
                                            <p className="text-muted">Sign up for a new Account</p>
                                        </div>
                                        <div className="p-3">
                                            <form>
                                                <div className="form-group">
                                                    <label for="firstname">First Name</label>
                                                    <input type="text" className="form-control" id="firstname" name="firstname" placeholder="First Name"  onChange={(e) => this.handleFname(e)}/>
                                                </div>
                                                

                                                <div className="form-group">
                                                    <label for="email">Email</label>
                                                    <input type="text" className="form-control" id="email" name="email" placeholder="Enter Email" onChange={(e) => this.handleEmail(e)}/>
                                                </div>

                                                <div className="form-group">
                                                    <label for="email">Mobile</label>
                                                    <input type="text" className="form-control" id="phone" name="phone" placeholder="10 Digit Mobile Number" onChange={(e) => this.handlePhone(e)}/>
                                                </div>

                                                <div className="form-group">
                                                    <label for="userpassword">Password</label>
                                                    <input type="password" className="form-control" id="pwd" name="pwd" placeholder="Enter password" onChange ={(e) => this.handlePassword(e)}/>
                                                </div>

                                                <div className="form-group">
                                                    <label for="userpassword">Password</label>
                                                    <input type="password" className="form-control" id="cpwd" name="cpwd" placeholder="Confirm password" onChange={(e) => this.handleCpassword(e)}/>
                                                </div>

                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                    <label className="custom-control-label" for="customControlInline">Remember me</label>
                                                </div>

                                                <div className="mt-3">
                                                    <button type="submit" className="btn btn-custom btn-block" onClick={(e) => this.submit(e)}>Sign in</button>
                                                </div>

                                                <div className="mt-4 mb-0 text-center">
                                                    <p className="mb-0">Don't have an account ?
                                                     <Link to="login" className="text-danger">Sign in</Link></p>
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
       
       
        </Aux>
  	);
  }
}
export default SignUp;