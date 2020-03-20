import React,{Component  } from 'react';
import axios from 'axios';
import { API_URL } from "../../utils/const";
import Loader from 'react-loader-spinner';
import Menuone from "../menu/menu-1";
import "react-widgets/dist/css/react-widgets.css";
import DropdownList from "react-widgets/lib/DropdownList";

class AllUsers extends Component{
    state={
        user_id:"",
        allusers:[],
        userId:"",
        tasks:[],
        display : true,
        status:[],
        sname:""
    }
    componentDidMount(){
        axios.get(`${API_URL}/api/allusers`)
          .then(res=>{
                console.log(res)
                const {success} = res.data
                this.setState({
                    allusers:success,
                    display:false
                })
          })

          axios.get(`${API_URL}/api/allStatus`)
          .then(res=>{
            console.log(res);
            const {success} = res.data;
            this.setState({
              status:success,
              display:false
              
            })
          });

    }

   

    onSelectedUser = (user) => {

        const userdetails ={
            user_id: user.id
          }
        const user_id = user.id
        axios.post(`${API_URL}/api/displyAllData`, userdetails)
        .then(res=>{
            const {success} = res.data
            this.setState({
                tasks:success,
                display:false
            })

        })

        
        this.setState({
          userId: user.id,
          user_id
        });
      };

      onSelectedStatus = (status) => {
        const {userId} = this.state
        const details ={
            user_id: userId,
            status_id:status.id
          }
        axios.post(`${API_URL}/api/displyAllDataBasedStatus`, details)
        .then(res=>{
            const {success} = res.data
            this.setState({
                tasks:success,
                display:false
            })

        })

       
      };


    render(){
        let widget = (
            <DropdownList filter
            onSelect={this.onSelectedUser}
              data={this.state.allusers}
              valueField="id"
              textField="first_name"
              defaultValue={"Select User"}
            />
          );

          let widget1 = (
            <DropdownList filter
            onSelect={this.onSelectedStatus}
              data={this.state.status}
              valueField="id"
              textField="name"
              defaultValue={"select Ststus"}
            />
          );
        return(
            <div> {
                
                (localStorage.getItem('userid')) ?
                <div>
                <Menuone />
                <h1 className="mt-5 pt-5">Users Tasks</h1>
                <div className="container ">
                        <div>
                            
                    </div>
                    <div className="row " >
                        <div className="col-sm-6">
                            <label className="pr-5">Select User:</label>
                            
                                {/* this.state.allusers && this.state.allusers.length>0 */}
                                <p>{widget}</p>
                            
                           
                           
                        </div>
                        <div className="col-sm-6">
                            <label className="pr-5">Select Status:</label>
                            
                                {/* this.state.allusers && this.state.allusers.length>0 */}
                                <p>{widget1}</p>
                            
                           
                           
                        </div>
                         {/* <div className="col-sm-6 text-left">
                         <label className="font-weight-bold">Select Status: </label>
                         <select value={this.state.sname} onChange={e => this.handleStatus(e)} className="form-control">
                             <option value="select">All Task</option>
                           {this.state.status.map((sts,index) => {
                             return (
                              
                                 <option value={sts.name} key={index}>{sts.name}</option>
                               
                             )
                           })}
                         </select>
                       </div> */}

                        
                        
                    </div>
                    <div className="row">
                     {
                       this.state.tasks.length == 0
                       ?
                       <h1 className="text-center p-5">No Data Available,Please Select User to view tasks</h1>
                       :
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
    }
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