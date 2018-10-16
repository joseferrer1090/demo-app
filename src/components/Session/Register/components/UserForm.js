import React from 'react';
import { Formik, withFormik } from 'formik';
import * as Yup from 'yup';
import config from './../../../../services/config';

const UserForm = props => {
	const {
		values,
		touched,
		errors,
		dirty,
		isSubmitting,
		handleChange,
		setFieldValue,
		handleBlur,
		handleSubmit,
		handleReset
	} = props;

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
								<form role="form" noValidate onSubmit={handleSubmit}>
									<fieldset>
										{/* campo del correo electronico */}
										<div className="form-group">
											<input
												name="email"
												type="text"
												className={`form-control ${errors.email &&
													touched.email &&
													'is-invalid'}`}
												value={values.email}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder={'email@mail.com'}
											/>
											{errors.email &&
												touched.email && (
													<div className="invalid-feedback">{errors.email}</div>
												)}
										</div>
										{/* FIN */}

										{/*  Campo de password */}
										<div className="form-group">
											<input
												name="password"
												type="password"
												className={`form-control ${errors.password &&
													touched.password &&
													'is-invalid'}`}
												value={values.password}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder={'password'}
											/>
											{errors.password &&
												touched.password && (
													<div className="invalid-feedback">
														{errors.password}
													</div>
												)}
										</div>
										{/* FIN */}

										{/*  Campo de de confirmacion de la contraseña */}
										<div className="form-group">
											<input
												name="passwordConfirmation"
												type="password"
												className={`form-control ${errors.passwordConfirmation &&
													touched.passwordConfirmation &&
													'is-invalid'}`}
												value={values.passwordConfirmation}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder={'confirm password'}
											/>
											{errors.passwordConfirmation &&
												touched.passwordConfirmation && (
													<div className="invalid-feedback">
														{errors.passwordConfirmation}
													</div>
												)}
										</div>
										{/* Fin */}

										<button
											type="submit"
											className="btn btn-success btn-block"
											disabled={isSubmitting}
										>
											{isSubmitting ? (
												<i className="fa fa-spinner" aria-hidden="true" />
											) : (
												'Register'
											)}
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
};

export default withFormik({
	mapPropsToValues: props => ({
		email: props.user.email,
		password: props.user.password,
		passwordConfirmation: props.user.passwordConfirmation
	}),

	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required!'),
		password: Yup.string()
			.min(6)
			.required('Password is required!'),
		passwordConfirmation: Yup.string().required(
			'password confirmation is required!'
		)
	}),

	handleSubmit: (values, { setSubmitting }) => {
		setTimeout(() => {
			// submit them do the server. do whatever you like!
			// alert(JSON.stringify(values, null, 2));
			console.log(values.email);
			console.log(values.password);
			console.log(values.passwordConfirmation);
			let partial = '/api/user/new';
			fetch(config.defaultURL + partial, {
				method: 'POST',
				headers: {
					'content-type': 'Application/json'
				},
				body: JSON.stringify({
					email: values.email,
					password: values.password
				})
			}).then(response =>
				response.json().then(data => {
					if (response.ok) {
						alert('Se registro usuario');
					} else if (response === 401) {
						console.log(data.message);
					}
				})
			);
			setSubmitting(false);
		}, 1000);
	}
})(UserForm);
