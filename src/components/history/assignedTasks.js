import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Menu } from "@material-ui/core";
import Menuone from "../menu/menu-1";
import axios from "axios";
import { API_URL } from "../../utils/const";
import CompletedTasks from "./dummy";
import ContinuedTasks from "./continued";
import PendingTasks from "./pending";
import OnHoldTasks from "./onhold";
import './tasks.css'
import swal from 'sweetalert';
import Loader from 'react-loader-spinner';
import DisplayAssignedTasks from "./displaytasks";

class AssignedTasks extends Component {
  state = {
    addRows: [
      // {
      //     description:"",
      //     project_department_id:""
      // }
    ],
    selectedRow: -1,
    selectedOption: null,
    date: new Date(),
    projects: [],
    desc: "",
    editedERow:false,
    contTasks:[],
    users:[],

    display: false,

    disabled: false,
    proj_id: "",
    user_id: "",
    projId:"",
    users_id:"",
    status:[],
    statusName:"",
    statusId: '',
    fdesc: '',
    saveTaskButton : false,
    editTaskButton : false,
    type_id:"",
    types:[],
    usersError:"",
    projError:"",
    descError:""
  };

  componentDidMount() {
    

    axios.get(`${API_URL}/api/allusers`)
      .then(res=>{
            console.log(res)
            const {success} = res.data
            this.setState({
                users:success,
                display : false
            })
      })
    
    
      axios.get(`${API_URL}/api/conStatus`)
    .then(res=>{
      console.log(res);
      const {success} = res.data;
      this.setState({
        status:success
      })
    });

    axios.get(`${API_URL}/api/TaskTypes`,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(res=>{
      console.log(res);
      const {success} = res.data;
      this.setState({
        types:success
      })
    });


    const Details ={
      user_id: localStorage.getItem("userid")
    }

    axios
    .post(`${API_URL}/api/allNewTasks`, Details,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    } )
    .then(res =>{
      console.log(res);
      const {success} = res.data;
      this.setState({
        addRows:success,
        display : true
      })
    });

    
  }

  newTaskDesc = (e, index) => {
    const { value } = e.target;
    const { desc } = this.state;
    this.setState({
      desc: value,
      fdesc:value,
      saveTaskButton : true
    });
    console.log(desc);
  };

