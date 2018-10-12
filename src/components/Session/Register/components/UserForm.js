import React from 'react';
import { Formik } from 'formik';

const initialValues = {
	email: '',
	password: ''
};

export default function FormSigFpirm() {
	return (
		<Formik
			initialValues={initialValues}
			validate={validate(getValidateSchema)}
			onSubmit={onSubmit}
			render={rendep}
		/>
	);
}

function SignUpForm(props) {
	const { isSubmitting, errors, handleChange, handleSubmit } = props;

	return (
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
										<input type="text" name="email" onChange={handleChange} />
										<span> {errors.email} </span>
									</div>
									<div className="form-group">
										<input
											type="password"
											name="password"
											onChange={handleChange}
										/>
										<span>{errors.password}</span>
									</div>
									<button onClick={handleSubmit}>
										{isSubmitting ? 'Loading' : 'Sign Up'}
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

function onSubmit(values, { setSubmitting, setErrors }) {
	setTimeout(() => {
		console.log('User has been sucessfully saved!', values);
		setSubmitting(false);
	}, 2000);
}
