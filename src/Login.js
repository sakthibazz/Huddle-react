import React from 'react';
import Aux from './hoc/Aux_';
import { Link } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert'
import { API_URL } from './utils/const'

class Login extends React.Component {
    state = {
        email:"",
        pwd:""
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

    submit = (e) =>{
        e.preventDefault();
        const user_details = {
            email:this.state.email,
            password:this.state.pwd
        }

        axios.post(`${API_URL}/api/login`, user_details)
            .then(res =>{
                console.log(res);
                const {token,user_id} = res.data.success
                localStorage.setItem('token' , token)
                localStorage.setItem('userid' , user_id)

                if(token){
                    this.props.history.push('/tasks')
                }

            })
            .catch(err =>{
                console.log(err)
                // const {msg} =err.response.error
                // alert("Invalid credentials");
                swal( "Invalid Credentials",{
                    icon: "warning",
                    button: "OK",
                  });
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
                                            <h3 className="font-weight-bold"><Link to="home-one"  className="text-dark text-uppercase account-pages-logo">Huddle Meeting</Link></h3>
                                            <p className="text-muted">Sign in to continue to Huddle Meeting.</p>
                                        </div>
                                        <div className="py-3 px-0">
                                            <form>
                                                <div className="form-group row mb-0">
                                                    <label for="username " className="col-sm-3 mt-2 text-right">Email</label>
                                                    <input type="text" className="form-control col-sm-8" id="email" placeholder="Enter Email" name="email" onChange={(e)=>this.handleEmail(e)}/>
                                                </div>

                                                <div className="form-group row mb-0">
                                                    <label for="userpassword" className="col-sm-3 mt-2 text-right">Password</label>
                                                    <input type="password" className="form-control  col-sm-8" id="pwd" placeholder="Enter password" name="pwd" onChange={(e) =>this.handlePassword(e)}/>
                                                </div>

                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                    <label className="custom-control-label" for="customControlInline">Remember me</label>
                                                </div>

                                                <div className="mt-3">
                                                    <button type="submit" className="btn btn-custom btn-block" onClick={(e) =>this.submit(e)}>Log In</button>
                                                </div>

                                                <div className="mt-4 mb-0 text-center">
                                                <Link to=""  className="text-dark"><i className="mdi mdi-lock"></i> Forgot your password?</Link>
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

export default Login;