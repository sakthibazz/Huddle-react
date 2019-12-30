import React,{Component  } from 'react'
import axios from 'axios'
import { API_URL } from "../../utils/const";
import Loader from 'react-loader-spinner';

class ContinuedTasks extends Component{
    state={
        user_id: "",
        contTasks:[],
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
    statusId: '',
    editTaskButton : false
    }

    componentDidMount(){
      const Pdetails ={
        user_id: localStorage.getItem("userid")
      }
        axios
      .post(`${API_URL}/api/projectsDepartments`, Pdetails , {
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


        const Details = 
        {
          user_id: localStorage.getItem("userid")
        }
        axios.post(`${API_URL}/api/continuedTasks` , Details ,{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
        .then(res=>{
            console.log(res);
            const {success} = res.data
            this.setState({
              contTasks:success,
              display: false
            })
        })
    }

    
  statusSave = (e, row, idx) =>{
    console.log("savestatus")
    const {projId, statusId, addRows,contTasks} = this.state
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
      contTasks[idx]['statusName'] = success[0].status_name
      // addRows[index][''] = success[0].task_id
      this.setState({
        editedERow:false,
        contTasks
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
      statusId: value,
      editTaskButton : true,
    })
  }
    render(){
        return(
            <div>
              <div>
              
              </div>
              <div className="container">
                {
                   this.state.contTasks == ""
                   ?
                 <h1 className="pt-5">No Data Available</h1>
                   :
                
                <table className="table table-bordered mt-5">
                  <thead>{!this.state.display &&
                              <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                    }
                  </thead>
                  <tbody>
              
             {
               this.state.contTasks.map((item,index)=>{
                 return(
                    <tr key={index}>
                      <td width="140">{
                            
                            item.updated_at.slice(0,10)

                          }
                          
                      </td>
                    <td>{
                          // this.state.editedERow === true && this.state.selectedRow === index
                          // ?
                          // <select value={this.state.projId} onChange={(e) => this.handleTableProject(e)} disabled>
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
                        { 
                        // this.state.editedERow === true  && this.state.selectedRow === index
                        // ?
                        // <input type="text" value={this.state.desc}  disabled/>
                        // :
                        item.description
              }
                        
                      
                        
                    </td>
                    <td>{
                        
                        this.state.editedERow === true && this.state.selectedRow === index
                        ?
                        <select value={this.state.statusId} onChange={ (e) => this.handleStatus(e)} className="form-control">
                           <option>Select status</option>
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
                        item.statusName || "Continued"
                        }
                          
                    </td>
                    <td>{
                          this.state.editedERow === true && this.state.selectedRow === index
                          ?
                          <div>
                          <button className="btn btn-primary" disabled={this.state.editTaskButton !== true}  onClick={(e)=>this.statusSave(e, item, index)}><i className="fa fa-save" ></i></button>
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
             </tbody>
            </table>
            
            }
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

export default ContinuedTasks