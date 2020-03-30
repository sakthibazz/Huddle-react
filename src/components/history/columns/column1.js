
import React from 'react'
import PendingTasks from "../pending";



export const pendingColumns = [
    {
        Header: 'Task Created',  
        accessor: 'created_at' 
    },
    {
        Header: 'Name',  
        accessor: 'project_name' 
    },
    {
        Header:'Description',
        accessor: 'description'
    },
    {
        Header:'Status',
        accessor:'status_name'
    },
    {
        Header:'Action',
        accessor: () => (<button className="btn btn-success" ><i className="fa fa-edit"></i></button>)
    }
    
]

// id: 814
// description: "Implementation of react table in pending,on-hold and continued Tasks"
// task_id: 814
// status_id: 3
// dependency: null
// user_id: 10
// created_at: "16-01-2020"
// updated_at: "17-01-2020"
// project_name: "Huddle App"
// status_name: "Pending"