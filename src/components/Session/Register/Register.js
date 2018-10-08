import React, { Component } from "react";
import config from "./../../../services/config";

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false
        }
    }

    _handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    _handlePostSubmit = () => {
        this.setState({
            loading: true
        })
        fetch(config.defaultURL + "/api/user/new",{
            method: "POST",
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(response => response.json().then(data => {
            if(response.ok){
                alert("Se registro el Usuario con exito");
                this.props.history.push("/login");
            }else if(response.status === 422) {
                console.log(data);
                alert("no se puedo registrar a la Persona");
            }
        }));
    }

    render(){
        return(
            <div>
                <div className="container"> 
                <div className="row" style={{ marginTop: "120px" }}>
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Registro con Api Carlos</h3>
                            </div>
                            <div className="panel-body">
                                <form role="form" noValidate>
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control"
                                                placeholder="yourmail@example.com"
                                                name={"email"}
                                                type="text"
                                                value={this.state.email}
                                                onChange={this._handleChange}
                                                autoComplete={"Email"}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                placeholder="Regist Password"
                                                name={"password"}
                                                type="password"
                                                value={this.state.password}
                                                onChange={this._handleChange}
                                                autoComplete={"Password"}
                                            />
                                        </div>
                                        <button className="btn btn-sm btn-success btn-block " type="button" onClick={ () => {this._handlePostSubmit()} }> Registro </button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Register;