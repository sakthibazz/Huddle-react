import React,{Component} from 'react'
import Menuone from "../menu/menu-1";
import axios from 'axios'
import { API_URL } from "../../utils/const";

class Status extends Component{
    state = {
        status:[],
        editedERow:false,
        selectedRow:-1,
        sts:"",
        addstatus:false

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
              status:success
            })
          });
    }

    
  handleEditStatus = (e,index,item) =>{
       const {sts} = this.state

    this.setState({
        editedERow:true,
        selectedRow:index,
        sts:item.name
    })
}

handleAddStatus = (e) =>{
    this.setState({
        addstatus:true
    })
}

handleAsts = (e) =>{
    const {value}=e.target
    this.setState({
        sts:value
    })
}

savedata = (e) =>{
    const {sts} = this.state
    this.setState({
        addstatus:false,
        sts
    })
}

canceldata = (e) =>{
    this.setState({
        addstatus:false
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
                        <table className="mt-2 table table-bordered">
                            <thead>
                                <tr>
                                    <th>Status Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.addstatus && 
                                <tr>
                                    <td>
                                        <input type="text"  value={this.state.name} onChange={(e) => this.handleAsts(e)} />
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
                                    <td>
                                    { 
                                        this.state.editedERow === true  && this.state.selectedRow === index
                                    ?
                                        <input type="text" value={this.state.aname} onChange={(e) => this.handleName(e)}  />
                                    :
                                        item.name
              }
                 
                                    </td>
                                    <td>
                                    {
                          this.state.editedERow === true && this.state.selectedRow === index
                          ?
                          <div>
                          <button className="btn btn-primary" ><i className="fa fa-save" ></i></button>
                          <button className="btn btn-danger" ><i className="fa fa-times"></i></button>
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