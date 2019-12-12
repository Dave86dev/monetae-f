
import React from "react";

import axios from "axios";
import getUrl from "../../utils/getUrl";
import {session} from "../../utils/session";

import './login.scss';



class Login extends React.Component {
	
	constructor (props) {
		super(props);
		 
		this.state = {
			username: "",
			password: "",
			
			message: "",
			errorTime: 0,
			messageClassName: "error",
		};
		
		// this.handleChange = this.handleChange.bind(this); // esto es para que el this de la función clásica pille el de la instancia de la clase Login y no otra
		
	};
	
	
	
	handleChange(event, key) {
		
		this.setState({
			[key]: event.target.value
		});
		
	};
	
	
	
	async pulsaLogin() {
		
		// Validación
		let username = this.state.username;
		let password = this.state.password;
		
		
		if (username === "") {
			this.muestraError("El usuario / email no puede estar vacío.");
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
			
			let res = await axios.post( getUrl("/user/login"), body);
			
			
			
			// Guardo datos de sesión
			session.set({
				username: res.username,
				userId: res.userId,
				token: res.token,
				userType: res.userType
			});
			
			
			// Muestro
			this.muestraError("Accediendo...", null, false);
			
			
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
	
	
	
	muestraError (message, timeout = 3, isError = true) {
		
		// Pongo la clase
		let className = isError ? "error" : "success";
		this.setState({messageClassName: className});
		
		
		// Pongo el mensaje
		this.setState({message: message});
		
		
		// Ya estoy en loop
		if (this.state.errorTime > 0) {
			this.setState({errorTime: timeout});
			return; // y salgo
		};
		
		
		this.setState({errorTime: timeout}); // Entro por primera vez, pongo tiempo
		
		
		// Loop
		let loop = setInterval( ()=> {
			
			if (this.state.errorTime <= 0) {
				this.setState({message: ""});
				clearInterval(loop); // salgo del loop
			};
			
			
			this.setState( preState => ( {errorTime: preState.errorTime - 1}) );
			
		}, 1000);
		
	};
	
	
	
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
							placeholder="Usuario / email"
							onChange={ (ev) => {this.handleChange(ev, "username")} }
						></input>
						
						<input
							type="password"
							placeholder="Contraseña"
							onChange={ (ev) => {this.handleChange(ev, "password")} }
						></input>
						
						<button onClick={ () => this.pulsaLogin() }>Entrar</button>
						
						<p className={this.state.messageClassName}> {this.state.message} </p>
						
					</div>
				</div>
			</div>
		);
	};
	
	
};


export default Login;