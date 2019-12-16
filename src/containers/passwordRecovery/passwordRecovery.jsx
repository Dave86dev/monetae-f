
import React from "react";
import axios from "axios";
import bcrypt from "bcryptjs";

import { getUrl, muestraError } from "../../utils/uti";


import "./passwordRecovery.scss";


class PasswordRecovery extends React.Component {
	
	constructor (props) {
		super(props);
		
		
		this.state = {
			
			username: "",
			
			secretQuestion: "",
			userAnswer: "",
			
			password: "",
			password2: "",
			
			message: "",
			errorTime: 0,
			messageClassName: "error",			
			
		}
		
	};
	
	
	
	handleChange(event, key) {
		
		this.setState({
			[key]: event.target.value
		});
		
	};	
	
	
	
	pulsaContinuar1() {
		
		if (this.state.username === "") {
			console.log( "Username / email no puede estar vacio" );
			return;
		};
		
		
		axios.post(
			getUrl("/user/forgotPassword1"), 
			{
				"username": this.state.username
			}
		).then( (res) => {
			
			let data = res.data;
			
			this.setState({
				secretQuestion: data.secretQuestion
			});
			
		}).catch( (err) => {
			
			console.log( "ERR: ", err.response.data );
			
		});
		
	};
	
	
	
	async pulsaContinuar2() {
		
		if (this.state.password !== this.state.password2) {
			console.log( "Contraseñas diferentes" );
			return;
		};
		
		
		try {
			
			// Encripto pass
			const encryptedPass = await bcrypt.hash(this.state.password, 10);
			
			
			// Llamo
			await axios.post(
				getUrl("/user/forgotPassword2"), 
				{
					"username": this.state.username,
					"userAnswer": this.state.userAnswer,
					"newPassword": encryptedPass
				}
			);
			
			
			
			muestraError("Tu contraseña ha sido cambiada. Redireccionando al login...", null, false);
			
		} catch (error) {
			
			muestraError(error.response?.data);
			
		};
		
	};
	
	
	
	render() {
		
		if (this.state.secretQuestion === "") {
			
			return(
				<div className="main mainPasswordRecovery">
					<div className="card">
						<div className="cardHeader">
							<h1 className="cardTitle"> Paso 1/2 </h1>
						</div>
						<div className="cardBody">
							<input type="text" placeholder="Usuario / email" onChange={ (ev) => {this.handleChange(ev, "username")} } />
							<button onClick={ () => {this.pulsaContinuar1()} }>Continuar</button>
							
							<p className={this.state.messageClassName}> {this.state.message} </p>
						</div>
					</div>
				</div>
			);			
			
		} else {
			
			return(

				<div className="main mainPasswordRecovery">
					<div className="card">
						<div className="cardHeader">
							<h1 className="cardTitle"> Paso 2/2 </h1>
						</div>
						<div className="cardBody">
							<input type="text" placeholder="Esperando pregunta secreta..." value={this.state.secretQuestion} disabled />
							<input type="text" placeholder="Respuesta" onChange={ (ev) => {this.handleChange(ev, "userAnswer")} } />
							<input type="text" placeholder="Nueva contraseña" onChange={ (ev) => {this.handleChange(ev, "password")} } />
							<input type="text" placeholder="Repite nueva contraseña" onChange={ (ev) => {this.handleChange(ev, "password2")} } />
							
							<button onClick={ () => {this.pulsaContinuar2()} }>Cambiar contraseña</button>
						</div>
					</div>
				</div>
				
			)
			
		}

	};
	
	
};


export default PasswordRecovery;