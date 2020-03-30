import React,{Component} from 'react'
import axios from "axios";
import { API_URL } from "../../utils/const";

class DisplayAssignedTasks extends Component{
    state={
        tasksData:[],
        activePage: 5
    }
    componentDidMount(){
        const Details ={
            user_id: localStorage.getItem("userid")
          }
      
          axios
          .post(`${API_URL}/api/assignedTaskData`, Details )
          .then(res =>{
            console.log(res);
            const {success} = res.data;
            this.setState({
              tasksData:success
            })
          });

    }
    handlePageChange = (pageNumber)  => {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }


    render(){
        const {tasksData} = this.state
        return(
            <div>
                <div className="container">
                <table className="table table-bordered mt-5">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Task Description</th>
                            <th>Created Date</th>
                            <th>Updated Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasksData.map((val,index)=>{
                                return(
                                    <tr>
                                        <td>{val.username}</td>
                                        <td>{val.description}</td>
                                        <td>{val.created_at}</td>
                                        <td>{val.updated_at}</td>
                                    </tr>
                                )
                            })   
                        }
                    </tbody>
                </table>
                
                </div>

            </div>
        )
    }
}

export default DisplayAssignedTasks