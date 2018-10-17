import React from 'react';
import { Formik, withFormik } from 'formik'; // Libreria para la creacion del formulario revisar la documentacion !!!
import * as Yup from 'yup'; // Libreria que se complemente con Formik para las validaciones
import config from './../../../../services/config'; // configuracion donde tengo guardada la url de los servicios de API

const UserForm = props => {
	// En esta seccion llamo todas las porps que necesiate con Formik para la creacion del formuladio tener en cuenta la documentacion
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
													'is-invalid'}`} // Este rendering condicional me permite agregar las clases de bootstrap para los diferentes estados que va a tener el input
												value={values.email} // Este valor de value es el atributo html del input pero en su interior llevar los values que formik crear para cargar los datos
												onChange={handleChange} // Este handleChange metodo en javascript para capturar el dato tipado desde el input
												onBlur={handleBlur}
												placeholder={'email@mail.com'}
											/>
											{errors.email &&
												touched.email && (
													<div className="invalid-feedback">{errors.email}</div> // En este rendering condicional me permite agregar el texto de la validacion que se genera en el Yup
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
											disabled={isSubmitting} // Metodo booleano que me permite verificar el estado de activo o desactivo del boton
										>
											{isSubmitting ? (
												<i className="fa fa-spinner" aria-hidden="true" /> // Este rendering condicional me permite agregar un efecto cuando se esta realizando el post
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
/* Con esta seccion se crea asignan las props y los posibles campos del formulario que se van a validar con Yup */
export default withFormik({
	mapPropsToValues: props => ({
		email: props.user.email,
		password: props.user.password,
		passwordConfirmation: props.user.passwordConfirmation
	}),
	/*  Esta metodo es nativo de Formik => pero se complementa con Yup realizar la validacion. en este caso solo se sobre escribe el metodo
	con los campos que se vayan a utilizar y cada una de las funciones se puede mirar en las documentacion de Yup */
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

	/* Este metodo tambien se sobre escribe teniendo en cuenta los values de cada campo en el formulario mirar la documentacion de Formik  */
	handleSubmit: (values, { setSubmitting }) => {
		setTimeout(() => {
			// submit them do the server. do whatever you like!
			// alert(JSON.stringify(values, null, 2));
			console.log(values.email); // valor capturador en el formulario email => solo imprimo el dato para ver si se capturo de manera correcta
			console.log(values.password); // valor capturado en el formulario password => solo imprimo
			console.log(values.passwordConfirmation); // valor capturado en el formulario passwordconfirmation => solo imprimo
			let partial = '/api/user/new'; // parte de la url donde envio los datos en forma de post para registrar el usuario
			fetch(config.defaultURL + partial, {
				method: 'POST',
				headers: {
					'content-type': 'Application/json'
				},
				body: JSON.stringify({
					email: values.email, // los values reemplazan a los state revisar la documentacion de Formik
					password: values.password // los values reeplazan a los state revizar la documentacion de Formik
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
			setSubmitting(false); // Este metodo de manera interna maneja un booleano para activar el boton de enviar los datos revisar la documentacion de formik
		}, 1000);
	}
})(UserForm);
