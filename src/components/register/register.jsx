
import React from "react";

import './register.scss';


class Register extends React.Component {
	

	
	render() {
		return(
			<div className="registerMain">

				<div className="registerCard">
					<h2>Cuenta</h2>
					<div className="registerCardInfoA">
                        <input className="inputRegister" type="text" placeholder="nombre"></input>
                        <input className="inputRegister" type="text" placeholder="email"></input>
                        <input className="inputRegister" type="text" placeholder="password"></input>
                        <input className="inputRegister" type="text" placeholder="password"></input>
                        <input className="inputRegister" type="text" placeholder="Pregunta secreta"></input>
                        <input className="inputRegister" type="text" placeholder="Respuesta secreta"></input>
                    </div>
                    <h2>Personal</h2>
                    <div className="registerCardInfoB">
                        <input className="inputRegister" type="text" placeholder="Dirección"></input>
                        <input className="inputRegister" type="text" placeholder="Teléfono"></input>
                        <input className="inputRegister" type="text" placeholder="Ciudad"></input>
                        <input className="inputRegister" type="text" placeholder="País"></input>
                        <select className="registerDropdown">
						    	<option value="1">Cliente</option>
						    	<option value="2">Vendedor</option>
						</select>
					</div>
                    <h2>Facturación</h2>
                    <div className="registerCardInfoB">
                        <input className="inputRegister" type="text" placeholder="Número tarjeta"></input>
                        <input className="inputRegister" type="text" placeholder="Nombre propietario"></input>
                        <input className="inputRegister" type="text" placeholder="Mes caducidad"></input>
                        <input className="inputRegister" type="text" placeholder="Año caducidad"></input>
                        <input className="inputRegister" type="text" placeholder="Paypal"></input>
                    </div>
					{/* <h3>Warning placeholder text</h3> */}
                    <button>Registrar</button>
				</div>

			</div>
		);
	};
	
	
};


export default Register;