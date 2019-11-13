import React,{Component} from 'react';
import { BrowserRouter as Router,Route , Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Register from './components/register/register';
import Login from './components/login/login';
import Landing from './components/landing/landing';
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
// import { Table } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Landing} exact/>
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
        </Switch>

      </Router>
      
    </div>
  );
}

export default App;
