import React,{Component  } from 'react'
import axios from 'axios'
import { API_URL } from "../../utils/const";
import Loader from 'react-loader-spinner';

class CompletedTasks extends Component{
    state={
      user_id: "",
      display : true,
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
              contTasks:success,
              display : false
            })
        })
    }
    render(){
        return(
          <div>
            {
            (localStorage.getItem('userid')) ?
            <div>
              <div>
                <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        // timeout={3000}
                        visible={this.state.display}
                      />
              </div>
                <table className="table table-bordered mt-5">
                <thead>{
                !this.state.display &&
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                }
                </thead>
             {
               this.state.contTasks.map((val, index)=>{
                 return(
                   <tr key={index}>
                     <td width="140">{val.updated_at.slice(0,10)}</td>
                     <td>{val.project_name}</td>
                     <td>{val.description}</td>
                   </tr>
                 )
               })
             }
            </table>
            </div>
            :
            this.props.history.push('/login')
    }
         </div>
        )
    }
}

export default CompletedTasks