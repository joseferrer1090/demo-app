import React, { Component } from "react";
import Navbar from "./components/NavBar/NavBar";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  render() {
    let userData = JSON.parse(localStorage.getItem("user"));
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="jumbotron">
                <h4>Dashbard Example</h4>
                <p> {userData} </p>
                <p>Probando el API</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
