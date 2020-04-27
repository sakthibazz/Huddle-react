import React, { Component, Fragment } from "react"
import Menu1 from "../menu/menu-1"
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"

class Dashboard extends Component {
  state = {
    date: new Date()
  };

  changeDate = (date) => {
    this.setState({
      date: date
    });
  };

  detailView = (e) =>{
    e.preventDefault()
    this.props.history.push('/detail')
  }
  render() {
    return (
      <div>
        <Menu1 />
        <section>
          <div className="container mt-5 pt-5">
            <div className="row mt-5">
              <div className="col-sm-6 mt-5">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    autoOk
                    orientation="landscape"
                    variant="static"
                    value={this.state.date}
                    onChange={(date)=>this.changeDate(date)}
                  />
                </MuiPickersUtilsProvider>

                {/* <h1 className="text-center m-5 pt-5">Welcome to Huddle Meeting</h1> */}
              </div>
              {/* <div className="col-sm-3">
                <div class="card" onClick={(e)=>this.detailView(e)}>
                  <div class="card-header">
                    <h6>Manasa</h6>
                    <p>Total Tasks:110</p>
                  </div>
                  <div class="card-body">
                    <div>
                      <span>Completed:100 </span>
                      <span>OnHold:05</span>
                    </div>
                    <div>
                      <span>Continued:03 </span>
                      <span>pending:02</span>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-sm-3" >
                <div class="card" onClick={(e)=>this.detailView(e)}>
                  <div class="card-header">
                    <h6>Ramesh</h6>
                    <p>Total Tasks:100</p>
                  </div>
                  <div class="card-body">
                    <div>
                      <span>Completed:95 </span>
                      <span>OnHold:03</span>
                    </div>
                    <div>
                      <span>Continued:01 </span>
                      <span>pending:01</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3" >
                <div class="card" onClick={(e)=>this.detailView(e)}>
                  <div class="card-header">
                    <h6>Ramesh</h6>
                    <p>Total Tasks:100</p>
                  </div>
                  <div class="card-body">
                    <div>
                      <span>Completed:95 </span>
                      <span>OnHold:03</span>
                    </div>
                    <div>
                      <span>Continued:01 </span>
                      <span>pending:01</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;
