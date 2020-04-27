import React,{Component} from 'react';
import { BrowserRouter as Router,Route , Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Register from './SignUp';
import Login from './Login';
import Landing from './HomeTwo';
import Dashboard from './components/dashboard/dashboard';
import Admin from './components/admin/admin';
import Manager from './components/managers/managers';
import Meeting from './components/meetings/meeting';
import Details from './components/meetingdetails/details';
import Department from './components/departments/department';
import History from './components/history/history';
// import Table from './components/history/histrory1';
import History1 from './components/history/histrory1';
import Tasks from './components/history/tasks';
import CompletedTasks from './components/history/dummy';
import ContinuedTasks from './components/history/continued';
import PendingTasks from './components/history/pending';
import OnHoldTasks from './components/history/onhold';
import  AllUsers  from './components/allusers/allusers';
import PrivateRoute from './private'
import Status from './components/status/status';
import Types from './components/Types/types'
import Projects from './components/projects/projects';
import Users from './components/users/users';
import AssignedTasks from './components/history/assignedTasks';
import ForgotPwd from "./components/forgotpassword";
import NewPwd from "./components/newpwd";
import DetailedView from "./components/dashboard/detailview";
// import { Table } from '@material-ui/core';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin" component={Admin} />
          <Route path="/managers" component={Manager} />
          <Route path="/meetings" component={Meeting} />
          <Route path="/details" component={Details} />
          <Route path="/departments" component={Department} />
          <Route path="/history" component={History} />
          <Route path="/history1" component={History1} />
          <Route path="/tasks" component={Tasks}></Route>
          <Route path="/completedtasks" component={CompletedTasks}></Route>
          <Route path="/continuedtasks" component={ContinuedTasks}></Route>
          <Route path="/pendingtasks" component={PendingTasks}></Route>
          <Route path="/onhold" component={OnHoldTasks}></Route>
          <Route path="/status" component={Status}></Route>
          <Route path="/projects" component={Projects}></Route>
          <Route path="/users" component={Users}></Route>
          <Route path="/assignedtasks" component={AssignedTasks} />
          <Route path="/forgotpassword" component={ForgotPwd} />
          <Route path="/types" component={Types} />
          <Route path="/newpwd" component={NewPwd} />
          <Route path="/detail" component={DetailedView} />
          <PrivateRoute path='/allusers' component={AllUsers} />
        </Switch>

      </Router>
      
    </div>
  );
}

export default App;
