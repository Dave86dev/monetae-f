
import React, {Fragment} from "react";

import axios from "axios";
import getUrl from "../../utils/getUrl";

import './login.scss';


class Login extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			username: "",
			password: "",
		};
		
		// this.handleChange = this.handleChange.bind(this); // ¿para qué es esto?
		
	};
	
	 
	
	handleChange(event, key) {
		
		if (key === "username") {
			this.setState({username: event.target.value});
		} else {
			this.setState({password: event.target.value});
		};
		
	};
	
	
	pulsaLogin() {
		
		// Validación
		let username = this.state.username;
		let password = this.state.password;
		
		
		if (username === "") {
			this.muestraError("El username no puede estar vacío.");
			return;
		};
		if (password === "") {
			this.muestraError("La contraseña no puede estar vacía.");
			return;
		};
		
		
		
		// Llamada
		let url = getUrl("/users/login");
		let body = {
			username: username,
			password: password
		};
		
		console.log( url, body );
		
		axios.post(url, {})
		.then( (res) => {
			
			console.log( res );
			
		}).catch ( (err) => {
			
			console.log( err );
			
		});
		
		
		// axios.get( getUrl("/rating/all") ).then( (res) => {
		// 	console.log( res )
		// }).catch ( (err) => {
		// 	console.log( err );
		// });
		
		
		
	};
	
	
	muestraError(str, className = "error") {
		
		// Aquí irá lo que rellena el texto de error
		console.log( str, className );
		
	}
	
	
	
	render() {
		return(
			<div className="loginMain">
				<div className="loginCard">
					<div className="header">
						<img className="image"
							src="https://trello-attachments.s3.amazonaws.com/5de522b655e9ad63df7441fb/5def57a617949c786fc8ec01/261e294ef093b2db52c2bf6d093c2bd1/logoMonetae_3.png"
							alt="logo"
						/>
						<h1>Login</h1>
					</div>
					<div className="body">
						
						<input
							type="text"
							placeholder="username or email"
							onChange={ (ev) => {this.handleChange(ev, "username")} }
						></input>
						
						<input
							type="text"
							placeholder="password"
							onChange={ (ev) => {this.handleChange(ev, "password")} }
						></input>
						
						<button onClick={ () => this.pulsaLogin() }>Login</button>
						
					</div>
				</div>
			</div>
		);
	};
	
	
};


export default Login;