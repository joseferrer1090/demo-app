import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import decode from 'jwt-decode'; // libreria para la verificacion del token que se va a guardar en el localstorage
import Login from './src/components/Session/Login/Login';
import Register from './src/components/Session/Register/Register';
import Logout from './src/components/Session/Logout/Logout';
import Dashboard from './src/components/Dashboard/Dashboard';
import AddContact from './src/components/Dashboard/components/Contacts/Contacts';
import Aux from './src/hoc/Aux'; //
import ErrorPage from './src/errorpages/404/ErrorPage404';
import Test from './src/components/Session/Register/Register2';
import Example from './src/components/Session/Register/example';

// Este metodo funciona para poder verificar si lo que se encuentra en localstorage es un token,
// se encuentra encapsulado en un try - catch para el manejor de los errores, Previamente se debe instalar
// jwt-decode --> con npm. y se ejecuta llamando al decode + el token asignado a una const donde se guarda el localstorage que viene desde el api

const isAuthenticated = () => {
	const token = localStorage.getItem('auth_token');
	try {
		decode(token);
	} catch (error) {
		return false;
	}
	return true;
};

// Este es un Componente que va a utilizar la props de una route para poder renderizar el component protejido
// Se utiliza el Redirect para poder redirigir en caso que el metodo isAuthenticated falle "no este el token en el localStorage"
// auth_token

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/login'
					}}
				/>
			)
		}
	/>
);

/* En esta section crea las url del proyecto para poder utilizar el objeto PrivateRoute, el cual va a tener 
cada una de las propiedad de una route */

export default () => (
	<HashRouter>
		<Switch>
			<Route exact path="/" component={Login} />
			<Route exact path="/register" component={Example} />
			{/* <Route exact path="/register2" component={Example} /> */}
			<Route exact path="/login" component={Login} />
			<Route exact path="/logout" component={Logout} />
			{/* Seccion de rutas protected */}
			<PrivateRoute path="/dashboard" component={Dashboard} />
			<PrivateRoute
				exact
				strict
				path="/user/addcontact"
				component={AddContact}
			/>
			{/* Fin */}
			<Route component={ErrorPage} />
		</Switch>
	</HashRouter>
);
