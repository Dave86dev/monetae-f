
import React, {Fragment} from "react";

import './register.scss';


class Register extends React.Component {
	

	
	render() {
		return(
			<div className="registerMain">

				<div className="registerCard">
					<h2>Account</h2>
					<div className="registerCardAcc">
                        <input className="inputRegister" type="text" placeholder="username"></input>
                        <input className="inputRegister" type="text" placeholder="email"></input>
                        <input className="inputRegister" type="text" placeholder="password"></input>
                        <input className="inputRegister" type="text" placeholder="password"></input>
                        <input className="inputRegister" type="text" placeholder="Secret Question"></input>
                        <input className="inputRegister" type="text" placeholder="Secret Answer"></input>
                    </div>
                    <h2>Personal</h2>
                    <div className="registerCardPer">

                    </div>
                    <h2>Billing</h2>
                    <div className="registerCardBil">

                    </div>
						{/* <input type="text" placeholder="username or email"></input>
						<input type="text" placeholder="password"></input>
						<button>Login</button> */}
					
				</div>

			</div>
		);
	};
	
	
};


export default Register;