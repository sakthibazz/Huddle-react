import React from 'react';


class Navbar extends React.Component {
    handleLogout = (e) =>{
        localStorage.clear();
        this.props.history.push('/login')
      }
  render() {
      const name = localStorage.getItem('username')
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
                    {
                        (!localStorage.getItem('userid')) ?
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
                    :
                    <ul className="navbar-nav navbar-center" id="mySidenav">
                        <li className="nav-item">
                            <a href="/tasks" className="nav-link">Dashboard</a>
                        </li>
                        <li className="nav-item">
                        <a href="/tasks" className="nav-link">{name}</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/login" onClick={(e) => this.handleLogout(e)}>Logout </a>
                        </li>
                    </ul>
                    }
                    
                </div>
            </div>
        </nav>
  	);
  }
}

export default Navbar;