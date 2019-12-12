
/*
	Almacena u obtiene los datos de sesión en el siguiente formato:
		{
			username: "",
			userId: "",
			token: "",
			userType: 0
		}
	.
	
	Ejemplos:
		session.get() 		// Devuelve el objeto con datos o NULL si NO estás logeado
		session.set({		// Metes los datos para guardar en localStorage
			username: "Icaruk",
			userId: "56785675",
			token: "8765867586745",
			userType: 0
		}) 	
	.
	
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