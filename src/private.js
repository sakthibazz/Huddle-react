import React, {PropTypes} from "react"
import {Route, Redirect} from "react-router-dom"
function PrivateRoute ({component: Component, ...rest}) {
    const groupid = localStorage.getItem('groupid')
    if(groupid && parseInt(groupid) == 1){
        return (
            <Route render={(props) =>  <Component {...props} />} />
        )
    }else {
        return (
            <Route
        {...rest}
        render={(props) => <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
        )
    }
  }

  export default PrivateRoute

