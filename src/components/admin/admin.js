import React,{Component  } from 'react'
import Menu from '../menu/menu'

class Admin extends Component{
    state={
        data:[
            {
                name:"Manasa",
                email:"manasa@aroha.co.in"
            },
            {
                name:"Bharat",
                email:"bharat@aroha.co.in"
            },
            {
                name:"Pratibha",
                email:"Pratibha@aroha.co.in"
            },
            {
                name:"Chandra",
                email:"Chandra@aroha.co.in"
            },
            {
                name:"Arun",
                email:"Arun@aroha.co.in"
            },
            {
                name:"Chetan",
                email:"Chatan@aroha.co.in"
            },
            {
                name:"Mustafa",
                email:"Mustafa@aroha.co.in"
            },
            {
                name:"Soumya",
                email:"soumya@aroha.co.in"
            }
        ],
        isEdited:false,
        editedId:-1,
        aname:"",
        aemail:"",
        addadmin:false,
        rows:[],
        name:""
    }

    handleName = (e) =>{
        const name=e.target.value
        this.setState({
            aname:name
        })
    }

    handleRname = (e) =>{
        const ername=e.target.value
        this.setState({
            name:ername
        })
    }

    handleEmail = (e) =>{
        const mail = e.target.value
        this.setState({
            aemail:mail
        })
    }

    edit = (e,index,val) =>{
        this.setState({
            isEdited:true,
            editedId:index,
            aname:val.name,
            aemail:val.email
        })
    }

    save = (e,index) =>{
        const {aname,data,aemail} = this.state
        data[index].name = aname
        data[index].email = aemail
        this.setState({
            isEdited:false,
            editedId:index,
            aname,
            aemail
        })
    }

    cancel = (e) =>{
        this.setState({
            isEdited:false
        })
    }

    rowadd = (e) =>{
        this.setState({
            addadmin:true
        })
    }

    savedata = (e) =>{
        const {name} = this.state
        this.setState({
            addadmin:false,
            name
        })
    }

    canceldata = (e) =>{
        this.setState({
            addadmin:false
        })
    }

    render(){
        const {data} = this.state 
        return(
            <div>
                <Menu/>
                <div className="container mt-5">
                    <button className="mt-5" onClick = {(e) => this.rowadd(e)}>Add Admin</button>
                    <div className="row">
                        <div className="col-sm-12 table-responsive pt-4">
                        <table className="table table-bordered ">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.addadmin && 
                                <tr>
                                    <td>
                                        <input type="text"  value={this.state.name} onChange={(e) => this.handleRname(e)} />
                                    </td>
                                    <td>
                                        <input type="text" />
                                    </td>
                                    <td>
                                        <span>
                                        <i  className="fa far fa-save" onClick={(e) => this.savedata(e)}></i>
                                        <i  className="fa far fa-times pl-2" onClick={(e) => this.canceldata(e)}></i>
                                        </span>
                                    </td>
                                </tr>
                            }
                            {
                                data.map((val,index) =>{
                                    return(
                                        <tr>
                                            <td>
                                            {
                                                (this.state.isEdited && this.state.editedId === index) 
                                                ? <input type="text"  value={this.state.aname} onChange={(e) => this.handleName(e)} /> 
                                                : val.name
                                            }
                                            </td>
                                            <td>
                                                {
                                                    (this.state.isEdited && this.state.editedId === index) 
                                                    ? <input type="text" value={this.state.aemail} onChange={(e) => this.handleEmail(e)} />
                                                    : val.email
                                                }
                                            </td>
                                            <td>{
                                                 (this.state.isEdited && this.state.editedId === index) 

                                                ?
                                                <span  ><i onClick={(e) => this.save(e,index)} className="fa far fa-save"></i>
                                                <i onClick={(e) => this.cancel(e,index)} className="fa far fa-times pl-2"></i></span>
                                                :<span onClick={(e) => this.edit(e,index,val)}><i className="fa far fa-edit"></i></span>
                                            }</td>
                                       
                                                </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                    </table>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        )
    }
}

export default Admin