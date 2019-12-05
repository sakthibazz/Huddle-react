import React,{ Component } from 'react'
import {  Link , NavLink,withRouter} from 'react-router-dom';


class Menuone extends Component{

  handleLogout = (e) =>{
    localStorage.clear();
    this.props.history.push('/login')
  }
  
    

    render(){
      const username = localStorage.getItem('username')
      const groupId = localStorage.getItem('groupid')
        return (
            <div>
                <nav className="navbar navbar-expand-lg fixed-top">
    <div className="container">
        <Link className="navbar-brand" to="/">Aroha Technologies</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        {
                parseInt(groupId) !== 3
                ?
                <ul className="nav">
                  <li class="dropdown pt-2">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="/">MasterData</a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="/status">Status</a></li>
                      <li><a class="dropdown-item" href="/projects">Projects</a></li>
                      <li><a class="dropdown-item" href="/users">Users</a></li>
                      </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/allusers" >All Users </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={(e) => this.handleLogout(e)}>Logout </Link>
                  </li>

                   {/* <li className="nav-item">
                     <Link className="nav-link" to="/login" onClick={(e) => this.handleLogout(e)}>Logout </Link>
                  </li> */}
                </ul>
                :
                <ul className="nav">
                  <li className="nav-item">
                  <Link className="nav-link" to="" >{username} </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={(e) => this.handleLogout(e)}>Logout </Link>
                  </li>
                  
                </ul>
              }
         
        </div>
    </div>
  </nav>
            </div>
        )
    }
}

export default withRouter(Menuone)

