
// Import de todo:
// import { session, getUrl } from "./utils/session"

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
		return localStorage.getItem("sessionData");
	},
	
	set: (data) => {
		localStorage.setItem ("sessionData", data);
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