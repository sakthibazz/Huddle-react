import React,{Component  } from 'react'
import axios from 'axios'
import { API_URL } from "../../utils/const";

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

    display: false,

    disabled: false,
    proj_id: "",
    user_id: "",
    projId:"",
    status:[],
    statusName:"",
    statusId: ''
    }

    componentDidMount(){
      const Pdetails ={
        user_id: localStorage.getItem("userid")
      }
        axios
      .post(`${API_URL}/api/projectsDepartments`, Pdetails, {
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

      axios.get(`${API_URL}/api/status`, {
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
        axios.post(`${API_URL}/api/pendingTasks` , Details ,{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
        .then(res=>{
            console.log(res);
            const {success} = res.data
            this.setState({
              pendTasks:success
            })
        })
    }

    
  statusSave = (e, row, idx) =>{
    console.log("savestatus")
    const {projId, statusId, addRows,pendTasks} = this.state
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
      const {pendTasks} = this.state;
      const {success} = res.data
      pendTasks[idx]['statusName'] = success[0].status_name
      // addRows[index][''] = success[0].task_id
      this.setState({
        editedERow:false,
        pendTasks
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
        projId:item.project_department_id
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
      statusId: value
    })
  }
    render(){
        return(
            <div>
                <table className="table table-bordered mt-5">
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
             {
               this.state.pendTasks.map((item,index)=>{
                 return(
                    <tr>
                    <td>{
                          
                          item.updated_at.slice(0,10)

                        }
                        
                    </td>
                    <td>{
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
                          :
                          item.project_name

                        }
                        
                    </td>
                    <td>
                        { this.state.editedERow === true  && this.state.selectedRow === index
                        ?
                        <input type="text" value={this.state.desc}  disabled/>
                        :
                        item.description
              }
                        
                      
                        
                    </td>
                    <td>{
                        
                        this.state.editedERow === true && this.state.selectedRow === index
                        ?
                        <select value={this.state.statusId} onChange={ (e) => this.handleStatus(e)}>
                           <option value={null}>Select Status</option>
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
                   
                 )
               })
             }
            </table>
            </div>
        )
    }
}

export default PendingTasks