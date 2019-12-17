
import React, {Fragment} from "react";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";

import { session, getUrl } from "../../utils/uti";
import {connect} from 'react-redux'
import { login } from "../../redux/actions/users";

import "./header.css";

class Header extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			
		}
		
	}
	
	
	
	BotonesHeader() {
		
		if (this.props.isLoggedIn) { // si estoy logeado...
			
			return (
				
				<Fragment>
					
					<button>
						<NavLink exact to="/profile">
							Perfil
						</NavLink>
					</button>
					<button>
						<NavLink exact to="/storage">
							Mi almacén
						</NavLink>
					</button>
					<button>
						<NavLink exact to="/cart">
							Cesta
						</NavLink>
					</button>
					<button className="logoutButton" onClick={ () => this.pulsaLogout() }>
						Logout
					</button>
					
				</Fragment>
						
			)
			
			
		} else {
			
			return (
				
				<Fragment>
					
					<button>
						<NavLink exact to="/login">
							Acceder
						</NavLink>
					</button>
					<button>
						<NavLink exact to="/register">
							Registrarse
						</NavLink>
					</button>
					
				</Fragment>
						
			)		
			
		};
		
	}
	
	
	
	pulsaLogout() {
		
		let token = session.get().token;
		
		
		// Hago la llamada para borrar mi token
		axios.get(
			getUrl(`/user/logout?token=${token}`)
		);
		
		
		// Borro mis datos de sesión
		session.del();
		
		
		// Digo que no estoy logeado (con redux)
		login(false);
		
		
		// Redirección
		this.props.history.push("/");		
		
	}
	
	
	
	render() {
		
		return (
			<header>
				<div className="logo">
					
					<NavLink to="/">
						<img
							src="https://trello-attachments.s3.amazonaws.com/5de522b655e9ad63df7441fb/5def57a617949c786fc8ec01/261e294ef093b2db52c2bf6d093c2bd1/logoMonetae_3.png"
							alt="logo"
						/>
					</NavLink>
					
				</div>
				
				
				
				<div className="search">
					<input type="text" placeholder="Búsqueda" />
					<div className="backgroundIcon">
						<i className="material-icons">search</i>
					</div>
				</div>
				
				<div className="nav">
					{this.BotonesHeader()}
				</div>
				
			</header>
		);
	}
}



const mapStateToProps = (state) => { // ese state es de redux
	return ({
		isLoggedIn: state.isLoggedIn //creamos la prop user a partir de la key user del state
	})
}


export default connect(mapStateToProps) (withRouter(Header) );

// withRouter(Header) es para meter Header en el contexto de "Route" para que tenga el history y toa la movida
