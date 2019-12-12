
import React from "react";

import axios from "axios";
import getUrl from "../../utils/getUrl";

import './login.scss';



class Login extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			username: "",
			password: "",
			
			message: "asd",
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
	
	
	async pulsaLogin() {
		
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
		
		
		
		try {
			
			// Llamada
			let body = {
				username: username,
				password: password
			};
			
			console.log( "Esperando..." );
			
			let res = await axios.post( getUrl("/user/login"), body);
			
			console.log( res.data );
					
		} catch (err) {
			
			let res = err.response.data;
			
			
			if (res.errorCode === "user_login_1") {
				this.muestraError("Usuario no encontrado o contraseña incorrecta.");
				return;
			};
			if (res.errorCode === "user_login_2") {
				this.muestraError("Ya estabas logeado.");
				return;
			};
			
		};
		
		
		
	};
	
	
	muestraError(str, className = "error") {
		this.setState({message: str});
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
						<h1>Acceder</h1>
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
						
						<button onClick={ () => this.pulsaLogin() }>Entrar</button>
						
						<p>{this.state.message}</p>
						
					</div>
				</div>
			</div>
		);
	};
	
	
};


export default Login;