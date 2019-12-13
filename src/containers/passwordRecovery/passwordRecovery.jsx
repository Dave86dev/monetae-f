
import React from "react";
import axios from "axios";

import { session, getUrl } from "../../utils/uti";


class PasswordRecovery extends React.Component {
	
	constructor (props) {
		super(props);
		
		
		this.state = {
			secretQuestion: "",
			secretAnswer: ""
		}
		
	};
	
	
	
	getUserSecret() {
		
		let sessionData = session.get();
		
		// console.log( sessionData.userId );
		
		if (! sessionData) {
			console.log( "Error: No estás logeado." );
			return;
		}
		
		// const { userId, token } = session.get();
		
		// console.log( userId, token );
		
		
		axios.get(
			getUrl("/user/passwordRecovery")
		).then( (res) => {
			
			console.log( res );
			
		}).catch( (err) => {
			console.log( err );
		});
		
	};
	
	
	render() {
		
		this.getUserSecret();
		
		
		return(
			<div>
				Soy el componente PasswordRecovery
			</div>
		);
	};
	
	
};


export default PasswordRecovery;