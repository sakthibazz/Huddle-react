import React,{Component} from 'react'
import './register.css'
import axios from 'axios';
import swal from 'sweetalert'
import { API_URL } from '../../utils/const';

import Menu from '../menu/menu';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"

class Register extends Component{
    state={
        fname:"",
        lname:"",
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

    handleLname = (e) =>{
        const name=e.target.value
        this.setState({
            lname:name
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

    render(){
        return(
            <div>
                {/* <Menu /> */}
               
               
                <section className="section-register">
                <h2 className="text-center pt-5">Register</h2>
                <div className="container text-center register">
                   
                    <div className="row">
                    <form className="col-sm-12 text-center pt-5">
                        <div className="form-group row">
                            <label className="col-sm-5 pl-0 text-right">First Name:</label>
                            
                            <input className="col-sm-6 form-control" type="text" name="firstname" onChange={(e) => this.handleFname(e)} />
                            
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-5 pl-0 text-right">Last Name:</label>
                            <input className="col-sm-6 form-control" type="text" name="lastname" onChange={(e) => this.handleLname(e)}  />
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-5 pl-0 text-right">Phone:</label>
                            <input className="col-sm-6 form-control" type="text" name="phone" maxlength="10" onChange={(e) => this.handlePhone(e)}  />
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-5 pl-0 text-right">Email:</label>
                            <input className="col-sm-6 form-control" type="text" name="email" onChange={(e) => this.handleEmail(e)} />
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-5 pl-0 text-right">Password:</label>
                            <input className="col-sm-6 form-control" type="password" name="pwd" onChange ={(e) => this.handlePassword(e)} />
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-5 pl-0 text-right">Confirm Password:</label>
                            <input className="col-sm-6 form-control" type="password" name="cpwd" onChange={(e) => this.handleCpassword(e)} />
                        </div>
                       
                        
                        <button className="btn btn-primary p-1 m-3" onClick={(e) => this.submit(e)}>Submit</button>
                        <div>{this.state.info}</div>
                        </form>
                </div>
                </div>
                </section>
            </div>
        )
    }
}

export default Register