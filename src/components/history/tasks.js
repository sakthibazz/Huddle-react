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

    display: false,

    disabled: false,
    proj_id: "",
    user_id: "",
    projId:"",
    status:[],
    statusName:"",
    statusId: ''
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

      axios.get(`${API_URL}/api/conStatus`, {
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

    const Details ={
      user_id: localStorage.getItem("userid")
    }
    axios
    
    .post(`${API_URL}/api/allNewTasks`, Details ,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(res =>{
      console.log(res);
      const {success} = res.data;
      this.setState({
        addRows:success
      })
    });

    
  }

  newTaskDesc = (e, index) => {
    const { value } = e.target;
    const { desc } = this.state;
    this.setState({
      desc: value
    });
    console.log(desc);
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

  saveTask = () => {
    let { addRows, proj_id, desc, projects } = this.state;
    const taskDetails = [
      {
        description: desc,
        user_id: localStorage.getItem("userid"),
        project_department_id: proj_id
      }
    ];
    axios
      .post(`${API_URL}/api/createNewTask`, taskDetails, {
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
        addRows.push(success[0]);
        this.setState({
          addRows,
          
          
        });
      });
  };

  handleStatus = e => {
    const { value } = e.target
    this.setState({
      statusId: value
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
          projId:item.project_department_id
      })
  }

  statusSave = (e, row, idx) =>{
    console.log("savestatus")
    const {projId, statusId, addRows} = this.state
    const taskStatus = 
      {
        status_id:statusId,
        task_id:row.id,
        user_id: localStorage.getItem("userid")
      }
  
    axios
    .post(`${API_URL}/api/statusUpdate` , taskStatus ,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(res =>{
      console.log(res);
      const {success} = res.data
      addRows[idx]['statusName'] = success[0].status_name
      // addRows[index][''] = success[0].task_id
      this.setState({
        editedERow:false,
        addRows
    })
      
    })
    
  }

  handleCancel = (e) =>{
    this.setState({
      editedERow:false
    })
  }

  render() {
    return (
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
                <div className="col-sm-4 text-left">
                  <label className="font-weight-bold">Select Project: </label>
                  <select value={this.state.proj_id} onChange={e => this.handleProject(e)} className="form-control">
                  <option value="select">Select Project</option>
                    {this.state.projects.map(proj => {
                      return <option value={proj.id} >{proj.name}</option>
                    })}
                  </select>
                </div>
                <div className="col-sm-7 text-left">
                  <label className="font-weight-bold">Task Description:</label>
                  <input  
                    type="text"
                    name="desc" className="form-control"
                    placeholder="Task Desc"
                    onChange={e => this.newTaskDesc(e)}
                  />
                </div>
                <div className="col-sm-1">
                  <button
                    className="btn btn-primary btn-sm btn-add"
                    onClick={e => this.saveTask(e)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="container">
            <table className="table table-bordered mt-5">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Desc</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                
                {this.state.addRows.map((item, index) => {
                  return (
                    <tr>
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
                      <td>{
                            this.state.editedERow === true && this.state.selectedRow === index
                            ?
                            <div>
                            <button className="btn btn-primary" onClick={(e)=>this.statusSave(e, item, index)}><i className="fa fa-save" ></i></button>
                            <button className="btn btn-danger" onClick={(e)=>this.handleCancel(e)}><i className="fa fa-times"></i></button>
                            </div>
                            :
                            <button className="btn btn-success" onClick={(e)=>this.handleEdit(e,index,item)}><i className="fa fa-edit"></i></button>
                          }
                          
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
    );
  }
}

export default Tasks;
