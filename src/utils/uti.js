
// Import de todo:
// import * from "./utils/session"



/*
	Almacena u obtiene los datos de sesión en el siguiente formato:
		{
			username: "",
			userId: "",
			token: "",
			userType: 0
		}
	
	Import:
		import { session } from "./utils/session"
	
	Ejemplos:
		session.get(); 		// Devuelve el objeto con datos o NULL si NO estás logeado
		session.set({		// Metes los datos para guardar en localStorage
			username: "Icaruk",
			userId: "56785675",
			token: "8765867586745",
			userType: 0
		});	
	
*/

export const session = {
	
	get: () => {
		return JSON.parse( localStorage.getItem("sessionData") );
	},
	
	set: (data) => {
		localStorage.setItem ("sessionData", JSON.stringify(data) );
	},
	
	del: () => {
		localStorage.removeItem("sessionData");
	},
	
};



/*
	Forma una URL apuntando a la API.
	
	Import:
		import { getUrl } from "./utils/uti"
	
	Ejemplos:
		getUrl(); 				// Devuelve http://localhost:3000	
		getUrl("/user/login"); 	// Devuelve http://localhost:3000/user/login	
	
*/

export const getUrl = (route = "") => {
	return `http://localhost:3000${route}`
};



/*
	Muestra un mensaje de error de forma temporal.
	
	Import:
		import { muestraError } from "./utils/uti"
	
	Ejemplos:
		muestraError("Usuario no encontrado");
		muestraError("Todo bien", 2, false);
	
	Requisitos:
		1. Tener los siguientes estados declarados:
			message: "",
			errorTime: 0,
			messageClassName: "error"
		2. Poner en el HTML esto:
			<p className={this.state.messageClassName}> {this.state.message} </p>
		.
	.
*/

export const muestraError = (message, timeout = 3, isError = true) => {
	
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

