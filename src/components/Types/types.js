import React,{Component} from 'react'
import Menuone from "../menu/menu-1";
import axios from 'axios'
import { API_URL } from "../../utils/const";
import swal from 'sweetalert';

class Types extends Component{
    state = {
        Types:[],
        editedERow:false,
        selectedRow:-1,
        typ:"",
        addTypes:false,
        tname:"",
        typeValue:0,
        add: {
            description: ''
        }

    }

    componentDidMount(){
        axios.get(`${API_URL}/api/TaskTypes`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(res=>{
            console.log(res);
            const {success} = res.data;
            this.setState({
              Types:success,
              
            })
          });
    }

    handleName= (e,index) =>{
        let {Types,tname} = this.state
        tname = Types[index].name
        this.setState({
            Types
        })
    }

    handleTypeChange = (e,item,index) =>{
        let {Types,typeValue} = this.state
       typeValue = typeValue === 0 ? 1 : 0
    //    Types[index].is_active = Types[index].is_active === 0 ? 1 : 0
        this.setState({
            Types,
            typeValue
        })
    }

   


  handleEditType = (e,index,item) =>{
    let {tname,Types, typeValue} = this.state
    tname=item.name
    typeValue = item.is_active
    this.setState({
        editedERow:true,
        selectedRow:index,
        tname,
        typeValue
    })
  
}

handleAddStatus = (e) =>{
    
    this.setState({
        addTypes:true,
        
    })
}

handleAsts = (e) =>{
    const {value}=e.target
    const {add} = this.state
    add.description = value
    this.setState({
        add
    })
} 

handleColor = (e) =>{
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
    add.Types = value === "on" ? 1 : 0;
    this.setState({
        add
    })
}


savedata = (e,index,item) =>{
     const {add,Types} = this.state;
     const x = Types.find((val)=>{
         return val.type_name.toLowerCase() == this.state.add.description.toLowerCase();
         
     })
     if (x){
        swal( "Types Already Exists",{
            icon: "warning",
            button: "OK",
          });
         return
     }

     
     
    axios.post(`${API_URL}/api/newTaskTypes`, {type_name: add.description} ,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
    })
    
    .then(res =>{
        console.log(res);
       
        const {success} = res.data
        
        Types.push(success);
        swal( "Types Added Successfully",{
            icon: "successa",
            button: "OK",
          });
        this.setState({
            addTypes:false,
            Types,
            add:{}
        })
        
    })
   
}

canceldata = (e) =>{
    this.setState({
        addTypes:false
    })
}

cancelEdata = (e,index) =>{
    // const {Types,typeValue} = this.state
    // Types[index].is_active=typeValue
    this.setState({
        editedERow:false,
        // Types
    })
}

handleEditSave = (e,index) =>{
    const {Types, typeValue,add} = this.state
    const data = {
        task_type_id:Types[index].id,
        status:typeValue
    }
    axios
    .post(`${API_URL}/api/TaskTypesUpdate` , data ,{
        headers :{
            Authorization : "Bearer " + localStorage.getItem('token')
        }
    })
    .then(res =>{
        console.log(res)
        Types[index].is_active = typeValue
        this.setState({
            editedERow:false,
            Types
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
                    <button className="mt-4 btn btn-primary" onClick = {(e) => this.handleAddStatus(e)}>Add Types</button>
                        <table className="mt-2 table table-bordered">
                            <thead>
                                <tr>
                                    <th>Type Name</th>
                                    <th>Types</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.addTypes && 
                                <tr>
                                    <td>
                                        <input type="text"  className="form-control" value={this.state.add.description} onChange={(e) => this.handleAsts(e)} />
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
                            this.state.Types.map((item,index)=>{
                                return (
                                    <tr>
                                    <td >
                                        {item.type_name}
                                    {/* { 
                                        this.state.editedERow === true  && this.state.selectedRow === index
                                    ?
                                        <input type="text" className="form-control" value={this.state.tname} onChange={(e) => this.handleName(e,index)}  />
                                    :
                                        item.name
              } */}
                 
                                    </td>
                                    
                                    <td>
                                    {
                                                    this.state.editedERow === true && this.state.selectedRow === index
                                                    ?
                                                    <input type="checkbox"   checked={this.state.typeValue === 1} data-toggle="toggle" onChange={(e)=> this.handleTypeChange(e,item,index)} />
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
                          <button className="btn btn-success" onClick={(e)=>this.handleEditType(e,index,item)}><i className="fa fa-edit"></i></button>
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

export default Types