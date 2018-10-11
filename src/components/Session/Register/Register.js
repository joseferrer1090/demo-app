import React, { Component } from 'react';
import config from './../../../services/config';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			fields: [],
			errors: [],
			show: true
		};
	}

	handleValidation() {
		let fields = this.state.fields;
		let errors = {};
		let formIsValid = true;

		// email
		if (!fields['email']) {
			formIsValid = false;
			errors['email'] = 'El campo no puede estar vacio';
		}

		if (typeof fields['email'] !== 'undefined') {
			let lastAtPos = fields['email'].lastIndexOf('@');
			let lastDotPos = fields['email'].lastIndexOf('.');

			if (
				!(
					lastAtPos < lastDotPos &&
					lastAtPos > 0 &&
					fields['email'].indexOf('@@') == -1 &&
					lastDotPos > 2 &&
					fields['email'].length - lastDotPos > 2
				)
			) {
				formIsValid = false;
				errors['email'] = 'correo electronico no valido';
			}
			this.setState({ errors: errors });
			return formIsValid;
		}
		//Password
		if (!fields['password']) {
			formIsValid = false;
			errors['password'] = 'No puede crear usuario sin password';
		}
	}

	handleChange(field, e) {
		let fields = this.state.fields;
		fields[field] = e.target.value;
		this.setState({ fields });
		//console.log(this.state.fields['password']);
	}

	_handlePostSubmit = e => {
		if (this.handleValidation()) {
			this.setState({
				loading: true
			});
			fetch(config.defaultURL + '/api/user/new', {
				method: 'POST',
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password
				})
			}).then(response =>
				response.json().then(data => {
					if (response.ok) {
						alert('Se registro el Usuario con exito');
						this.props.history.push('/login');
					} else if (response.status === 422) {
						console.log(data);
						alert('no se puedo registrar a la Persona');
					}
				})
			);
		} else {
			// Notificacion que no se envio el formulario y corregir la informacion que se dijita en el formulario
		}
	};

	handleDismiss() {
		this.setState({
			show: false
		});
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="row" style={{ marginTop: '120px' }}>
						<div className="col-md-4 col-md-offset-4">
							<div className="panel panel-default">
								<div className="panel-heading">
									<h3 className="panel-title">Registro con Api Carlos</h3>
								</div>
								<div className="panel-body">
									<form role="form" noValidate>
										<fieldset>
											<div className="form-group">
												<input
													ref={'email'}
													className="form-control"
													placeholder="yourmail@example.com"
													name={'email'}
													type="text"
													value={this.state.fields['email']}
													onChange={this.handleChange.bind(this, 'email')}
													autoComplete={'Email'}
												/>
												<span> {this.state.errors['email']} </span>
											</div>
											<div className="form-group">
												<input
													refs={'password'}
													className="form-control"
													placeholder="Regist Password"
													name={'password'}
													type="password"
													value={this.state.fields['password']}
													onChange={this.handleChange.bind(this, 'password')}
													autoComplete={'Password'}
												/>
												<span>{this.state.errors['password']}</span>
											</div>
											<button
												className="btn btn-sm btn-success btn-block "
												type="button"
												onClick={() => {
													this._handlePostSubmit();
												}}
											>
												{' '}
												Registro{' '}
											</button>
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
