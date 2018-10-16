import React, { Component } from 'react';
import Navbar from './components/NavBar/NavBar';
import SweetAlert from 'react-bootstrap-sweetalert';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataUSer: JSON.parse(localStorage.getItem('user')),
			show: false,
			modalTitle: '',
			message: ''
		};
	}

	componentWillMount() {
		if (this.state.dataUSer != null) {
			this.setState({
				show: true,
				modalTitle: 'Bienvenido',
				message: this.state.dataUSer
			});
		} else {
			null;
		}
	}

	closeSweet = () => {
		this.setState({
			show: false
		});
	};

	render() {
		return (
			<div>
				<Navbar />
				<SweetAlert
					custom
					showCancel={false}
					showConfirm={true}
					confirmBtnText="ok"
					confirmBtnBsStyle="success"
					show={this.state.show}
					title={this.state.modalTitle}
					onConfirm={() => this.closeSweet()}
				>
					{' '}
					{this.state.message}
				</SweetAlert>
				<div className="container">
					<div className="row">
						<div className="col-md-8 col-md-offset-2">
							<div className="jumbotron">
								<h4>Dashbard Example</h4>
								<p> {this.state.dataUSer} </p>
								<p>Probando el API</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Dashboard;
