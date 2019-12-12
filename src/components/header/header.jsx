import React from "react";
import { NavLink } from "react-router-dom";

import "./header.css";

class Header extends React.Component {
	// constructor(props) {
	// 	super(props);
	// }
	
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
					<button>
						<NavLink exact activeClassName="active" to="/login">
							Login
						</NavLink>
					</button>
					<button>
						<NavLink exact activeClassName="active" to="/register">
							Register
						</NavLink>
					</button>
				</div>
				
			</header>
		);
	}
}

export default Header;
