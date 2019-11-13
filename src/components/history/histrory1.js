import React,{Component} from 'react'
// import  MultiSelectReact  from 'multi-select-react';
import Select from 'react-select';
import { Menu } from '@material-ui/core';
import Menuone from '../menu/menu-1';
import DatePicker from 'react-date-picker'
import axios from 'axios';
// import "react-datepicker/dist/react-datepicker.css"
import { API_URL } from '../../utils/const';
import swal from 'sweetalert';


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
class History1 extends Component{
    state={
        addRows:[
            {
                description:"",
                project_department_id:""
            }
        ],
        selectedRow:-1,
        selectedOption: null,
        date: new Date(),
        projects:[],
        
        display:false,
        
        disabled:false,
        user_id:""
    }

    componentDidMount(){
        axios.get(`${API_URL}/api/projectsDepartments`,
        {
            headers:{
                Authorization : "Bearer " + localStorage.getItem('token')
            }
           
        
        })
        .then(res=>{
            console.log(res)
            const {proj_id,projects} = this.state
            
            this.setState({
                projects:res.data.success,
                proj_id:projects.id
            })
            console.log(proj_id)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    addRow = () =>{
        console.log("printing")
        let {addRows} = this.state
        addRows.push({
            projectName:'',
            task:''
        })
        this.setState({
            addRows
        })
    }

    removeRow = (index) =>{
        let {addRows} = this.state
        addRows.pop({
            projectName:'',
            task:''
        })
        this.setState({
            addRows,
            selectedRow:index
        })
    }

    newTaskDesc = (e,index) =>{
        const {value} = e.target
        const {addRows} = this.state
        
        addRows[index].description = value
        console.log(addRows[index])
        this.setState({
            addRows
        })
    }

    handleProject =(e,index) =>{
        const {value} = e.target
        const {addRows} = this.state
        // const {projects} = this.state
        addRows[index].project_department_id = value

         
        
        this.setState({
            addRows
        })
        console.log(this.state.proj_id)
    }

    handleTaskSave = (id) =>{
        const {desc,projects,proj_id,addRows} = this.state
        console.log(projects);
    //   const proj = projects.map(val =>{
    //         return val.id;

    //     })
    //     console.log("printing proj")
    //     console.log(proj)
       
        const taskDetails = addRows.map(item => {
            item['user_id'] = localStorage.getItem('user_id')
            return item
        })
       
        swal( "Saved success",{
            icon: "success",
            button: "OK",
          });
        // const taskDetails = [{
        //     description:desc,
        //     user_id: localStorage.getItem('user_id'),
        //     project_department_id:addRows[proj_id]
        // }]
        console.log(taskDetails)
        axios.post(`http://api.huddle.aroha.co.in/api/createNewTask`,taskDetails,
        {
            headers:{
                Authorization : "Bearer " + localStorage.getItem('token')
            }
        
        })
        .then(res =>{
            console.log(res);
           
        })
    }


    onChange = date => this.setState({ date })

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      };
    render(){
        const { selectedOption } = this.state;
        return(
            <div>
                <Menuone />
                <div className="container pt-5">
                    <div className="row mt-5">
                    {/* <form className="col-sm-12 text-center mt-3">
                        <div className="form-group">
                            <label className="col-sm-1 float-left pt-2">Date:</label>
                            <input type="date" name="bday" max="3000-12-31" 
                                    min="1000-01-01" class="form-control col-sm-3" />
                        </div>
                        
                        
                        
                        
                        </form> */}
                        {/* <DatePicker 
                        selected={this.state.startDate}
                            onChange={this.onChange}
                            value={this.state.date}
                            calendarAriaLabel={false}
                            calendarIcon={false}
                            minDate={new Date()}
                            maxDate={new Date()}
                            disableCalendar={true}
                        /> */}
                    </div>
                    <div className="row pt-2">
                        <table className="table table-bordered w-100 m-2">
                            <thead>
                            <tr>
                                <th>Select Project</th>
                                <th>New Task</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* <tr>
                                        <td>
                                        <select onChange={(e)=>this.handleProject(e)}>

                                                 {
                                                     this.state.projects.map(proj =>{
                                                         return(
                                                             <option value={proj.id}>{proj.name}</option>
                                                         )
                                                     })
                                                 }
                                             </select>  
                                        </td>
                                        <td>
                                            <input type="text" name="desc" placeholder="Task Desc" onChange={(e)=>this.newTaskDesc(e)} />
                                        </td>
                                        <td>
                                    <span onClick={()=>this.addRow()}><i className="fa fas fa-plus"></i></span> */}
                                    {/* <span onClick={()=>this.addRow()}><i className="fa fas fa-save"></i></span> */}
                                    {/* <button >Save</button>
                                    <button onClick={()=>this.addRow()}>Add</button> */}
                                    {/* </td>
                                        </tr> */}
                            {
                                
                                this.state.addRows.map( (item,index) => <tr key={index}>
                                         <td>
                                             <select onChange={(e)=>this.handleProject(e,index)}>

                                                 {
                                                     this.state.projects.map(proj =>{
                                                         return(
                                                             <option value={proj.id}>{proj.name}</option>
                                                         )
                                                     })
                                                 }
                                             </select>
                                         </td>
                                         <td>
                                             <input type="text" name="desc" placeholder="Task Desc" onChange={(e)=>this.newTaskDesc(e,index)}  />
                                         </td>
                                         { this.state.addRows.length-1 === index
                                          ?
                                            <td>
                                                <span onClick={()=>this.addRow(index)}><i className="fa fas fa-plus"></i></span>
                                            </td>
                                            :
                                         <td>
                                         <span onClick={()=>this.removeRow(index)}><i className="fa fas fa-times"></i></span>
                               </td>
                                         }
                                 </tr>
                                )
                                        
                            }

                                
                            
                            </tbody>

                            
                        </table>
                        <button onClick={(e)=>this.handleTaskSave(e)} className="btn btn-sm btn-primary">Save</button>
                        
                        
                    </div>
                   
                   <div className="row">
                        <div className="mt-3 col-sm-12">
                            <label>Completed Tasks:</label>
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                                isMulti={true}
                            />
                         </div>
                    </div>
                    <div className="row">
                        <div className="mt-3 col-sm-12">
                            <label>Continued/Inprogress Tasks:</label>
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                                isMulti={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mt-3 col-sm-12">
                            <label>Dependancy:</label>

                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                                isMulti={true}
                            />
                        </div>
                    </div>
      
                         
                    <div className="row">
                        <div class="col-sm-5 mt-3">
                            <label>Meetings:</label>
                            <textarea rows="5" cols="60" className="" disabled></textarea>
                        </div>
                    
                        <div class="col-sm-5 mt-3">
                            <label>Learning:</label>
                            <textarea rows="5" cols="60"></textarea>
                        </div>
                    </div>
                
                </div>



            </div>
        )
    }
}

export default History1