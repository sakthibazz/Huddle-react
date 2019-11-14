import React from 'react';

class Team extends React.Component {
  render() {
  	return (
     <section className="section pt-4" id="team">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <h1 className="section-title text-center">Behind The People</h1>
                        <div className="section-title-border margin-t-20"></div>
                        <p className="section-subtitle text-muted text-center font-secondary padding-t-30">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    </div>
                </div>
                <div className="row margin-t-50">
                    <div className="col-lg-3 col-sm-6">
                        <div className="team-box text-center hover-effect">
                            <div className="team-wrapper">
                                <div className="team-member">
                                    <img alt="" src="images/team/user-male-icon.png" className="img-fluid rounded" />
                                </div>
                            </div>
                            <h4 className="team-name">Rajesh Kumar Shanmugam</h4>
                            <p className="text-uppercase team-designation">Product Sponsor</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="team-box text-center hover-effect">
                            <div className="team-wrapper">
                                <div className="team-member">
                                    <img alt="" src="images/team/user-male-icon.png" className="img-fluid rounded" />
                                </div>
                            </div>
                            <h4 className="team-name">Ramesh Nayaka</h4>
                            <p className="text-uppercase team-designation">Product Owner</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <div className="team-box text-center hover-effect">
                            <div className="team-wrapper">
                                <div className="team-member">
                                    <img alt="" src="images/team/user-male-icon.png" className="img-fluid rounded" />
                                </div>
                            </div>
                            <h4 className="team-name">Manasa</h4>
                            <p className="text-uppercase team-designation">React Developer</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <div className="team-box text-center hover-effect">
                            <div className="team-wrapper">
                                <div className="team-member">
                                    <img alt="" src="images/team/user-male-icon.png" className="img-fluid rounded" />
                                </div>
                            </div>
                            <h4 className="team-name">Venkat Reddy</h4>
                            <p className="text-uppercase team-designation">PHP Laravel Developer</p>
                        </div>
                    </div>

                    

                </div>
            </div>
        </section>
  	);
  }
}
export default Team;