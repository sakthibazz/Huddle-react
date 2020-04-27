import React,{Component  } from "react"
import Menu1 from "../menu/menu-1"

class DetailedView extends Component{
    render(){
        return(
            <div>
                <Menu1 />
                <div className="container mt-5 pt-5">
                    <div className="row">
                        <div className="col-md-4">
                        <div className="team-box text-center hover-effect">
                            <div className="team-wrapper">
                                <div className="team-member">
                                    <img alt="" src="images/team/user-male-icon.png" className="img-fluid rounded" />
                                </div>
                            </div>
                            <h4 className="team-name">Ramesh Nayaka</h4>
                            <p className="text-uppercase team-designation">Manager</p>
                            <p className="text-uppercase team-designation">9845810267</p>
                        </div>
                        </div>
                        <div className="col-sm-6 mt-5 pt-5 ml-5 pl-5">
                            <table className="table table-bordered  pt-5 mt-5">
                                <thead>
                                    <tr>
                                    <th>Description</th>
                                        <th>Task Status</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Deploying Huddle App</td>
                                        <td>New Task</td>
                                    </tr>
                                    <tr>
                                        <td>Sql Practice</td>
                                        <td>New Task</td>
                                    </tr>
                                    <tr>
                                        <td>Deployed Capability App</td>
                                        <td>Completed Task</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default DetailedView