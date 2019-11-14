import React from 'react';
import { Link } from 'react-router-dom';

class Process extends React.Component {
  render() {
  	return (
        <section className="section bg-light" id="workflow">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h1 className="section-title text-center">Task WorkFlow</h1>
                    <div className="section-title-border margin-t-20"></div>
                    <p className="section-subtitle text-muted text-center font-secondary padding-t-30">In an ideal world this website wouldn’t exist, a project manager can view all the tasks of team members. He/She can be able to analyse and optimise the time taken to close a particular task </p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 text-center process-left-icon-1">
                    <i className="pe-7s-angle-right"></i>
                </div>
                <div className="col-lg-6 text-center process-left-icon-2">
                    <i className="pe-7s-angle-right"></i>
                </div>
            </div>
            <div className="row margin-t-50">
                <div className="col-lg-4 plan-line">
                    <div className="text-center process-box">
                        <i className="pe-7s-pen text-custom"></i>
                        <h4 className="padding-t-15">Create the Task</h4>
                        <p className="text-muted"></p>
                    </div>
                </div>
                <div className="col-lg-4 plan-line">
                    <div className="text-center process-box">
                        <i className="pe-7s-id text-custom"></i>
                        <h4 className="padding-t-15">Manage the Task</h4>
                        <p className="text-muted"></p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="text-center process-box">
                        <i className="pe-7s-target text-custom"></i>
                        <h4 className="padding-t-15">complete the Task</h4>
                        <p className="text-muted"></p>
                    </div>
                </div>
                <div className="text-center mx-auto">
                <Link to="" className="btn btn-custom waves-light waves-effect margin-t-50">Get Started <i className="mdi mdi-arrow-right"></i></Link>
                </div>
            </div>
        </div>
    </section>
  	);
  }
}
export default Process;