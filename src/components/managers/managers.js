import React,{Component  } from 'react'
import Menu from '../menu/menu'

class Manager extends Component{
    state={
        data:[
            {
                name:"Rajesh"
            },
            {
                name:"Ramesh"
            },
            {
                name:"Raghu"
            }
        ],
        isEdited:false,
        editedId:-1,
        mname:"",
        addmanager:false
    }

    handleName = (e) =>{
        const name=e.target.value
        this.setState({
            mname:name
        })
    }


    edit = (e,index,val) =>{
        this.setState({
            isEdited:true,
            editedId:index,
            mname:val.name,
            aemail:val.email
        })
    }

    save = (e,index) =>{
        const {mname,data,aemail} = this.state
        data[index].name = mname
        data[index].email = aemail
        this.setState({
            isEdited:false,
            editedId:index,
            mname,
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
            addmanager:true
        })
    }


    render(){
        const {data} = this.state 
        return(
            <div>
                <Menu/>
                <div className="container mt-5">
                    <button className=" mt-5" onClick = {(e) => this.rowadd(e)}>Add Manager</button>
                    <div className="row">
                        <div className="col-sm-12 table-responsive pt-4">
                        <table className="table table-bordered ">
                        <thead>
                            <tr>
                                <th>Name</th>
                                {/* <th>Email</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.addmanager && 
                                <tr>
                                    <td>
                                        <input type="text" />
                                    </td>
                                    <td>
                                        <input type="text" />
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
                                                ? <input type="text"  value={this.state.mname} onChange={(e) => this.handleName(e)} /> 
                                                : val.name
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

export default Manager