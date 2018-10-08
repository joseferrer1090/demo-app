import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from './src/components/Session/Login/Login';
import Register from './src/components/Session/Register/Register';
import Logout from './src/components/Session/Logout/Logout';
import Dashboard from './src/components/Dashboard/Dashboard';
import AddContact from './src/components/Dashboard/components/Contacts/Contacts';
import Aux from './src/hoc/Aux';
import ErrorPage from './src/errorpages/404/ErrorPage404';

const token = localStorage.getItem('auth_token');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedin: false
		};
	}
	// antes de que que se monte el DOM
	componentWillMount() {
		console.log(' ', token);
		if (token === null) {
			console.log(this.state.loggedin);
		} else if (token != null) {
			this.setState({
				loggedin: true
			});
		}
	}

	render() {
		console.log('render');
		return (
			<HashRouter>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/register" component={Register} />
					{/*<Route exact path="/dashboard" component={Dashboard} />*/}
					<Route
						path="/dashboard/"
						render={() => {
							if (!this.state.loggedin) {
								console.log('false');
							} else {
								return null;
							}
						}}
					/>
					<Route exact path="/dashboard/addcontact" component={AddContact} />
					<Route component={ErrorPage} />
				</Switch>
			</HashRouter>
		);
	}
}

export default App;
