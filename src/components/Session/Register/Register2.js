import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DisplayFormikState } from './components/displayformateState.js';

import './helper.css';

class Register2 extends Component {
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
									<Formik
										initialValues={({ email: '' }, { password: '' })}
										validationSchema={Yup.object().shape({
											email: Yup.string(
												'Error is not Email... please type email'
											)
												.email()
												.required('Required'),
											password: Yup.string().required('Password is required')
										})}
									>
										{props => {
											const {
												values,
												touched,
												errors,
												handleChange,
												handleBlur,
												handleSubmit
											} = props;
											return (
												<form role={'form'}>
													<fieldset>
														<div className="form-group">
															<input
																id="email"
																placeholder="Enter your email"
																type="text"
																value={values.email}
																onChange={handleChange}
																onBlur={handleBlur}
																className={
																	errors.email && touched.email
																		? 'form-control text-input error'
																		: 'form-control'
																}
															/>
															{errors.email &&
																touched.email && (
																	<div className="input-feedback">
																		{errors.email}
																	</div>
																)}
														</div>
														<div className="form-group">
															<input
																id={'password'}
																placeholder="Enter your password"
																type="password"
																value={values.password}
																onChange={handleChange}
																// onBlur={handleBlur}
																className={
																	errors.password && touched.password
																		? 'form-control text-input error'
																		: 'form-control'
																}
															/>
															{errors.password &&
																touched.password && (
																	<div className="input-feedback">
																		{errors.password}
																	</div>
																)}
														</div>

														<button
															type="button"
															className="btn btn-success btn-block"
														>
															Registrar
														</button>
													</fieldset>
													{/* <DisplayFormikState {...props} /> */}
												</form>
											);
										}}
									</Formik>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register2;
