import React,{ Component } from 'react'
// import './landing.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Login from '../login/login';
import Navbar from './components/landingnewpage/Navbar';
import Services from './components/landingnewpage/Services';
import Features from './components/landingnewpage/Features';
import Descriptions from './components/landingnewpage/Descriptions';
import Pricing from './components/landingnewpage/Pricing';
import Team from './components/landingnewpage/Team';
import Process from './components/landingnewpage/Process';
import Testi from './components/landingnewpage/Testi';
import Started from './../components/landingnewpage/Started';
import Blog from '../components/landingnewpage/Blog';
import Contact from './components/landingnewpage/Contact';
import SocialMedia from './components/landingnewpage/SocialMedia';
import Footer from './components/landingnewpage/Footer';
import FooterLinks from './components/landingnewpage/FooterLinks';
import Switcher from './components/landingnewpage/Switcher';
import Aux from './hoc/Aux_';


class Landing extends Component{
 render(){
     return(
     
         <div>
    <nav class="navbar navbar-expand-lg fixed-top landing">
    <div class="container">
        <a class="navbar-brand" href="#">Aroha Technologies</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="nav">
            <li class="nav-item">
              <Link class="nav-link " to="/login">Login </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link " to="/register">Register </Link>
            </li>
            
          </ul>
        </div>
    </div>
  </nav>
 
             <section className="section-one">
             <div className="banner-section"></div>
               <div className="row">
                  <div className="col-sm-12 banner-content">
                  <div className=" banner-cont mx-auto">
                    {/* <h6>Online Test</h6> */}
                    <h2>Welcome To Huddle Meeting</h2>
                    
                      <p>This place has all the features of a perfect book shop. Throughout 2 
                          stylish as well as peaceful levels, the cozy shop features a broad yet 
                          taken into consideration range of modern fiction as well as non-fiction 
                          titles, along with a large selection of worldwide imports. Would you like
                          to check out our Ebook Store Template?
                          fiction as well as non-fiction 
                          titles, along with a large selection of worldwide imports. Would you like
                          to check out our Ebook Store Template?
                      </p>
                      
                    </div>
                </div>
                </div>
             </section>

            

          

         </div>
     )
 }
}

export default Landing