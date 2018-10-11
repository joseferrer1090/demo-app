import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from './../../../services/config';
import styled from 'styled-components';
import createFragment from 'react-addons-create-fragment';
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
			errors: []
		};
	}

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
						errors: data.message,
						loading: false
					});
					console.log(data);
				}
			})
		);
	}

	_handleReset = e => {
		e.target.reset();
	};

	render() {
		let button = this.state.loading ? (
			<a className="btn btn-sm btn-success btn-block " type="button">
				Login...
				<i className="fa fa-spinner fa-pulse fa-1x fa-fw" />
			</a>
		) : (
			<a
				className="btn btn-sm btn-success btn-block "
				type="button"
				onClick={() => {
					this.SubmitForm();
				}}
			>
				Login
			</a>
		);

		let errors =
			this.state.errors.length > 0 ? (
				<div className="text-center">
					<code>{this.state.errors}</code>
					<br />
					<br />
				</div>
			) : null;

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
									{errors}
									<fieldset>
										<div className="form-group">
											<input
												className="form-control"
												name="email"
												placeholder="yourmail@example.com"
												type="text"
												value={this.state.email}
												onChange={e => {
													this.setState({ [e.target.name]: e.target.value });
												}}
												autoComplete={'Email'}
												autoFocus={true}
											/>
										</div>

										<div className="form-group">
											<input
												id="currentPassword"
												name="password"
												className="form-control"
												placeholder="Password"
												type="password"
												value={this.state.password}
												onChange={e => {
													this.setState({ [e.target.name]: e.target.value });
												}}
												autoComplete={'Password'}
											/>
										</div>
									</fieldset>
									{button}
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
