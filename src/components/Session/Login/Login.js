import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from './../../../services/config';
import './login.css';

const asyncLocalStorage = {
	setItem: function(key, value) {
		return Promise.resolve().then(function() {
			localStorage.setItem(key, value);
		});
	},
	getItem: function(key) {
		return Promise.resolve().then(function() {
			return localStorage.getItem(key);
		});
	}
};

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			loading: false,
			loggedIn: false
		};
	}

	_handleEmail = e => {
		this.setState({
			email: e.target.value
		});
	};

	_handlePassword = e => {
		this.setState({
			password: e.target.value
		});
	};

	SubmitForm() {
		this.setState({
			loading: true
		});
		fetch(config.defaultURL + '/api/user/login', {
			method: 'POST',
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		}).then(response =>
			response.json().then(data => {
				if (response.ok) {
					asyncLocalStorage
						.setItem('auth_token', data.account['token'])
						.then(() => {
							asyncLocalStorage.setItem('user_id', data.account['ID']);
						})
						.then(() => {
							asyncLocalStorage.setItem(
								'user',
								JSON.stringify(data.account['email'])
							);
						})
						.then(() => {
							const user_id = JSON.parse(localStorage.getItem('user_id'));
							const user = localStorage.getItem('user');
							const auth_token = localStorage.getItem('auth_token');
							if (auth_token != null) {
								this.props.history.push('/dashboard?m=1');
							} else {
								this.props.history.push('/login');
							}
						});
				} else if (response.status === 401) {
					this.setState({
						errors: data.error,
						loading: false
					});
				}
			})
		);
	}

	_handleReset = e => {
		e.target.reset();
	};

	render() {
		console.log('Render');
		return (
			<div className="container">
				<div className="row" style={{ marginTop: '120px' }}>
					<div className="col-md-4 col-md-offset-4">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Login Example Api Carlos</h3>
							</div>
							<div className="panel-body">
								<form role="form" noValidate>
									<fieldset>
										<div className="form-group">
											<input
												className="form-control"
												placeholder="yourmail@example.com"
												type="text"
												value={this.state.email}
												onChange={this._handleEmail}
												autoComplete={'Email'}
											/>
										</div>
										<div className="form-group">
											<input
												id="currentPassword"
												className="form-control"
												placeholder="Password"
												type="password"
												value={this.state.password}
												onChange={this._handlePassword}
												autoComplete={'Password'}
											/>
										</div>
										<button
											className="btn btn-sm btn-success btn-block "
											type="button"
											onClick={() => {
												this.SubmitForm();
											}}
										>
											{' '}
											Login{' '}
										</button>
									</fieldset>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
