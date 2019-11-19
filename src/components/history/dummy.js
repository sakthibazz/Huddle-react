import React,{Component  } from 'react'
import axios from 'axios'
import { API_URL } from "../../utils/const";

class CompletedTasks extends Component{
    state={
      user_id: "",
        contTasks:[]
    }

    componentDidMount(){
      const Details = 
      {
        user_id: localStorage.getItem("userid")
      }
        axios.post(`${API_URL}/api/completedTasks` , Details ,{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
        .then(res=>{
            console.log(res);
            const {success} = res.data
            this.setState({
              contTasks:success
            })
        })
    }
    render(){
        return(
            <div>
                <table className="table table-bordered mt-5">
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Desc</th>
              </tr>
             {
               this.state.contTasks.map(val=>{
                 return(
                   <tr>
                     <td>{val.updated_at.slice(0,10)}</td>
                     <td>{val.project_name}</td>
                     <td>{val.description}</td>
                   </tr>
                 )
               })
             }
            </table>
            </div>
        )
    }
}

export default CompletedTasks