import React from 'react';
import UserForm from './components/UserForm'; /* Este el componente de tipo UserForm el cual en su interior tiene a formik que permite crear el formulario 
												y Yup las validaciones  */

/* Props => Estas props las defino en esta seccion para poder settear lo datos que va a recibir formik y yup para validar el envio */

const userData = {
	email: '',
	password: '',
	passwordConfirmation: ''
};
/*Fin */

const Example = props => {
	return (
		<div>
			<UserForm user={userData} />
		</div>
	);
};

export default Example;
