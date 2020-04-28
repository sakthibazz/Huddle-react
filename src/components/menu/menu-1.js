import React,{ Component } from 'react'
import {  Link , NavLink,withRouter} from 'react-router-dom';
import './menu.css'


class Menuone extends Component{

  handleLogout = (e) =>{
    e.preventDefault()
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
        <Link className="navbar-brand" to="/tasks">Aroha Technologies</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        {
                parseInt(groupId) === 1
                ?
                <ul className="nav">
                  {/* <li className="dropdown pt-2 show">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="/">MasterData</a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="/status">Status</a></li>
                      <li><a className="dropdown-item" href="/projects">Projects</a></li>
                      <li><a className="dropdown-item" href="/users">Users</a></li>
                      <li><a className="dropdown-item" href="/assignedtasks">Assign Tasks</a></li>
                      <li><a className="dropdown-item" href="/types">Types</a></li>
                      </ul>
                  </li> */}
                  {/* <li> <Link className="nav-link" to="/dashboard" >Dashboard </Link></li> */}
                  <li className="dropdown mt-2 "><Link to='' className='dropdown-toggle' data-toggle="dropdown">MasterData</Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to='/status' className="dropdown-item" >Status </Link></li>
                                        <li ><Link to='/projects' className="dropdown-item" >Projects</Link></li>
                                        <li><Link to='/users' className="dropdown-item" >Users</Link></li>
                                        <li><Link to='/assignedtasks' className="dropdown-item" >Assign Tasks</Link></li>
                                        <li><Link to='/types' className="dropdown-item" > Types</Link></li>

                                    </ul>


                                </li>
                                <li className="dropdown mt-2 ml-3"><Link to='' className='dropdown-toggle' data-toggle="dropdown">Reports</Link>
                                    <ul className="dropdown-menu">
                                    <li><Link to='/allusers' className="dropdown-item" >All Users </Link></li>
                                        <li><Link to='/dashboard' className="dropdown-item" >Detailed View </Link></li>
                                        

                                    </ul>


                                </li>
                  {/* <li className="nav-item">
                    <Link className="nav-link" to="/allusers" >All Users </Link>
                  </li> */}

                  <li className="dropdown pt-2 ml-3">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="/">{username}</a>
                    <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/login" onClick={(e) => this.handleLogout(e)}>LogOut</a></li>
                   
                      </ul>
                  </li>
                 

                   {/* <li className="nav-item">
                     <Link className="nav-link" to="/login" onClick={(e) => this.handleLogout(e)}>Logout </Link>
                  </li> */}
                </ul>
                :
                ""
    }
    {
      parseInt(groupId) === 2
      ?
      <ul className="nav">
        <li className="nav-item">
        <Link className="nav-link" to="">My Team</Link>
        </li>
        <li className="nav-item float-right">
        <Link className="nav-link" to="">{username}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" onClick={(e) => this.handleLogout(e)}>Logout </Link>
        </li>
        
      </ul>
      :
      ""
    }
    {
                parseInt(groupId) === 3
                ?
                <ul className="nav">
                  {/* <li className="nav-item">
                  <Link className="nav-link" to="">{username}</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={(e) => this.handleLogout(e)}>Logout </Link>
                  </li> */}

<li className="dropdown pt-2 show">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="/">{username}</a>
                    <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/login" onClick={(e) => this.handleLogout(e)}>LogOut</a></li>
                   
                      </ul>
                  </li>
                  
                </ul>
                :
                ""
              }
         
        </div>
    </div>
  </nav>
            
            </div>
        )
    }
}

export default withRouter(Menuone)

