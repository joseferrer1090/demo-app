import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './src/components/Session/Login/Login';
import Register from './src/components/Session/Register/Register';
import Logout from './src/components/Session/Logout/Logout';
import Dashboard from './src/components/Dashboard/Dashboard';
import AddContact from './src/components/Dashboard/components/Contacts/Contacts';
import Aux from './src/hoc/Aux';
import ErrorPage from './src/errorpages/404/ErrorPage404';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		};
	}

	render() {
		return (
			<HashRouter>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/dashboard/addcontact" component={AddContact} />
					<Route component={ErrorPage} />
				</Switch>
			</HashRouter>
		);
	}
}

export default App;
