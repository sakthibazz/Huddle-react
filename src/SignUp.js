import React from 'react';
import Aux from './hoc/Aux_';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert'
import { API_URL } from './utils/const';


class SignUp extends React.Component {
    state={
        firstname:"",
        email:"",
        pwd:"",
        cpwd:"",
        phone:"",
        info:"",
        firstNameError:'',
        emailError:'',
        phoneError:'',
        pwdError:'',
        cpwdError:'',
        lname: '',
        isLoading:false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            firstNameError:'',
            emailError:'',
            phoneError:'',
            pwdError:'',
            cpwdError:''
        })
    }

    phoneValidation = e => {
        const num = String.fromCharCode(e.which);

        if(!(/[0-9]/.test(num))) {
            e.preventDefault();
            this.setState({
                phoneError : 'Enter only numbers'
            })
        }
    }

    character = e => {
        const char = String.fromCharCode(e.which);

        if(!(/^[A-Za-z]+$/.test(char))) {
            e.preventDefault();
            this.setState({
                firstNameError : 'Enter only Characters',
                err : true
            })
        }
    }

    // handleFname = (e) =>{
    //     const fname = e.target.value
    //     this.setState({
    //         fname:fname
    //     })
    // }

    // handlePhone = (e) =>{
    //     const {value} = e.target
    //     this.setState({
    //         phone:value
    //     })
    // }

    // handleEmail = (e) =>{
    //     const {value} = e.target
    //     this.setState({
    //         email:value
    //     })
    // }

    // handlePassword = (e) =>{
    //     const {value} = e.target
    //     this.setState({
    //         pwd:value
    //     })
    // }

    // handleCpassword = (e) =>{
    //     const {value} = e.target
    //     this.setState({
    //         c_pwd:value
    //     })

    // }

    submit = (e) =>{
        e.preventDefault()
        this.setState({
            isLoading:true
        })
        
        const user ={
            first_name:this.state.firstname,
            last_name:this.state.lname,
            email:this.state.email,
            phone:this.state.phone,
            password:this.state.pwd,
            confirm_password:this.state.cpwd
        }
        console.log(API_URL)
        axios.post(`${API_URL}/api/register` , user)
        
            .then(res =>{
                const {success} = res.data.success;
                this.setState({
                    isLoading:false
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
                const errors = err.response.data.error
                this.setState({
                        firstNameError:errors.first_name,
                        emailError:errors.email || errors.aroha_email_error,
                        phoneError:errors.phone,
                        pwdError:errors.password,
                        cpwdError:errors.confirm_password,
                        isLoading:false
                        
                })
               
                console.log(err.response.data.error) ;            
            })
    }  
     
  render() {
      const {isLoading} = this.state
  	return (
        <div>{
            (!localStorage.getItem('userid')) ?
            <div>
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
                                    <div className="py-3">
                                        <form>
                                            <div className="form-group row mb-0">
                                                <label for="firstname" className="col-sm-3 mt-2 text-right "></label>
                                                <div className="text-danger col-sm-8">{this.state.firstNameError}</div>
                                            </div>
                                            <div className="form-group row mb-0">
                                                <label for="firstname" className="col-sm-3 mt-2 text-right ">First Name</label>
                                                <input type="text" className="form-control col-sm-8" id="firstname" name="firstname" placeholder="First Name"  onChange={(e) => this.handleChange(e)} onKeyPress={e => this.character(e)} />
                                            </div>
                                            
                                            <div className="form-group row mb-0">
                                                <label for="firstname" className="col-sm-3 mt-2 text-right "></label>
                                                <div className="text-danger col-sm-8">{this.state.emailError}</div>
                                            </div>
                                            <div className="form-group row mb-0">
                                                <label for="email" className="col-sm-3 mt-2 text-right">Email</label>
                                                <input type="text" className="form-control col-sm-8" id="email" name="email" placeholder="Enter Email" onChange={(e) => this.handleChange(e)}/>
                                            </div>

                                            <div className="form-group row mb-0">
                                                <label for="firstname" className="col-sm-3 mt-2 text-right "></label>
                                                <div className="text-danger col-sm-8">{this.state.phoneError}</div>
                                            </div>
                                            <div className="form-group row mb-0">
                                                <label for="email" className="col-sm-3 mt-2 text-right">Mobile</label>
                                                <input type="text" className="form-control col-sm-8" id="phone" name="phone" placeholder="10 Digit Mobile Number" onChange={(e) => this.handleChange(e)} onKeyPress={e => this.phoneValidation(e)}/>
                                            </div>

                                            <div className="form-group row mb-0">
                                                <label for="firstname" className="col-sm-3 mt-2 text-right "></label>
                                                <div className="text-danger col-sm-8">{this.state.pwdError}</div>
                                            </div>
                                            <div className="form-group row mb-0">
                                                <label for="userpassword" className="col-sm-3 mt-2 text-right">Password</label>
                                                <input type="password" className="form-control col-sm-8" id="pwd" name="pwd" placeholder="Enter password" onChange ={(e) => this.handleChange(e)}/>
                                            </div>

                                            <div className="form-group row mb-0">
                                                <label for="firstname" className="col-sm-3 mt-2 text-right "></label>
                                                <div className="text-danger col-sm-8">{this.state.cpwdError}</div>
                                            </div>
                                            <div className="form-group row mb-0">
                                                <label for="userpassword" className="col-sm-3 mt-2 text-right">Confirm Password</label>
                                                <input type="password" className="form-control col-sm-8" id="cpwd" name="cpwd" placeholder="Confirm password" onChange={(e) => this.handleChange(e)}/>
                                            </div>

                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                <label className="custom-control-label" for="customControlInline">Remember me</label>
                                            </div>

                                            <div className="mt-3">
                                                
                                                <button type="submit" className="btn btn-custom btn-block" disabled={isLoading} onClick={(e) => this.submit(e)}>Sign Up&nbsp;
                                                {isLoading &&<i className="fa fa-spinner fa-spin"></i>}
                                                </button>
                                            </div>

                                            <div className="mt-4 mb-0 text-center">
                                                <p className="mb-0">Already have an account?
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
                </div> 
        :
        this.props.history.push('/tasks')
            }
        </div>
  	);
  }
}
export default SignUp;