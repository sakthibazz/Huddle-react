import React,{Component  } from 'react';
import axios from 'axios';
import { API_URL } from "../../utils/const";
import Loader from 'react-loader-spinner';
import Menuone from "../menu/menu-1";

class AllUsers extends Component{
    state={
        user_id:"",
        allusers:[],
        userId:"",
        tasks:[],
        display : true
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
                    allusers:success,
                    display : false
                })
          })

    }

    handleUsers = (e, index) => {
        const { value } = e.target;
        const {user_id} = this.state
        const userdetails ={
            user_id: value
          }
        axios.post(`${API_URL}/api/displyAllData`, userdetails)
        .then(res=>{
            const {success} = res.data
            this.setState({
                tasks:success
            })
        })

        
        this.setState({
          userId: value,
          user_id
        });
      };


    render(){
        return(
            <div> {
                
                (localStorage.getItem('userid')) ?
                <div>
                <Menuone />
                <h1 className="mt-5 pt-5">Assigning projects to user</h1>
                <div className="container ">
                        <div>
                            
                    </div>
                    <div className="row pt-5" >{
                                !this.state.display &&
                        <div className="col-sm-12">
                            <label>Select User:</label>
                            <select value={this.state.userId.id} onChange={(e)=>this.handleUsers(e)}>
                                <option>Select user</option>
                               {
                                   this.state.allusers.map(val=>{
                                       return(
                                           
                                           <option value={val.id}>{val.first_name} {val.last_name}</option>
                                       )
                                   })
                               }
                            </select>
                           
                        </div>

                        }
                        
                    </div>
                    <div className="row">
                        <table className="table table-bordered mt-5 text-left">
                            <thead>{
                                !this.state.display &&
                                        <tr>
                                            <th>Task Created</th>
                                            <th>Project Name</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Task Updated</th>
                                        </tr>
                                }
                            </thead>
                            <tbody>
                                {
                                    this.state.tasks.map((item,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td width="140">{item.created_at.slice(0,10)}</td>
                                                <td width="140">{item.project_name}</td>
                                                <td>{item.description}</td>
                                                <td>{item.status_name}</td>
                                                <td width="140">{item.updated_at.slice(0,10)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                :
                this.props.history.push('/login')
        }
        <Loader
            type="Circles"
            color="#00BFFF"
            height={100}
            width={100}
            // timeout={3000}
            visible={this.state.display}
          />
            </div>
        )
    }
}

export default AllUsers