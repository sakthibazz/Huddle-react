import React from 'react';
// import './navbar.css'
import {Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container} from "reactstrap";



class Navbar1 extends React.Component {
    state={
        isOpen:false
    }
    handleLogout = (e) =>{
        localStorage.clear();
        this.props.history.push('/login')
      }

      toggle = () =>{
          const {isOpen} = this.state
          this.setState({
              isOpen:!isOpen
          })
      }


  render() {
      const name = localStorage.getItem('username')
  	return (
        // <nav className="navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark navbar-dark">
        //     <div className="container">
        //         <a className="navbar-brand logo text-uppercase" href="">
        //             Huddle Meeting
        //         </a>
        //         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        //             <i className="mdi mdi-menu"></i>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarCollapse">
        //             {
        //                 (!localStorage.getItem('userid')) ?
        //                 <ul className="navbar-nav navbar-center" id="mySidenav">
        //                 <li className="nav-item active">
        //                     <a href="#home" className="nav-link">Home</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a href="#workflow" className="nav-link">Workflow</a>
        //                 </li>
                        
        //                 <li className="nav-item">
        //                     <a href="#team" className="nav-link">Team</a>
        //                 </li>
                        
        //                 <li className="nav-item">
        //                     <a href="#contact" className="nav-link">Contact</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a href="/register" className="nav-link">Register</a>

        //                 </li>
        //                 <li className="nav-item">
        //                     <a href="/login" className="nav-link">Login</a>
        //                 </li>
        //             </ul>
        //             :
        //             <ul className="navbar-nav navbar-center" id="mySidenav">
        //                 <li className="nav-item">
        //                     <a href="/tasks" className="nav-link">Dashboard</a>
        //                 </li>
        //                 <li className="nav-item">
        //                 <a href="/tasks" className="nav-link">{name}</a>
        //                 </li>
        //                 <li class="nav-item">
        //                 <a class="nav-link" href="/login" onClick={(e) => this.handleLogout(e)}>Logout </a>
        //                 </li>
        //             </ul>
        //             }
                    
        //         </div>
        //     </div>
        // </nav>

        <div>
      <Navbar color="dark" dark expand="md">
      <Container>
      <NavbarBrand href="/"> Huddle Meeting</NavbarBrand>
        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>
           {
                (!localStorage.getItem('userid')) ?
          <Nav className="mr-auto" navbar>
          
               
            <NavItem>
              <NavLink href="#home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#workflow">Workflow</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#team">Team</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#contact">Contact</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register">Register</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
            
          
          
          </Nav>
          :
          <Nav>
            <NavItem>
              <NavLink href="/tasks">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tasks">{name}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login" onClick={(e) => this.handleLogout(e)}>Logout</NavLink>
            </NavItem>
          </Nav>
  }
  
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Container>
      </Navbar>
    </div>
        
  	);
  }
}

export default Navbar1;