import React,{Component  } from 'react'
import axios from 'axios'
import { API_URL } from "../../utils/const";
import Loader from 'react-loader-spinner';
import { pendingColumns } from './columns/column1';
import Table from './columns/table1'

class PendingTasks extends Component{
    state={
        user_id: "",
        selectedRow: -1,
    selectedOption: null,
    date: new Date(),
    projects: [],
    desc: "",
    editedERow:false,
    pendTasks:[],

    display: true,

    disabled: false,
    proj_id: "",
    user_id: "",
    projId:"",
    status:[],
    statusName:"",
    statusId: '',
    editTaskButton : false,
    hours:"",
    comments:"",
    hourError:""
    }

    componentDidMount(){
      const Pdetails ={
        user_id: localStorage.getItem("userid")
      }
        axios
      .post(`${API_URL}/api/projectsDepartments`,Pdetails,{
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

      axios.get(`${API_URL}/api/status`,{
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


        const Details = 
        {
          user_id: localStorage.getItem("userid")
        }
        axios.post(`${API_URL}/api/pendingTasks` , Details,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        } 
      })
        .then(res=>{
            console.log(res);
            const {success} = res.data
            this.setState({
              pendTasks:success,
              display : false
            })
        })
    }

  
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
        hours:value
      })
    }

  statusSave = (e, row, idx) =>{
    console.log("savestatus")
    const {projId, statusId, addRows,pendTasks,hours,comments} = this.state
    const taskStatus = 
      {
        status_id:statusId,
        task_id:row.task_id,
        user_id: localStorage.getItem("userid"),
        no_of_hours:hours,
        comments:comments
      }
  
    axios
    .post(`${API_URL}/api/statusUpdate` , taskStatus,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    } )
    .then(res =>{
      console.log(res);
      const {pendTasks} = this.state;
      const {success} = res.data
      pendTasks[idx]['statusName'] = success[0].status_name
      pendTasks[idx]['hours'] = success[0].no_of_hours
      pendTasks[idx]['comments'] = success[0].comments
      // addRows[index][''] = success[0].task_id
      this.setState({
        editedERow:false,
        pendTasks,
        hours,
        comments
    })
      
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
        hours:item.no_of_hours,
        comments:item.comments
    })
}

  
  handleTableProject = (e, index) => {
    const { value } = e.target;
    const { projId } = this.state;
    this.setState({
      projId: value
    });
  };

  handleCancel = (e) =>{
    this.setState({
      editedERow:false
    })
  }

  handleStatus = e => {
    const { value } = e.target
    this.setState({
      statusId: value,
      editTaskButton : true,
    })
  }

  handleComment= (e) =>{
    const {value} =e.target
    this.setState({
      comments:value
    })
  }
    render(){
        return(
            <div>
              <div>
             
              </div>
              <div className="container">
                
              
              {
               this.state.pendTasks == ""
               &&
                 !this.state.display ? <h1 className="pt-5">No Data Available</h1>
                   :
                   !this.state.display &&
                <table className="table table-bordered mt-5">
                <thead>{
                !this.state.display &&
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>No of hours</th>
                    <th>Comments</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
              }
                  </thead>
             {
               this.state.pendTasks.map((item,index)=>{
                 return(
                    <tr key={index}>
                    <td width="140">{
                          
                          item.updated_at.slice(0,10)

                        }
                        
                    </td>
                    <td>
                      {/* {
                          this.state.editedERow === true && this.state.selectedRow === index
                          ?
                          <select value={this.state.projId} onChange={(e) => this.handleTableProject(e)} disabled>
                              {
                              this.state.projects.map((val,index) =>{
                                  return(
                                      <option value={val.id}>{val.name}</option>
                                  )
                              })
                          }
                          </select>
                          : */}
                          {item.project_name}

                        {/* // } */}
                        
                    </td>
                    <td>
                        {/* { this.state.editedERow === true  && this.state.selectedRow === index
                        ?
                        <input type="text" value={this.state.desc}  disabled/>
                        : */}
                        {item.description}
              {/* } */}
                        
                      
                        
                    </td>
                    <td>
                      {
                        this.state.editedERow === true && this.state.selectedRow === index
                        ?
                        <div>
                          <input type="text" value={this.state.hours} onChange={(e)=>this.handleHours(e)} onKeyPress={e => this.handleHours(e)} />
                        <div className="text-danger col-sm-12">{this.state.hourError}</div>
                        </div>
                        :
                         item.hours || item.no_of_hours
                      }
                    </td>
                    <td>
                        {
                           this.state.editedERow === true && this.state.selectedRow === index
                           ?
                         <input type="text" value={this.state.comments} onChange={(e)=>this.handleComment(e)}/>
                         :
                         item.comments || item.comments
                        }
                      </td>
                    <td>{
                        
                        this.state.editedERow === true && this.state.selectedRow === index
                        ?
                        <select value={this.state.statusId} onChange={ (e) => this.handleStatus(e)} className="form-control">
                           <option value={null}>Select Status</option>
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
                        <button className="btn" style={{backgroundColor:item.status_color,color:"#fff",width:"100%"}}>{ item.statusName || "Pending"}
                        </button>
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
                          <button className="btn btn-success" onClick={(e)=>this.handleEdit(e,index,item)}><i className="fa fa-edit"></i></button>
                        }
                        
                    </td>
                  </tr>
                   
                 )
               })
             }
            </table>
            
            
    }
     {/* <Table 
             data={this.state.pendTasks}
             columns={[
              {
                  Header: 'Task Created',  
                  accessor: 'created_at' 
              },
              {
                  Header: 'Name',  
                  accessor: 'project_name' 
              },
              {
                  Header:'Description',
                  accessor: 'description'
              },
              {
                  Header:'Status',
                  accessor: (e,index,item) => (
                    
                        
                      this.state.editedERow === true && this.state.selectedRow === index
                      ?
                      <select value={this.state.statusId} onChange={ (e) => this.handleStatus(e)} className="form-control">
                         <option value={null}>Select Status</option>
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
                      item.statusName || "Pending"
                      
                  )
              },
              {
                  Header:'Action',
                  accessor: (item,index) => (
                    
                      this.state.editedERow === true && this.state.selectedRow === index
                      ?
                      <div>
                      <button className="btn btn-primary" disabled={this.state.editTaskButton !== true} onClick={(e)=>this.statusSave(e, item, index)}><i className="fa fa-save" ></i></button>
                      <button className="btn btn-danger" onClick={(e)=>this.handleCancel(e)}><i className="fa fa-times"></i></button>
                      </div>
                      :
                      <button className="btn btn-success" onClick={(e)=>this.handleEdit(e,index,item)}><i className="fa fa-edit"></i></button>
                    
                  )
              }
              
          ]}
             
             /> */}
        
    </div>  
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

export default PendingTasks