import React,{ Component } from 'react'
import {  Link , NavLink ,withRouter} from 'react-router-dom';
// import './menu.css';


class Menu extends Component{

  render() {
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark">
        <div className="container">
          <a className="navbar-brand logo text-uppercase" href="">
            Huddle Meeting
                </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <i className="mdi mdi-menu"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav navbar-center" id="mySidenav">
              <li className="nav-item active">
                <a href="#home" className="nav-link">Home</a>
              </li>
              <li className="nav-item">
                <a href="#workflow" className="nav-link">Workflow</a>
              </li>

              <li className="nav-item">
                <a href="#team" className="nav-link">Team</a>
              </li>

              <li className="nav-item">
                <a href="#contact" className="nav-link">Contact</a>
              </li>
              <li className="nav-item">
                <a href="/register" className="nav-link">Register</a>

              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Menu)

