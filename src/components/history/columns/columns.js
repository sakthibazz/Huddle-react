export const completedColumns = [
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
            Header:'Task Completed',
            accessor:'updated_at'
        }
    ]


// ["id", "description", "task_id", "status_id", "dependency", "user_id", "created_at", "updated_at", "project_name", "status_name"]