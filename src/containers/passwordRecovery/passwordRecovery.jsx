
import React from "react";
import axios from "axios";
import bcrypt from "cryptjs";

import { getUrl } from "../../utils/uti";


class PasswordRecovery extends React.Component {
	
	constructor (props) {
		super(props);
		
		
		this.state = {
			
			username: "",
			
			secretQuestion: "",
			userAnswer: "",
			
			password: "",
			password2: "",
			
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
			let res = axios.post(
				getUrl("/user/forgotPassword2"), 
				{
					"username": this.state.username,
					"userAnswer": this.state.userAnswer,
					"newPassword": encryptedPass
				}
			);
			
			let data = res.data;
			console.log( data );
			
			
		} catch (error) {
			
			console.log( error );
			
		};
		
	};
	
	
	
	render() {
		
		if (this.state.secretQuestion === "") {
			
			return(
				<div>
					<h1>fase1</h1>
					<input type="text" placeholder="Usuario / email" onChange={ (ev) => {this.handleChange(ev, "username")} } />
					<button onClick={ () => {this.pulsaContinuar1()} }>Continuar</button>
				</div>
			);			
			
		} else {
			
			return(
				
				<div>
					<h1>fase2</h1>
					<input type="text" placeholder="Esperando pregunta secreta..." value={this.state.secretQuestion} />
					<input type="text" placeholder="" onChange={ (ev) => {this.handleChange(ev, "userAnswer")} } />
					<input type="text" placeholder="Nueva contraseña" onChange={ (ev) => {this.handleChange(ev, "password")} } />
					<input type="text" placeholder="Repite nueva contraseña" onChange={ (ev) => {this.handleChange(ev, "password2")} } />
					
					<button onClick={ () => {this.pulsaContinuar2()} }>Cambiar contraseña</button>
				</div>
				
			)
			
		}

	};
	
	
};


export default PasswordRecovery;