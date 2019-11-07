import React,{ Component } from 'react'
import Menu from '../menu/menu'

class Meeting extends Component{
    state={
        data:[
            {
                name:"Pamuleti",
                NewTask:2,
                ContinuedTask:1,
                CompletedTask:1,
                Dependency:"-",
                Learning:"-"

            },
            {
                name:"Ananth",
                NewTask:3,
                ContinuedTask:2,
                CompletedTask:1,
                Dependency:"Ramesh",
                Learning:"-"

            },
            {
                name:"Shailendra",
                NewTask:5,
                ContinuedTask:2,
                CompletedTask:3,
                Dependency:"-",
                Learning:"React"

            }
        ]
    }

    meeting = (e) =>{
        this.props.history.push(`/details`)
    }

    render(){
        const {data} = this.state
        return(
            <div>
                <Menu />
                <div className="container mt-5">
                    <h2 className="mt-5 pt-5">List of Employees's Meetings</h2>
                <form className="col-sm-12 text-center  pt-3">
                        <div className="form-group">
                            <label className="col-sm-1 float-left pt-2">Date:</label>
                            <input type="date" name="bday" max="3000-12-31" 
                                    min="1000-01-01" class="form-control col-sm-3" />
                        </div>

                        
                        </form>
                    <div className="row">
                   

                        
                        <div className="col-sm-12 table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>New Task</th>
                                        <th>Continued Task</th>
                                        <th>Completed Task</th>
                                        <th>Dependency</th>
                                        <th>Learning</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((val,index) =>{
                                            return(
                                                <tr key={index} onClick={(e) => this.meeting(e)}>
                                                    <td>{val.name}</td>
                                                    <td>{val.NewTask}</td>
                                                    <td>{val.ContinuedTask}</td>
                                                    <td>{val.CompletedTask}</td>
                                                    <td>{val.Dependency}</td>
                                                    <td>{val.Learning}</td>

                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Meeting