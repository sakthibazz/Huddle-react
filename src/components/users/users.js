import React,{ Component } from 'react'
import axios from 'axios'
import { API_URL } from "../../utils/const";
import Select from 'react-select';
import Menuone from "../menu/menu-1";


// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
//   ];


class Users extends Component{
    state = {
        users:[],
        editedRow:false,
        selectedRow:-1,
        sts:"",
        addstatus:false,
        projDept:[],
        statusValue:0,
        selectedOption: null,

    }

    componentDidMount(){
        axios.get(`${API_URL}/api/allusers`,{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(res=>{
                console.log(res)
                const {success} = res.data
                // const users = success.map((val,index)=>{
                //      val.status=0;
                //     return val;
                // })
                this.setState({
                    users:success
                    // users:users
                })
          })

          axios.get(`${API_URL}/api/allProjectsDepartments`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(res=>{
            console.log(res);
            const {success} = res.data;
            const projectName = success.map((item,index)=>{
                return {
                    value:item.id,
                    label:item.name
                }
            })
            this.setState({
              projDept:projectName
            })
          });

    }

    handleChange = val => {
        // console.log(selectedOption)
        const {projDept} = this.state
        this.setState({ selectedOption: val });
        // console.log(`Option selected:`, selectedOption);
      };

    handleUserEdit =(e,index,val) =>{
        // alert("calling")
        console.log(val)
        let {selectedOption, statusValue,users} = this.state
        selectedOption=val.projects_final
        statusValue = val.is_active
        // selectedOption = //take it from state
        // selectedOption = item.project_department_id
        this.setState({
            editedRow:true,
            selectedRow:index,
            selectedOption,
            statusValue
        })

    }


    handleCancel = (e,index,val) =>{
        let {users,statusValue} = this.state
        // users[index].status = statusValue
        
        // alert("Mansa")
        this.setState({
            editedRow:false,
            users
        })
    }

    handleStatusChange = (e,val,index) =>{
        // const { value } = e.target;
        let {users,statusValue } = this.state;
        statusValue = statusValue === 0 ? 1 : 0
        // statusValue= value === "on" ? 0 : 1 //0
        // users[index].is_active = users[index].is_active === 0 ? 1 : 0 //1
        // if(users[index].status === 0){
        //     users[index].status = 1
        // } else {
        //     users[index].status = 0
        // }
        // if(users[index].status === 0){
        //     users[index].status = 1
        // }
        // else if(users[index].status === 1){
        //     users[index].status = 0
        // }
        this.setState({
            statusValue, //0
            users
        })
    }

    // isOptionDisabled = (option) =>{
    //     console.log(option);
    //     const {selectedOption} = this.state;
    //     const index = selectedOption.findIndex((val,idx)=>{
    //         return val.label === option.label;
    //     })
    //     if(index >=0){
    //         return true
    //     }
    //     return false
    // }

    handleUsersSave = (e,index) =>{
        const {users,statusValue,selectedOption} = this.state;
        // users[index].is_active=statusValue
        users[index].project_department_id=selectedOption.map(val=>{
            return val.value
        })
        // console.log(project_department_id)
        users[index].project_department_id=users[index].project_department_id.join(",")
        users[index].is_active = statusValue
        const userDetails ={
            user_id:users[index].id,
            email:users[index].email,
            departmentIds: users[index].project_department_id,
            status:statusValue
        }
        axios.post(`${API_URL}/api/userStatusUpdate`, userDetails ,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              }
        })
        .then(res =>{
            console.log(res)
            users[index].projects_final = selectedOption
            this.setState({
                editedRow:false,
                selectedRow:index,
                statusValue,
                users
            })
            // const {success} = res.data
        })
        // users[index].status = statusValue;
        // users[index].projects_final = selectedOption
        // users[index].project_department_id=selectedOption.map(val=>{
        //     return val.value
        // })
        

       
    }
   

    render(){
         const {selectedOption} = this.state
        return(
            <div>
                <Menuone />
                <div className="container ">
                    
                    { 
                     this.state.users.length == 0
                     ?
                     "No data available"
                     :
                     <div>
                    {/* <button className="btn btn-primary mt-4">Add Users</button> */}
                   <table className="table table-bordered mt-5 pt-4">
                       <thead>
                           <tr>
                               <th>UserName</th>
                               <th>Email</th>
                               <th>Project</th>
                               <th>Status</th>
                               <th>Action</th>
                           </tr>
                       </thead>
                       <tbody>
                           {
                               this.state.users.map((val,index)=>{
                                   return(
                                       <tr>
                                           <td>{val.first_name}</td>
                                           <td>{val.email}</td>
                                           <td>
                                               {
                                                   
                          
                                                    this.state.editedRow === true && this.state.selectedRow === index
                                                    ?
                                                    // <select className="form-control">
                                                    //   <option>Select Status</option>
                                                    //   {
                                                    //     this.state.projDept.map((proj,index)=>{
                                                    //         return (
                                                    //           <option >{proj.name}</option>
                                                    //         )
                                                    //     })
                                                    //   }
                                                    // </select>
                                                    <Select
                                                    value={selectedOption}
                                                    isOptionDisabled={this.isOptionDisabled}
                                                    // hideSelectedOptions={true}
                                                    filterOption={this.filterOption}
                                                    onChange={this.handleChange}
                                                    options={this.state.projDept}
                                                    isMulti={true}
                                                />
                                                   
                                                   :
                                                  
                                                    val.projects_final.map((item, index)=>{
                                                        return (
                                                            <span>
                                                                {
                                                                val.projects_final.length-1 !== index
                                                                ?
                                                                item.label+','
                                                                :
                                                                item.label
                                                            }
                                                            </span>
                                                        )
                                                    })
                                               }
                                            </td>
                                           <td>
                                               {
                                                    this.state.editedRow === true && this.state.selectedRow === index
                                                    ?
                                                    
                                                    <input type="checkbox" checked={this.state.statusValue === 1} data-toggle="toggle" onChange={(e)=> this.handleStatusChange(e,val,index)} />
                                                    :
                                                        
                                                            val.is_active === 1
                                                            ?

                                                    <button className="btn btn-success btn-small" >Active</button>
                                                    :
                                                    <button className="btn btn-danger btn-small" disabled>InActive</button>   
                                                        

                                               }
                                               </td>
                                                   
                                                   
                                           <td>
                                    {
                          this.state.editedRow === true && this.state.selectedRow === index
                          ?
                          <div>
                          <button className="btn btn-primary" onClick={(e) =>this.handleUsersSave(e,index)} ><i className="fa fa-save" ></i></button>
                          <button className="btn btn-danger" onClick={(e)=>this.handleCancel(e,index,val)}><i className="fa fa-times"></i></button>
                          </div>
                          :
                          <button className="btn btn-success" onClick={(e)=>this.handleUserEdit(e,index,val)}><i className="fa fa-edit"></i></button>
                        }
                                    </td>
                                       </tr>
                                   )
                               })
                           }
                       </tbody>

                   </table>
                   </div>

    }
    
                </div>
            </div>
        )
    }
}

export default Users