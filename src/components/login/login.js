import React,{Component} from 'react'
import './login.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"
import axios from 'axios'
import swal from 'sweetalert'
import { API_URL } from '../../utils/const'




class Login extends Component{

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
    render(){
        return(
            <div>
                <section className="section-login">
                    <h2 className="text-center pt-5">Login</h2>
                <div className="container text-center login">
                    
                    <div className="row">
                    <form className="col-sm-12 text-center pt-5">
                        <div className="form-group row">
                            <label className="col-sm-5 pl-0 text-right">Email:</label>
                            <input className="col-sm-6 form-control" type="text" name="email" onChange={(e)=>this.handleEmail(e)} />
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-5 pl-0 text-right">Password:</label>
                            <input className="col-sm-6 form-control" type="password" name="pwd" onChange={(e) =>this.handlePassword(e)} />
                        </div>
                        <button className="btn btn-primary p-1 m-3" onClick={(e) =>this.submit(e)}>Submit</button>
                        </form>
                </div>
                <Link class="nav-link " to="/">Home</Link>
                </div>
                
                </section>
                
            </div>
        )
    }
}

export default Login