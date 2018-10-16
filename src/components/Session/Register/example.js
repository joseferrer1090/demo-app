import React from 'react';
import UserForm from './components/UserForm';

const userData = {
	email: '',
	password: ''
};

const Example = props => {
	return (
		<div>
			<UserForm user={userData} />
		</div>
	);
};

export default Example;
