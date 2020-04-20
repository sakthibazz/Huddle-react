import React,{Component} from 'react'
import Menuone from "../menu/menu-1";
import axios from 'axios'
import { API_URL } from "../../utils/const";
import swal from 'sweetalert';

class Status extends Component{
    state = {
        status:[],
        editedERow:false,
        selectedRow:-1,
        sts:"",
        addstatus:false,
        sname:"",
        statusValue:0,
        add: {
            description: '',
            color:''
        },
        stsError:"",
        stsErrors:""

    }

    componentDidMount(){
        axios.get(`${API_URL}/api/allStatus`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(res=>{
            console.log(res);
            const {success} = res.data;
            this.setState({
              status:success,
              
            })
          });
    }

    handleName= (e,index) =>{
        let {status,sname} = this.state
        sname = status[index].name
        this.setState({
            status
        })
    }

    handleStatusChange = (e,item,index) =>{
        let {status,statusValue} = this.state
       statusValue = statusValue === 0 ? 1 : 0
    //    status[index].is_active = status[index].is_active === 0 ? 1 : 0
        this.setState({
            status,
            statusValue
        })
    }

   


  handleEditStatus = (e,index,item) =>{
      console.log(item)
    let {sname,status, statusValue} = this.state
    let {color} = this.state.add
    sname=item.name
    statusValue = item.is_active
    color=item.color
    this.setState({
        editedERow:true,
        selectedRow:index,
        sname,
        statusValue,
        color
    })
  
}

handleAddStatus = (e) =>{
    
    this.setState({
        addstatus:true,
        
    })
}

handleAsts = (e) =>{
    const {value}=e.target
    const {add} = this.state
    add.description = value
    this.setState({
        add,
        stsErrors:""
    })
} 

handleColor = (e,) =>{
    const {value} =e.target
    const {add} =this.state
    add.color=value
    this.setState({
        add
    })
    console.log(add)
}

handleAddStatusChange = e => {
    const { value } = e.target;
    const { add } = this.state
    add.status = value === "on" ? 1 : 0;
    this.setState({
        add
    })
}


savedata = (e,index,item) =>{
     const {add,status} = this.state;
     const x = status.find((val)=>{
         return val.name.toLowerCase() == this.state.add.description.toLowerCase();
         
     })
     if(this.state.add.description === ""){
        this.setState({
            stsError:"Please Enter Status Name"
        })
     }

     if (x){
        this.setState({
            stsErrors:"Status Already Exists"
        })
     }
     
     
     
    axios.post(`${API_URL}/api/newstatus`, {name: add.description,
    color:add.color} ,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
    })
    
    .then(res =>{
        console.log(res);
       
        const {success} = res.data
        
        status.push(success);
        swal( "Status Added Successfully",{
            icon: "successa",
            button: "OK",
          });
        this.setState({
            addstatus:false,
            status,
            add:{}
        })
        
    })
   
}

canceldata = (e) =>{
    this.setState({
        addstatus:false
    })
}

cancelEdata = (e,index) =>{
    // const {status,statusValue} = this.state
    // status[index].is_active=statusValue
    this.setState({
        editedERow:false,
        // status
    })
}

handleEditSave = (e,index) =>{
    const {status, statusValue,add} = this.state
    const data = {
        status_id:status[index].id,
        status:statusValue,
        color:add.color
    }
    axios
    .post(`${API_URL}/api/taskStatusUpdate` , data ,{
        headers :{
            Authorization : "Bearer " + localStorage.getItem('token')
        }
    })
    .then(res =>{
        console.log(res)
        status[index].is_active = statusValue
        this.setState({
            editedERow:false,
            status
        })
    })
    
}


    render()
    {
        return(
            <div>
                <div>
                    <Menuone />
                    <div className="container pt-5">
                    <button className="mt-4 btn btn-primary" onClick = {(e) => this.handleAddStatus(e)}>Add status</button>
                        <h6 className="text-danger mt-3">{this.state.stsErrors}</h6>
                        <table className="mt-2 table table-bordered">
                            <thead>
                                <tr>
                                    <th>Status Name</th>
                                    <th>Color Code</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.addstatus && 
                                <tr>
                                    <td>
                                       <div>
                                       <input type="text"  className="form-control mb-0" value={this.state.add.description} onChange={(e) => this.handleAsts(e)} />
                                       <span className="text-danger">{this.state.stsError}</span>
                                       </div>
                                    </td>
                                    <td>
                                        <input type="color" className="form-control" value={this.state.add.color} onChange={(e)=>this.handleColor(e)}  />
                                    </td>
                                    <td>
                                    <button className="btn btn-danger btn-small" disabled>InActive</button>     
                                        {/* <input type="checkbox" checked={this.state.s} data-toggle="toggle" onChange={(e)=> this.handleAddStatusChange(e)} /> */}
                                    </td>
                                    
                                    
                                    <td>
                                    <div>
                          <button className="btn btn-primary"  onClick={(e) => this.savedata(e)}><i className="fa fa-save" ></i></button>
                          <button className="btn btn-danger" onClick={(e) => this.canceldata(e)}><i className="fa fa-times"></i></button>
                          </div>
                                    </td>
                                </tr>
                            }
                                    
                                    {
                            this.state.status.map((item,index)=>{
                                return (
                                    <tr>
                                    <td >
                                        {item.name}
                                    {/* { 
                                        this.state.editedERow === true  && this.state.selectedRow === index
                                    ?
                                        <input type="text" className="form-control" value={this.state.sname} onChange={(e) => this.handleName(e,index)}  />
                                    :
                                        item.name
              } */}
                 
                                    </td>
                                    <td>
                                        {
                                            this.state.editedERow === true && this.state.selectedRow === index
                                            ?
                                            <input type="color" className="form-control" value={this.state.add.color} onChange={(e)=>this.handleColor(e)}  />
                                            :
                                            item.color
                                        }
                                    </td>
                                    <td>
                                    {
                                                    this.state.editedERow === true && this.state.selectedRow === index
                                                    ?
                                                    <input type="checkbox"   checked={this.state.statusValue === 1} data-toggle="toggle" onChange={(e)=> this.handleStatusChange(e,item,index)} />
                                                    :
                                                        
                                                    item.is_active === 1
                                                            ?

                                                    <button className="btn btn-success btn-small" >Active</button>
                                                    :
                                                    <button className="btn btn-danger btn-small" disabled>InActive</button>   
                                                        

                                               }
                                    </td>
                                    <td>
                                    {
                          this.state.editedERow === true && this.state.selectedRow === index
                          ?
                          <div>
                          <button className="btn btn-primary" onClick={(e)=>this.handleEditSave(e,index)}><i className="fa fa-save" ></i></button>
                          <button className="btn btn-danger" onClick={(e)=>this.cancelEdata(e,index)}><i className="fa fa-times"></i></button>
                          </div>
                          :
                          <button className="btn btn-success" onClick={(e)=>this.handleEditStatus(e,index,item)}><i className="fa fa-edit"></i></button>
                        }
                                    </td>
                                    </tr>
                                )
                            })
                          }
                                    {/* </td> */}
                                    
                                {/* </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Status