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
        </Switch>

      </Router>
      
    </div>
  );
}

export default App;
