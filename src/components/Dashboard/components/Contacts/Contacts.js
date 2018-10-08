import React, { Component } from "react";
import { Panel } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import NavBar from "./../NavBar/NavBar";
import config from "./../../../../services/config";

const example = [
  {
    id: 1,
    name: "Product1",
    price: "100"
  },
  {
    id: 2,
    name: "Product2",
    price: "200"
  }
];

const ID = JSON.parse(localStorage.getItem("user_id"));

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      bearer: "Bearer",
      dataList: []
    };
  }

  componentDidMount() {
    console.log(ID);
    this.getDataList();
  }

  getDataList = () => {
    const token = this.state.bearer + " " + localStorage.getItem("auth_token");
    fetch(config.defaultURL + "/api/me/contacts/" + ID, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            dataList: data.data
          });
          console.log(this.state.dataList);
        } else {
          console.log("Error in Fetch");
        }
      })
    );
  };

  _handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  _handlePostContact = e => {
    const token = this.state.bearer + " " + localStorage.getItem("auth_token");
    e.preventDefault();
    console.log(token);
    fetch(config.defaultURL + "/api/contacts/new", {
      method: "POST",
      timeout: 10000,
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        phone: this.state.phone
      })
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          console.log("Se Registro el contacto");
        } else {
          console.log("Error en el fetch");
        }
      })
    );
    console.log();
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="container" style={{ marginTop: 30 }}>
          <div className="col-md-4">
            <div className="login-panel panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Registro de contactos</h3>
              </div>
              <div className="panel-body">
                <form role="form" noValidate>
                  <fieldset>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Nombre"
                        name={"name"}
                        type="text"
                        value={this.state.name}
                        onChange={this._handleChange}
                        autoComplete={"Nombre"}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Telefono"
                        name={"phone"}
                        type="text"
                        value={this.state.phone}
                        onChange={this._handleChange}
                        autoComplete={"Telefono"}
                      />
                    </div>
                    {/* Change this to a button or input when using this as a form */}
                    <button
                      type="submit"
                      className="btn btn-sm btn-success"
                      onClick={this._handlePostContact}
                    >
                      Registro
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading">Mis contactos</div>
              <div className="panel-body">
                <BootstrapTable
                  data={this.state.dataList}
                  striped
                  hover
                  search={true}
                >
                  <TableHeaderColumn isKey dataField={"ID"}>
                    {" "}
                    ID{" "}
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField={"name"}>
                    Nombre
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField={"phone"}>
                    Telefono
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField={"user_id"}>
                    usuario_registro
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Contacts;
