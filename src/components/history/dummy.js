import React,{Component  } from 'react'
import axios from 'axios'
import { API_URL } from "../../utils/const";
import Loader from 'react-loader-spinner';
// import { completedColumns } from './columns/columns';
// import ReactTable from "react-table"; 
// import "react-table/react-table.css";
// import Table from './columns/table'

class CompletedTasks extends Component{
    state={
      user_id: "",
      display : true,
        contTasks:[]
    }

    componentDidMount(){
      const Details = 
      {
        user_id: localStorage.getItem("userid")
      }
        axios.post(`${API_URL}/api/completedTasks` , Details,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        } )
        .then(res=>{
            console.log(res);
            const {success} = res.data
            this.setState({
              contTasks:success,
              display : false
            })
        })
    }
    render(){
        return(
          <div>
            {
            (localStorage.getItem('userid')) ?
            <div>
              <div>
                
              </div>
              <div className="container">
              <Loader
            type="Circles"
            color="#00BFFF"
            height={100}
            width={100}
            // timeout={3000}
            visible={this.state.display}
            // color={"tomato"}
          />
              {
               this.state.contTasks == "" && !this.state.display
               ?
                 <h1 className="pt-5">No Data Available</h1>
                   :
                   !this.state.display &&
                <table className="table table-bordered mt-5">
                <thead>{
                !this.state.display &&
                  <tr>
                    <th>Task Created</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>No of Hours</th>
                    <th>Comments</th>
                    <th>Status</th>
                    <th>Task Completed</th>
                  </tr>
                }
                </thead>
             <tbody>
             {
               this.state.contTasks.map((val, index)=>{
                 return(
                   <tr key={index}>
                     <td className="">{val.created_at.slice(0,10)}</td>
                     <td >{val.project_name}</td>
                     <td >{val.description}</td>
                     <td>{val.no_of_hours}</td>
                     <td>{val.comments}</td>
                     <td ><button className="btn" style={{backgroundColor:val.status_color,color:"#fff"}}>{val.status_name}</button></td>
                     <td >{val.updated_at.slice(0,10)}</td>
                   </tr>
                 )
               })
             }
             </tbody>
            </table>
            
    }
    {/* {
      !this.state.display &&
      <div>
    <Table 
      data={this.state.contTasks}
      columns={completedColumns}
      />
      
      </div>
    } */}
    
            </div>
            </div>
            :
            this.props.history.push('/login')
    }
   
         </div>
         
        )
      
    }
}

export default CompletedTasks