  handleUser = (e, index) => {
    const { value } = e.target;
    
    console.log(this.state.users_id);
    this.setState({
      users_id:value
    })
    const Pdetails ={
        user_id: value
       
      }
      
      axios
        .post(`${API_URL}/api/projectsDepartments`, Pdetails,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          const { proj_id, projects } = this.state;

          this.setState({
            projects: res.data.success,
            users_id: value
          });
          console.log(proj_id);
          console.log(projects)
        })
        .catch(err => {
          console.log(err);
        });
  
  };

  handleProject = (e, index) => {
    const { value } = e.target;
    const { proj_id } = this.state;
    this.setState({
      proj_id: value
    });
    console.log(this.state.proj_id);
  };

  handleTableProject = (e, index) => {
    const { value } = e.target;
    const { projId } = this.state;
    this.setState({
      projId: value
    });
  };

  saveTask = (e) => {
    let { addRows, proj_id, desc, projects,users_id,users,type_id } = this.state;
    console.log(desc)
    if(this.state.proj_id === ""){
      this.setState({
        projError:"Please Select Project"
      })
    }
   else if(this.state.desc === ""){
      this.setStste({
        descError:"Please Enter Description"
      })
    }
    else if(this.state.desc.length <=3){
      this.setState({
        descError:"Description should me minimum of 4 characters"
      })
    }
    
   else if(this.state.users_id === ""){
     this.setState({
       usersError:"Please Select User"
     })
    }
    else{
    const taskDetails = [
      {
        description: desc,
        user_id: users_id,
        project_department_id: proj_id,
        assigned_by:localStorage.getItem("userid"), 
        task_type_id:type_id,
        // created_at:h +':'+x.getMinutes() 
      //  created_at:x.toLocaleTimeString()

      }
    ];
    axios
      .post(`${API_URL}/api/createNewTask`, taskDetails,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(res => {
        console.log("this is success save");
        console.log(res);
        const { success } = res.data;
        // addRows.push({
        //     addRows
        // })
        addRows.push(success[0]);
        this.setState({
          addRows,
          saveTaskButton: false,
          desc:'',
          fdesc:'',
          users_id:"",
          proj_id:"",
          type_id:"",
          usersError:"",
          descError:"",
          projError:""
          
        });
      });
  };
  }

  handleStatus = e => {
    const { value } = e.target
    this.setState({
      statusId: value,
      editTaskButton : true,
      desc:''
    })
  }

  handleEdit = (e,index,item) =>{

    
      console.log("printing edit")
      console.log(index)
      console.log(item)
      this.setState({
          editedERow:true,
          selectedRow:index,
          desc:item.description,
          projId:item.project_department_id,
          fdesc:''
      })
  }

  statusSave = (e, row, idx) =>{
    console.log("savestatus")
    const {projId, statusId, addRows} = this.state
    const taskStatus = 
      {
        status_id:statusId,
        task_id:row.task_id,
        user_id: localStorage.getItem("userid")
      }
  
    axios
    .post(`${API_URL}/api/statusUpdate` , taskStatus,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    } )
    .then(res =>{
      console.log(res);
      const {success} = res.data
      addRows[idx]['statusName'] = success[0].status_name
      // addRows[index][''] = success[0].task_id
      this.setState({
        editedERow:false,
        addRows,
        fdesc: ''
    })
      
    })
    
  }

  handleDelete = (e, row, idx) =>{
    console.log("deleting",e.target)
    const {projId, statusId, addRows} = this.state
    const taskStatus = 
      {
        status_id:idx.status_id,
        task_id:idx.task_id
      }
  console.log(idx)
    axios
    .post(`${API_URL}/api/deleteTask` , taskStatus,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(res =>{
      console.log(res);
      this.setState(prevState =>({
        addRows: prevState.addRows.filter(m => m.task_id !== taskStatus.task_id),
        editedERow:false
      }))
    })
    .catch(err => console.log(err))
    }


  handleCancel = (e) =>{
    this.setState({
      editedERow:false
    })
  }

  handleType = (e, index) => {
    const { value } = e.target;
    const { type_id } = this.state;
    this.setState({
      type_id: value
    });
    console.log(this.state.type_id);
  };


  render() {
    const username = localStorage.getItem('username')
    return (
      <div>
        {
            (localStorage.getItem('userid')) ?
            <div>
        <Menuone />
        <Tabs className="mt-5 pt-5">
          <TabList>
            <Tab>Tasks</Tab>
            <Tab>Assigned Tasks</Tab>
          </TabList>
          <TabPanel>
            <div className="container">
              <div className="row mt-4">
              <div className="col-sm-3 text-left">
                  <label className="font-weight-bold">Select User: </label>
                  <select value={this.state.users_id} onChange={e => this.handleUser(e)} className="form-control mb-0">
                  <option value="select">Select User</option>
                    {this.state.users.map((user,index) => {
                      return  <option value={user.id} key={index}>{user.first_name}</option>
                    })}
                  </select>
                  <span className="text-danger col-sm-12">{this.state.usersError}</span>
                </div>
                <div className="col-sm-3 text-left">
                  <label className="font-weight-bold">Select Project: </label>
                  { 
                    this.state.users_id 
                    ?
                  <select value={this.state.proj_id} onChange={e => this.handleProject(e)} className="form-control mb-0">
                  <option value="select">Select Project</option>
                    {this.state.projects.map((proj,index) => {
                      
                      return (
                        proj.is_active === 1
                        ?
                        <option value={proj.id} key={index}>{proj.name}</option>
                        :
                        ""
                      )
                    })}
                  </select>
                  :
                  <select value={this.state.proj_id} onChange={e => this.handleProject(e)} className="form-control mb-0" disabled>
                  <option value="select">Select Project</option>
                    {this.state.projects.map((proj,index) => {
                      return (
                        proj.is_active === 1
                        ?
                        <option value={proj.id} key={index}>{proj.name}</option>
                        :
                        ""
                      )
                    })}
                  </select>

                    }
                    <span className="text-danger col-sm-12">{this.state.projError}</span>
                </div>
                <div className="col-sm-2 text-left">
                  
                  <label className="font-weight-bold">Task Type:</label>
                <select value={this.state.type_id} onChange={(e)=>this.handleType(e)} className="form-control">
                    <option value="select">Select Type</option>
                  {this.state.types.length > 0 &&
                  this.state.types.map((type,index) => {
                    return (
                     
                        <option value={type.id} key={index}>{type.type_name}</option>
                        
                      
                    )
                    
                  }
                  )
                  }
                  
                
                </select>

                
              </div>
                <div className="col-sm-3 text-left">
                  <label className="font-weight-bold">Task Description:</label>
                  <input  
                    type="text"
                    name="desc" className="form-control mb-0" value={this.state.fdesc}
                    placeholder="Task Desc"
                    onChange={e => this.newTaskDesc(e)}
                    autoComplete="off"
                  />
                  <span className="text-danger col-sm-12">{this.state.descError}</span>
                </div>
                <div className="col-sm-1">
                  <button
                    className="btn btn-primary btn-sm btn-add"
                    disabled={this.state.saveTaskButton !== true}
                    onClick={(e) => this.saveTask(e)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="container">
             {
               this.state.addRows == ""
               ?
                 <h1 className="pt-5">You Still Not Have Added Any Tasks....</h1>
                   :
             
              
            <table className="table table-bordered mt-5">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Desc</th>
                  <th>Status</th>
                  <th>Assigned By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              
                {this.state.addRows.map((item, index) => {
                  return (
                    <tr>
                      <td width="140">{
                            
                            item.created_at.slice(0,10)

                          }
                          
                      </td>
                      <td>{
                            // this.state.editedERow === true && this.state.selectedRow === index
                            // ?
                            // <select className="form-control" value={this.state.projId} onChange={(e) => this.handleTableProject(e)} disabled>
                                
                            //     {
                                  
                            //     this.state.projects.map((val,index) =>{
                            //         return(
                            //             <option value={val.id}>{val.name}</option>
                            //         )
                            //     })
                            // }
                            // </select>
                            // :
                            item.project_name

                          }
                          
                      </td>
                      <td>
                      <div className="">
                          { 
                          // this.state.editedERow === true  && this.state.selectedRow === index
                          // ?
                          // <input  className="form-control" type="text" value={this.state.desc}  disabled/>
                          
                          // :
                          
                            item.description
                          
                          
                }
                          
                          </div>
                          
                      </td>
                      
                      <td>{
                          
                          this.state.editedERow === true && this.state.selectedRow === index
                          ?
                          <select className="form-control" value={this.state.statusId} onChange={ (e) => this.handleStatus(e)}>
                            <option>Select Status</option>
                            {
                              this.state.status.map((sts,index)=>{
                                  return (
                                    <option value={sts.id}>{sts.name}</option>
                                  )
                              })
                            }
                          </select>
                          :
                          item.statusName || "Open"
                          }
                            
                      </td>
                      <td>
                          {
                              username
                          }
                      </td>
                      <td>{
                            this.state.editedERow === true && this.state.selectedRow === index
                            ?
                            <div>
                            <button className="btn btn-primary" disabled={this.state.editTaskButton !== true} onClick={(e)=>this.statusSave(e, item, index)}><i className="fa fa-save" ></i></button>
                            <button className="btn btn-danger" onClick={(e)=>this.handleCancel(e)}><i className="fa fa-times"></i></button>
                            </div>
                            :
                            <div>
                            <button className="btn btn-success" onClick={(e)=>this.handleEdit(e,index,item)}><i className="fa fa-edit"></i></button>
                            <button className="btn btn-danger" onClick={(e)=>this.handleDelete(e,index,item)}><i className="fa fa-trash"></i></button>
                            </div>
                          }
                          
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
  }
  
            {/* <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000}
                    visible = {this.state.display}
                  /> */}
            </div>
          </TabPanel>
          <TabPanel>
                <DisplayAssignedTasks />
          </TabPanel>
          
        </Tabs>
      </div>
      :
      this.props.history.push('/login')
        }
      </div>
      
    );
  }
}

export default AssignedTasks;
