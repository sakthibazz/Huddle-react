import React from 'react';
import Navbar from './components/landingnewpage/Navbar';
import Team from './components/landingnewpage/Team';
import Process from './components/landingnewpage/Process';
import Started from './components/landingnewpage/Started';
import Contact from './components/landingnewpage/Contact';
import SocialMedia from './components/landingnewpage/SocialMedia';
import FooterLinks from './components/landingnewpage/FooterLinks';
import { Link } from 'react-router-dom';
import Aux from './hoc/Aux_';

class HomeTwo extends React.Component {
  render() {

    var bkg1 = {
        backgroundImage: 'url(images/wave-shape/wave1.png)',
      };
      var bkg2 = {
        backgroundImage: 'url(images/wave-shape/wave2.png)',
      };
      var bkg3 = {
        backgroundImage: 'url(images/wave-shape/wave3.png)',
      };
  
  	return (
         <Aux>
                {/* Navbar Component*/}
                <Navbar />

                <section className="section bg-home home-half" id="home" data-image-src="images/bg-home.jpg">
                    <div className="bg-overlay"></div>
                    <div className="display-table">
                        <div className="display-table-cell">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8 offset-lg-2 text-white text-center">
                                        <h1 className="home-title">The Team Huddle: A Meeting App That Will Simplify Your Company’s Life</h1>
                                        <p className="padding-t-15 home-desc">A team huddle is a great alternative to a mundane meeting!</p>
                                        <p className="play-shadow margin-t-30 margin-l-r-auto"> <Link to=""  className="play-btn video-play-icon"><i className="mdi mdi-play text-center"></i></Link></p>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wave-effect wave-anim">
                        <div className="waves-shape shape-one">
                            <div className="wave wave-one" style={bkg1}></div>
                        </div>
                        <div className="waves-shape shape-two">
                            <div className="wave wave-two" style={bkg2}></div>
                        </div>
                        <div className="waves-shape shape-three">
                            <div className="wave wave-three" style={bkg3}></div>
                        </div>
                    </div>
               </section>

                
                {/* Process Component*/}
                <Process />



                {/* Team Component*/}
                <Team />


                

                {/* Started Component*/}
                <Started />

                

                {/* Contact Component*/}
                <Contact />

                {/* SocialMedia Component*/}
                <SocialMedia />
                

                {/* FooterLinks Component*/}
                <FooterLinks />

                
        </Aux>
  	);
  }
}

export default HomeTwo;