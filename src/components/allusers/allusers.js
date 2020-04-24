import React,{Component  } from 'react';
import axios from 'axios';
import { API_URL } from "../../utils/const";
import Loader from 'react-loader-spinner';
import Menuone from "../menu/menu-1";
import "react-widgets/dist/css/react-widgets.css";
import DropdownList from "react-widgets/lib/DropdownList";
// import DatePicker from "react-datepicker";
// import DatePicker from 'react-date-picker'
//  import "react-datepicker/dist/react-datepicker.css"
// import "react-datepicker/dist/react-datepicker.css";
class AllUsers extends Component{
    state={
        user_id:"",
        allusers:[],
        userId:"",
        tasks:[],
        display : true,
        status:[],
        sname:""
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
                this.setState({
                    allusers:success,
                    display:false
                })
          })

          axios.get(`${API_URL}/api/allStatus`,{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(res=>{
            console.log(res);
            const {success} = res.data;
            this.setState({
              status:success,
              display:false
              
            })
          });

    }

   

    onSelectedUser = (user) => {
      const {status} = this.state
      console.log(user)
        const userdetails ={
            user_id: user.id
          }
        const user_id = user.id
        axios.post(`${API_URL}/api/displyAllData`, userdetails)
        .then(res=>{
            const {success} = res.data
            this.setState({
                tasks:success,
                display:false
                
            })

        })

        
        this.setState({
          userId: user.id,
          user_id
        });
      };

      onSelectedStatus = (sts) => {
        const {userId} = this.state
        console.log(sts)
        const details ={
            user_id: userId,
            status_id:sts.id
          }
        axios.post(`${API_URL}/api/displyAllDataBasedStatus`, details)
        .then(res=>{
            const {success} = res.data
            this.setState({
                tasks:success,
                display:false
                
            })

        })

       
      };

      handleSearch = (e) => {
        let {tasks} = this.state
        // oData= this.state.users
        let {value} = e.target;
        if(value !== ""){
            
         let newData = this.state.tasks.filter(item=>{
           return item.project_name.toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
           item.description.toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
           item.status_name.toLowerCase().indexOf(value.toLowerCase()) !== -1 
            })
            this.setState({
                tasks:newData
            })
        }
        else{
            axios.get(`${API_URL}/api/displyAllData`,{
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                }
              })
            .then(res=>{
                  console.log(res)
                  const {success} = res.data
                  
                  this.setState({
                      tasks:success
                  })
            })
            
        }

    }

    

    onChange = date => this.setState({ date })

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      };

    render(){
      const { selectedOption,allusers,status } = this.state;
      const userlist=allusers.map((item,idx)=>{
        return(
          item.is_active === 1
          ?
          item
          :
          ""
        )
      })

      const stslist=status.map(item=>{
        return(
          item.is_active === 1.
          ?
          item
          :
          ""
        )
      })
        let widget = (
            <DropdownList  filter
            onSelect={this.onSelectedUser}
              data={userlist}
              valueField="id"
              textField="first_name"
              defaultValue={"Select User"}
            />
          );

          let widget1 = (
            <DropdownList filter
            onSelect={this.onSelectedStatus}
              data={stslist}
              valueField="id"
              textField="name"
              defaultValue={"Select Status"}
            />
          );
        return(
            <div> {
                
                (localStorage.getItem('userid')) ?
                <div>
                <Menuone />
                <h1 className="mt-5 pt-5">Users Tasks</h1>
                <div className="container" style={{minHeight:"500px"}} >
                {/* <div className="col-sm-12">
                      <input  class="form-control mt-5" type="search" placeholder="Search: Users/Email" onChange={(e)=>this.handleSearch(e)} /> 
                      </div> */}
                    <div className="row ">
                      {/* <div className="col-sm-4">
                      <label className="pr-5">Select Date:</label>
                      <DatePicker 
                        selected={this.state.date}
                            onChange={this.onChange}
                            value={this.state.date}
                            calendarAriaLabel={false}
                            calendarIcon={false}
                            minDate={new Date()}
                            maxDate={new Date()}
                            disableCalendar={false}
                        /> 
                        </div> */}
                        <div className="col-sm-6">
                            <label className="pr-5">Select User:</label>
                            
                                {/* this.state.allusers && this.state.allusers.length>0 */}
                                <p>{widget}</p>
                            
                           
                           
                        </div>
                        <div className="col-sm-6">
                            <label className="pr-5">Select Status:</label>
                            
                                {/* this.state.allusers && this.state.allusers.length>0 */}
                                <p>{widget1}</p>
                            
                           
                           
                        </div>
                         {/* <div className="col-sm-6 text-left">
                         <label className="font-weight-bold">Select Status: </label>
                         <select value={this.state.sname} onChange={e => this.handleStatus(e)} className="form-control">
                             <option value="select">All Task</option>
                           {this.state.status.map((sts,index) => {
                             return (
                              
                                 <option value={sts.name} key={index}>{sts.name}</option>
                               
                             )
                           })}
                         </select>
                       </div> */}

                        
                        
                    </div>
                    <div className="row">
                     {
                       this.state.tasks.length == 0
                       ?
                       <h1 className="text-center mt-5">No Data Available,Please Select User to view tasks</h1>
                       :
                        <table className="table table-bordered mt-5 text-left">
                            <thead>{
                                !this.state.display &&
                                        <tr>
                                            <th>Task Created</th>
                                            <th>Project Name</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>No of Hours</th>
                                            <th>Comments</th>
                                            <th>Task Updated</th>
                                        </tr>
                                }
                            </thead>
                            <tbody>
                                {
                                    this.state.tasks.map((item,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td width="140">{item.created_at.slice(0,10)}</td>
                                                <td width="140">{item.project_name}</td>
                                                <td>{item.description}</td>
                                                <td><button className="btn" style={{backgroundColor:item.status_color,color:"#fff",width:"100%"}}>{item.status_name}</button></td>
                                                <td>{item.no_of_hours}</td>
                                                <td>{item.comments}</td>
                                                <td width="140">{item.updated_at.slice(0,10)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
    }
                    </div>
                </div>
                </div>
                :
                this.props.history.push('/login')
        }
        <Loader
            type="Circles"
            color="#00BFFF"
            height={100}
            width={100}
            // timeout={3000}
            visible={this.state.display}
          />
            </div>
        )
    }
}

export default AllUsers