import React,{ Component } from 'react'
import {  Link , NavLink } from 'react-router-dom';
import './menu.css';


class Menu extends Component{

  handleLogout = (e) =>{
    localStorage.clear();
    this.props.history.push('/landing')
    
  }
    render(){
        return (
            <div>
                <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">
        <Link class="navbar-brand" to="/">Aroha Technologies</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="nav pl-5">
            
             <li className="dropdown pt-2">
                 <Link to='/dashboard' className='dropdown-toggle' data-toggle="dropdown" data-toggle="dropdown-hover">User Management</Link>
                                    <ul className="dropdown-menu ">
                                        <li><Link to='/admin' className="dropdown-item" >Admin</Link></li>
                                        <li><Link to='/managers' className="dropdown-item" >Managers</Link></li>
                                        <li><Link to='/departments' className="dropdown-item" >Departments/Projects</Link></li>
                                    </ul>


                                </li>
                                <li class="nav-item">
              <Link class="nav-link" to="/meetings">Meetings </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" onClick={(e) => this.handleLogout(e)}>Logout </Link>
            </li>
            
          </ul>
        </div>
    </div>
  </nav>
            </div>
        )
    }
}

export default Menu

