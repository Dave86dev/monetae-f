
import React, {Fragment} from "react";

import './register.css';


class Register extends React.Component {
	
	constructor () {
		super();
		
	};
	
	render() {
		return(
			<div className="registerMain">

				<div className="registerCard">
					<div className="header">
						<img className="image"
							src="https://trello-attachments.s3.amazonaws.com/5de522b655e9ad63df7441fb/5def57a617949c786fc8ec01/261e294ef093b2db52c2bf6d093c2bd1/logoMonetae_3.png"
							alt="logo"
						/>
						<h1>asdfasdfasdf</h1>
					</div>
					<div className="body">
						<input type="text" placeholder="username or email"></input>
						<input type="text" placeholder="password"></input>
						<button>Login</button>
					</div>
				</div>
                
			</div>
		);
	};
	
	
};


export default Register;