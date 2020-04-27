import React,{Component  } from 'react'
import axios from 'axios'
import { API_URL } from "../../utils/const";
import Loader from 'react-loader-spinner';

class OnHoldTasks extends Component{
    state={
      proj_id: "",
      user_id: "",
      projId:"",
      status:[],
      statusName:"",
      statusId: '',
      editTaskButton : false,
        onhold:[],
      display : true,
      hours:"",
      comments:"",
      hourError:""
    }

    componentDidMount(){
      const Details = 
      {
        user_id: localStorage.getItem("userid")
      }
        axios.post(`${API_URL}/api/onHold` , Details,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res=>{
            console.log(res);
            const {success} = res.data
            this.setState({
                onhold:success,
                display : false
            })
        })

        axios.get(`${API_URL}/api/onHoldStatus`,{
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
    
    handleComment= (e) =>{
      const {value} =e.target
      this.setState({
        comments:value
      })
    }

    statusSave = (e, row, idx) =>{
      console.log("savestatus")
      const {projId, statusId, addRows,hours,comments} = this.state
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
        const {onhold} = this.state;
        const {success} = res.data
        onhold[idx]['statusName'] = success[0].status_name
        onhold[idx]['hours'] = success[0].no_of_hours
        onhold[idx]['comments'] = success[0].comments
        // addRows[index][''] = success[0].task_id
        this.setState({
          editedERow:false,
          onhold,
          hours
      })
        
      })
      
    }

    handleEdit = (e,index,item) =>{
      const {hours} = this.state
    
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


    render(){
      // let x=this.state.status.map(item=>{
      //   return item.color
      // })
      // console.log(x,"Hello")
      console.log(this.state.status)
        return(
            <div>
              
              <div className="container">
              
                   <Loader
          type="Circles"
          color="#00BFFF"
          height={100}
          width={100}
          // timeout={3000}
          visible={this.state.display}
        />
              {
                   
            
                   this.state.onhold.length === 0 && !this.state.display
                   ?
                 <h1 className="pt-5">No Data Available</h1>
                   :
                   !this.state.display &&
                  <table className="table table-bordered mt-5">
                    <thead>{
                !this.state.display &&
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>No of Hours</th>
                      <th>Comments</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                    }
                    </thead>
                    <tbody>
              
             {
               this.state.onhold.map((item,index)=>{
                 return(
                   <tr key={index}>
                     <td width="140">{item.updated_at.slice(0,10)}</td>
                     <td>{item.project_name}</td>
                     <td>{item.description}</td>
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
                        <div>{
                            this.state.statusId == item.id
                            ?
                            <button className="btn" style={{backgroundColor:this.state.status.map((item,idx)=>item[idx].color)}}>{ item.statusName || "On Hold"}</button>
                         
                          :
                          
                           <button className="btn" style={{backgroundColor:item.status_color,color:"#fff",width:"100%"}}>{ item.statusName || "On Hold"}
                          </button>
                          
                        }
                          </div>
                       
                        
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
            
            
    }
            </div>
            
            </div>
        )
    }
}

export default OnHoldTasks