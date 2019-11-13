import React,{Component  } from 'react'
import axios from 'axios'
import { API_URL } from "../../utils/const";

class OnHoldTasks extends Component{
    state={
      user_id: "",
        onhold:[]
    }

    componentDidMount(){
      const Details = 
      {
        user_id: localStorage.getItem("userid")
      }
        axios.post(`${API_URL}/api/onHold` , Details ,{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
        .then(res=>{
            console.log(res);
            const {success} = res.data
            this.setState({
                onhold:success
            })
        })
    }
    render(){
        return(
            <div>
                <table className="table table-bordered mt-5">
                    <thead>
                    <tr>
                <th>Name</th>
                <th>Desc</th>
              </tr>
                    </thead>
                    <tbody>
              
             {
               this.state.onhold.map(val=>{
                 return(
                   <tr>
                     <td>{val.project_name}</td>
                     <td>{val.description}</td>
                   </tr>
                 )
               })
             }
             </tbody>
            </table>
            </div>
        )
    }
}

export default OnHoldTasks