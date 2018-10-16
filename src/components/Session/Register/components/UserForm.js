import React from 'react';
import { Formik, withFormik } from 'formik';
import * as Yup from 'yup';

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
		<form className="p-5" onSubmit={handleSubmit}>
			<h1>Hello this is form!</h1>
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
				/>
				{errors.email &&
					touched.email && (
						<div className="invalid-feedback">{errors.email}</div>
					)}
			</div>
			<div className="form-group">
				<input
					name="password"
					type="password"
					className={`form-control ${errors.password &&
						touched.password &&
						'is-invalid'}`}
					value={values.username}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				{errors.password &&
					touched.password && (
						<div className="invalid-feedback">{errors.password}</div>
					)}
			</div>
			<button
				type="submit"
				className="btn btn-outline-primary"
				disabled={isSubmitting}
			>
				{isSubmitting ? 'WAIT PLIZ' : 'CLICK ME'}
			</button>
		</form>
	);
};

export default withFormik({
	mapPropsToValues: props => ({
		email: props.user.email,
		password: props.user.password
	}),

	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required!'),
		password: Yup.string().required('Please provide a valid password')
	}),

	handleSubmit: (values, { setSubmitting }) => {
		setTimeout(() => {
			// submit them do the server. do whatever you like!
			alert(JSON.stringify(values, null, 2));
			setSubmitting(false);
		}, 1000);
	}
})(UserForm);
