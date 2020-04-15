import React,{Component} from 'react'
import Menuone from "../menu/menu-1";
import axios from 'axios'
import { API_URL } from "../../utils/const";
import swal from 'sweetalert';

class projects extends Component{
    state = {
        projects:[],
        editedERow:false,
        selectedRow:-1,
        sts:"",
        addprojects:false,
        sname:"",
        statusValue:0,
        add: {
            description: ''
        },
        projNameError:""

    }

    componentDidMount(){
        axios.get(`${API_URL}/api/allProjectsDepartments`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(res=>{
            console.log(res);
            const {success} = res.data;
            this.setState({
                projects:success,
              
            })
          });
    }

    handleName= (e,index) =>{
        let {projects,sname} = this.state
        sname = projects[index].name
        this.setState({
            projects
        })
    }

    handleprojectsChange = (e,item,index) =>{
    //     let { value } = e.target
    //     let {statusValue} = this.state
    //    statusValue = value === "on" ? 1 : 0
    let {projects,statusValue} = this.state
    statusValue = statusValue === 0 ? 1 : 0
    //    projects[index].is_active = projects[index].is_active === 0 ? 1 : 0
        this.setState({
            statusValue,
            projects
        })
    }

   


  handleEditprojects = (e,index,item) =>{
    let {sname,projects, statusValue} = this.state
    sname=item.name
    statusValue = item.is_active
    // statusValue = statusValue === 0 ? 1 : 0
    this.setState({
        editedERow:true,
        selectedRow:index,
        statusValue
    })
  
}

handleAddprojects = (e) =>{
    
    this.setState({
        addprojects:true
    })
}

handleAprojects = (e) =>{
    const {value}=e.target
    const {add} = this.state
    add.description = value
    this.setState({
        add
    })
}

handleAddprojectsChange = e => {
    const { value } = e.target;
    const { add } = this.state
    add.projects = value === "on" ? 1 : 0;
    this.setState({
        add
    })
}


saveProjectdata = (e) =>{
     const {add,projects,statusValue} = this.state

    //  statusValue = statusValue === 0 ? 1 : 0
     const x = projects.find((val)=>{
        return val.name.toLowerCase() == this.state.add.description.toLowerCase().trim();
       
        
    })
    if (x){
       swal( "Project Already Exists",{
           icon: "warning",
           button: "OK",
         });
        return
    }
    axios.post(`${API_URL}/api/newProjectsDepartments`, {name: add.description} ,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
    })
    .then(res =>{
        console.log(res);
        const {success} = res.data
        projects.push(success)
        swal( "Project Added Successfully",{
            icon: "success",
            button: "OK",
          });
        this.setState({
            addprojects:false,
            projects,
            statusValue,
            
            add:""
        })
        
    })
    .catch(err =>{
        const errors = err.response.data.error
        this.setState({
                projNameError:errors.name
                
        })
       
        console.log(err.response.data.error) ;            
    })
   
}

canceldata = (e) =>{
    this.setState({
        addprojects:false
    })
}

cancelEdata = (e,index) =>{
    // const {projects,statusValue} = this.state
    // projects[index].is_active=statusValue
    this.setState({
        editedERow:false,
        // projects
    })
}

handleEditSave = (e,index) =>{
    e.preventDefault();
    const {projects, statusValue,add} = this.state
    // projects[index].is_active = statusValue
    const data = {
        project_id:projects[index].id,
        status:statusValue
    }
    axios
    .post(`${API_URL}/api/projectUpdate` , data ,{
        headers :{
            Authorization : "Bearer " + localStorage.getItem('token')
        }
    })
    .then(res =>{
        console.log(res)
        projects[index].is_active = statusValue
        this.setState({
            editedERow:false,
            projects
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
                    <button className="mt-4 btn btn-primary" onClick = {(e) => this.handleAddprojects(e)}>Add Project</button>
                        <table className="mt-2 table table-bordered">
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>projects</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.addprojects && 
                                <tr>
                                    <td>
                                        <input type="text"  className="form-control mb-0" value={this.state.add.description} onChange={(e) => this.handleAprojects(e)} />
                                        <span className="text-danger col-sm-8">{this.state.projNameError}</span>
                                    </td>
                                    <td>
                                    <button className="btn btn-danger btn-small" disabled>InActive</button>     
                                        {/* <input type="checkbox" checked={this.state.s} data-toggle="toggle" onChange={(e)=> this.handleAddprojectsChange(e)} /> */}
                                    </td>
                                    
                                    
                                    <td>
                                    <div>
                          <button className="btn btn-primary"  onClick={(e) => this.saveProjectdata(e)}><i className="fa fa-save" ></i></button>
                          <button className="btn btn-danger" onClick={(e) => this.canceldata(e)}><i className="fa fa-times"></i></button>
                          </div>
                                    </td>
                                </tr>
                            }
                                    
                                    {
                            this.state.projects.map((item,index)=>{
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
                                                   <div className="form-check">
                                                        <input type="checkbox" className="form-check-input"  checked={this.state.statusValue === 1} data-toggle="toggle" onChange={(e)=> this.handleprojectsChange(e,item,index)} />
                                                   </div>
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
                          <button className="btn btn-success" onClick={(e)=>this.handleEditprojects(e,index,item)}><i className="fa fa-edit"></i></button>
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

export default projects