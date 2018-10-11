import React, { Component } from 'react';
import {
	Navbar,
	Nav,
	MenuItem,
	NavbarCollapse,
	NavItem,
	NavDropdown
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import config from '../../../../services/config';

//const data = localStorage.getItem("user");

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}

	// no tengo tanta seguridad en este metodo, pues esto trayendo el dato desde el localstorage pero no recorro
	// la data del user en el response del post login
	componentDidMount() {
		this.setState({
			data: JSON.parse(localStorage.getItem('user'))
		});
	}

	render() {
		let user = this.state.data;
		return (
			<Navbar collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#/dashboard/">Test Api Carlos</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<NavItem eventKey={1} href="#/user/addcontact">
							Registrar Contactos
						</NavItem>
					</Nav>
					<Nav pullRight>
						<NavItem> {user} </NavItem>
						<NavItem eventKey={2} href="#/logout">
							Cerrar sesion
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default NavBar;
