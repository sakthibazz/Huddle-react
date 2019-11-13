import React,{ Component } from 'react'
import {  Link , NavLink,withRouter} from 'react-router-dom';


class Menuone extends Component{

  handleLogout = (e) =>{
    localStorage.clear()
    this.props.history.push('/login')
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
          <ul class="nav">
            
                                <li class="nav-item">
              <Link class="nav-link" to="/meetings">History </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login" onClick={(e) => this.handleLogout(e)}>Logout </Link>
            </li>
            
          </ul>
        </div>
    </div>
  </nav>
            </div>
        )
    }
}

export default withRouter(Menuone)

