import React,{Component  } from 'react'
import Menu from '../menu/menu'

class Department extends Component{
    state={
        data:[
            {
                name:"Development"
            },
            {
                name:"HR Department"
            },
            {
                name:"Testing"
            }
        ],
        isEdited:false,
        editedId:-1,
        dname:""
    }

    handleName = (e) =>{
        const name=e.target.value
        this.setState({
            dname:name
        })
    }


    edit = (e,index,val) =>{
        this.setState({
            isEdited:true,
            editedId:index,
            dname:val.name,
            aemail:val.email
        })
    }

    save = (e,index) =>{
        const {dname,data,aemail} = this.state
        data[index].name = dname
        data[index].email = aemail
        this.setState({
            isEdited:false,
            editedId:index,
            dname,
            aemail
        })
    }

    cancel = (e) =>{
        this.setState({
            isEdited:false
        })
    }
    render(){
        const {data} = this.state 
        return(
            <div>
                <Menu/>
                <div className="container mt-5">
                    <button className=" mt-5" >Add Department</button>
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
                                data.map((val,index) =>{
                                    return(
                                        <tr>
                                            <td>
                                            {
                                                (this.state.isEdited && this.state.editedId === index) 
                                                ? <input type="text"  value={this.state.dname} onChange={(e) => this.handleName(e)} /> 
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

export default Department