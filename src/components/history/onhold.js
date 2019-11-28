import React,{Component  } from 'react'
import axios from 'axios'
import { API_URL } from "../../utils/const";

class OnHoldTasks extends Component{
    state={
      proj_id: "",
      user_id: "",
      projId:"",
      status:[],
      statusName:"",
      statusId: '',
      editTaskButton : false,
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

        axios.get(`${API_URL}/api/onHoldStatus`, {
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
    }

    statusSave = (e, row, idx) =>{
      console.log("savestatus")
      const {projId, statusId, addRows,onhold} = this.state
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
        const {onhold} = this.state;
        const {success} = res.data
        onhold[idx]['statusName'] = success[0].status_name
        // addRows[index][''] = success[0].task_id
        this.setState({
          editedERow:false,
          onhold
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
                <table className="table table-bordered mt-5">
                    <thead>
                    <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
                    </thead>
                    <tbody>
              
             {
               this.state.onhold.map((item,index)=>{
                 return(
                   <tr key={index}>
                     <td width="140">{item.updated_at.slice(0,10)}</td>
                     <td>{item.project_name}</td>
                     <td>{item.description}</td>
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
                        item.statusName || "On Hold"
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
             </tbody>
            </table>
            </div>
        )
    }
}

export default OnHoldTasks