
import React, {Fragment} from "react";

import './register.scss';


class Register extends React.Component {
	

	
	render() {
		return(
			<div className="registerMain">

				<div className="registerCard">
					<h2>Account</h2>
					<div className="registerCardInfoA">
                        <input className="inputRegister" type="text" placeholder="username"></input>
                        <input className="inputRegister" type="text" placeholder="email"></input>
                        <input className="inputRegister" type="text" placeholder="password"></input>
                        <input className="inputRegister" type="text" placeholder="password"></input>
                        <input className="inputRegister" type="text" placeholder="Secret Question"></input>
                        <input className="inputRegister" type="text" placeholder="Secret Answer"></input>
                    </div>
                    <h2>Personal</h2>
                    <div className="registerCardInfoB">
                        <input className="inputRegister" type="text" placeholder="Address"></input>
                        <input className="inputRegister" type="text" placeholder="Phone"></input>
                        <input className="inputRegister" type="text" placeholder="City"></input>
                        <input className="inputRegister" type="text" placeholder="Country"></input>
                    </div>
                    <h2>Billing</h2>
                    <div className="registerCardInfoB">
                        <input className="inputRegister" type="text" placeholder="Paypal"></input>
                        <input className="inputRegister" type="text" placeholder="Card Number"></input>
                        <input className="inputRegister" type="text" placeholder="Expire Date"></input>
                        <input className="inputRegister" type="text" placeholder="Card Owner"></input>
                    </div>
						
				</div>

			</div>
		);
	};
	
	
};


export default Register;