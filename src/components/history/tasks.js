import React, { Component } from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import { Menu } from "@material-ui/core"
import Menuone from "../menu/menu-1"
import axios from "axios"
import { API_URL } from "../../utils/const"
import CompletedTasks from "./dummy"
import ContinuedTasks from "./continued"
import PendingTasks from "./pending"
import OnHoldTasks from "./onhold"
import './tasks.css'
import swal from 'sweetalert'
import Loader from 'react-loader-spinner'

class Tasks extends Component {
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

    display: true,

    disabled: false,
    proj_id: "",
    user_id: "",
    projId:"",
    status:[],
    statusName:"",
    description:"",
    statusId: '',
    fdesc: '',
    saveTaskButton : false,
    editTaskButton : false,
    type_id:"",
    types:[],
    hours:"",
    comments:"",
    hourError:"",
    descError:"",
    projError:"",
    projDescError:""
  };

  componentDidMount() {
    const Pdetails ={
      user_id: localStorage.getItem("userid")
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
          projects: res.data.success
        });
        console.log(proj_id);
      })
      .catch(err => {
        console.log(err);
      });

      axios.get(`${API_URL}/api/conStatus`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
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
    })
    .then(res =>{
      console.log(res);
      const {success} = res.data;
      this.setState({
        addRows:success,
        display : false
      })
    });

    
  }

  newTaskDesc = (e, index) => {
    const { value } = e.target;
    const { desc } = this.state;
    this.setState({
      desc: value,
      fdesc:value,
      saveTaskButton : true,
      projDescError:""
    });
    console.log(desc);
  };
   
  handleHours = (e) =>{
    const {value} =e.target
    const num = String.fromCharCode(e.which);

        if(!(/[0-9]/.test(num))) {
            e.preventDefault();
            this.setState({
                hourError : 'Enter only numbers'
            })
        }
    this.setState({
      hours:value,
      hourError:""
    })
  }

  handleComment= (e) =>{
    const {value} =e.target
    this.setState({
      comments:value
    })
  }

  handleProject = (e, index) => {
    const { value } = e.target;
    const { proj_id } = this.state;
    this.setState({
      proj_id: value,
      projError:""
    });
    console.log(this.state.proj_id);
  };

  handleType = (e, index) => {
    const { value } = e.target;
    const { type_id } = this.state;
    this.setState({
      type_id: value
    });
    console.log(this.state.type_id);
  };


  handleTableProject = (e, index) => {
    const { value } = e.target;
    const { projId } = this.state;
    this.setState({
      projId: value
    });
  };

  saveTask = () => {
    let { addRows, proj_id, desc, projects,type_id,display } = this.state;
    if(this.state.proj_id === ""){
     this.setState({
      projError:"Please select Project"
     })
    }
    else if(this.state.desc === ""){
      this.setState({
        projDescError:"Please Enter Description"
      })
    }
    else if(this.state.desc.length<4){
      this.setState({
        projDescError:"Description should be minimum of 4 Characters"
      })
    }
    
   else{
    var x=new Date()
    const taskDetails = [
      {
        description: desc,
        user_id: localStorage.getItem("userid"),
        project_department_id: proj_id,
        task_type_id:type_id,
        // created_at:h +':'+x.getMinutes() 
       created_at:x.toLocaleTimeString()
      }
    ];
    axios
      .post(`${API_URL}/api/createNewTask`, taskDetails,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(res => {
        
        console.log("this si success save");
        console.log(res);
        const { success } = res.data;
        // addRows.push({
        //     addRows
        // })
        {!this.state.display && this.state.desc.length >=4 &&
          
        addRows.unshift(success[0])
        
        }
        this.setState({
          addRows,
          saveTaskButton: false,
          desc:'',
          fdesc:'',
          proj_id:"",
          type_id:""
          
        });
      });
  };
  }
  handleDesc = (e) =>{
    const {value} = e.target
    this.setState({
      desc:value,
      projDescError:""
    })
  }


  handleStatus = e => {
    const { value } = e.target
    this.setState({
      statusId: value,
      editTaskButton : true
      
    })
  }

  handleEdit = (e,index,item) =>{

    const {hours,comments} =this.state
      console.log("printing edit")
      console.log(index)
      console.log(item)
      this.setState({
          editedERow:true,
          selectedRow:index,
          desc:item.description,
          projId:item.project_department_id,
          fdesc:'',
          hours:item.hours,
          comments:item.comments
      })
  }

  statusSave = (e, row, idx) =>{
    console.log("savestatus")
    if(this.state.desc === ""){
     this.setState({
       descError:"Please Enter Description"
     })
    }
    
    const {projId, statusId, addRows,desc,hours,comments} = this.state
    const taskStatus = 
      {
        status_id:statusId,
        task_id:row.task_id,
        description:desc,
        no_of_hours:hours,
        comments:comments
        // user_id: localStorage.getItem("userid")
      }
  
    axios
    .post(`${API_URL}/api/TodayTaskUpdate` , taskStatus,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    } )
    .then(res =>{
      console.log(res);
      const {success} = res.data
      console.log(success);
    
      addRows[idx]['statusName'] = success[0].status_name
      addRows[idx]['description'] = success[0].description
      addRows[idx]['hours'] = this.state.hours
      addRows[idx]['comments']=this.state.comments
      // addRows[index][''] = success[0].task_id
      this.setState({
        editedERow:false,
        addRows,
        fdesc: '',
        desc,
        hours,
        comments
    })
      
    })

    .catch(err =>{
      const errors = err.response.data.error
      this.setState({
              hourError:errors.no_of_hours || this.state.hourError
              
              
      })
     
      console.log(err.response.data.error) ;            
  })
    
  }

  handleDelete = (e, row, idx) =>{
    console.log("deleting",e.target)
   alert("Do you want to delete")
   
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
      editedERow:false,
      descError:""
    })
  }

  render() {
    const username=localStorage.getItem("username")
    return (
      <div>
        {
            (localStorage.getItem('userid')) ?
            <div>
        <Menuone />
        <Tabs className="mt-5 pt-5">
          <TabList>
            <Tab>New Tasks</Tab>
            <Tab>Continued Tasks</Tab>
            <Tab>Pending Tasks</Tab>
            <Tab>On-Hold Tasks</Tab>
            
            <Tab>Completed Tasks</Tab>
          </TabList>
          <TabPanel>
            <div className="container">
            
              <div className="row mt-4">
                <div className="col-sm-3 text-left">
                  <label className="font-weight-bold">Select Project: </label>
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
                  <span className="text-danger col-sm-12">{this.state.projError}</span>
                </div>
                <div className="col-sm-3 text-left">
                  
                  <label className="font-weight-bold">Task Type:</label>
                <select value={this.state.type_id} onChange={(e)=>this.handleType(e)} className="form-control">
                    <option value="select">Select Type</option>
                  {this.state.types.length > 0 &&
                  this.state.types.map((type,index) => {
                    return (
                     type.is_active === 1
                     ?
                        <option value={type.id} key={index}>{type.type_name}</option>
                        :
                        ""
                        
                      
                    )
                    
                  }
                  )
                  }
                  
                
                </select>

                
              </div>
                <div className="col-sm-5 text-left">
                  <label className="font-weight-bold ">Task Description:</label>
                  <input  
                    type="text"
                    name="desc" className="form-control mb-0" value={this.state.fdesc}
                    placeholder="Task Desc"
                    onChange={e => this.newTaskDesc(e)}
                    autoComplete="off"
                    spellCheck="true"
                    min={3}
                  />
                  <span className="text-danger col-sm-12">{this.state.projDescError}</span>
                </div>
                <div className="col-sm-1">
                  <button
                    className="btn btn-primary btn-sm btn-add"
                    disabled={this.state.saveTaskButton !== true}
                    onClick={e => this.saveTask(e)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="container-fluid">
            <Loader
                 type="Circles"
                 color="#00BFFF"
                 height={100}
                 width={100}
                 // timeout={3000}
                 visible={this.state.display}
               />
             {
               this.state.addRows.length == 0 && !this.state.display
               ?
                 <h1 className="pt-5">You Still Not Have Added Any Tasks....</h1>
                   :
             <div>
                   {!this.state.display &&
            <table className="table table-bordered mt-5">
              <thead>
                {!this.state.display &&
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Task Type</th>
                  <th>Desc</th>
                  <th>Status</th>
                  <th>No of hours</th>
                  <th>Comment</th>
                  <th>Assigned By</th>
                  <th>Actions</th>
                </tr>
  }
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
                            
                            item.project_name

                          }
                          
                      </td>
                      <td>{item.type_name}</td>
                      <td>
                      <div className="">
                          { 
                          this.state.editedERow === true  && this.state.selectedRow === index
                          ?
                         <div>

<input className="form-control" type="text" value={this.state.desc} onChange={(e) => this.handleDesc(e)}  />
                          <div className="text-danger col-sm-12">{this.state.descError}</div>
                           </div>
                          :
                          
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
                                    sts.is_active === 1
                                    ?
                                    <option value={sts.id}>{sts.name}</option>
                                   :
                                   ""
                                    
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
                           this.state.editedERow === true && this.state.selectedRow === index
                           ?
                         <div>
                           <input type="text" value={this.state.hours} onChange={(e)=>this.handleHours(e)}  onKeyPress={e => this.handleHours(e)} />
                        
                                                <div className="text-danger col-sm-12">{this.state.hourError}</div>
                                            
                         </div>
                         :
                        item.hours  || "0 Hours"
                  
                        }
                      </td>
                      <td>
                        {
                           this.state.editedERow === true && this.state.selectedRow === index
                           ?
                         <input type="text" value={this.state.comments} onChange={(e)=>this.handleComment(e)}/>
                         :
                         item.comments || "-"
                        }
                      </td>
                      <td>
                        {
                         item.task_assigned_by || username
                        }
                      </td>
                      <td>{
                            this.state.editedERow === true && this.state.selectedRow === index
                            ?
                            <div>
                            <button className="btn btn-primary" disabled={this.state.editTaskButton !== true} onClick={(e)=>this.statusSave(e, item, index)}><i className="fa fa-save" ></i></button>
                            <button className="btn btn-danger ml-1" onClick={(e)=>this.handleCancel(e)}><i className="fa fa-times"></i></button>
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
        </div>
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
          <ContinuedTasks />
          </TabPanel>
          <TabPanel>
            <PendingTasks />
          </TabPanel>
          <TabPanel>
            <OnHoldTasks />
          </TabPanel>
          <TabPanel>
            <CompletedTasks />
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

export default Tasks;
