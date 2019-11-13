import React,{Component  } from 'react';
import axios from 'axios';
import { API_URL } from "../../utils/const";

class AllUsers extends Component{
    state={
        user_id:"",
        allusers:[],
        userId:"",
        tasks:[]
    }
    componentDidMount(){
        axios.get(`${API_URL}/api/allusers`,{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(res=>{
                console.log(res)
                const {success} = res.data
                this.setState({
                    allusers:success
                })
          })

    }

    handleUsers = (e, index) => {
        const { value } = e.target;
        const userdetails ={
            user_id: localStorage.getItem("userid")
          }
        axios.post(`${API_URL}/api/displyAllData`, userdetails,{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
        .then(res=>{
            const {success} = res.data
            this.setState({
                tasks:success
            })
        })

        
        this.setState({
          userId: value
        });
      };


    render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <label>Select User:</label>
                            <select value={this.state.userId.id} onChange={(e)=>this.handleUsers(e)}>
                               {
                                   this.state.allusers.map(val=>{
                                       return(
                                           
                                           <option value={val.id}>{val.first_name} + " " + {val.last_name}</option>
                                       )
                                   })
                               }
                            </select>
                            
                        </div>

                    </div>
                    <div className="row">
                        <table className="table table-bordered mt-5">
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tasks.map((item,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{item.project_name}</td>
                                                <td>{item.description}</td>
                                                <td>{item.status_name}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllUsers