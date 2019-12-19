import { session } from "../../utils/uti";

const reducer = (
	
	state = {
		isLoggedIn: !!session.get(),
		cart: [],
	},
	action
	
) => {
	
	switch (action.type) {
		
		case "LOGIN":
		return {
			...state,
			isLoggedIn: action.payload
		};
		
		case "PRODUCT_DETAIL":
		return {
			...state,
			productData: action.payload
		};
		
		case "PRODUCT_SEARCH":
		return {
			...state,
			productSearchResults: action.payload
		};
		
		
		
		/*
			- Estructura de la var cart:
			
				cart = {
					_id1 (STRING): productData1 (OBJECT),
					_id2 (STRING): productData2 (OBJECT),
					_id3 (STRING): productData3 (OBJECT)
				}
			
			- Ejemplo de cesta con 1 producto:
			
				cart = {
					"5dfa147e77dce6183442fb6a": {
						"cartQuantity": 1, ( ---> Esto no forma parte de los datos del producto, se añade para la cesta)
						"category": [
							"hog"
						],
						"imageUrl": [
							"https://www.ikea.com/es/es/images/products/martin-chair__0729762_PE737129_S5.JPG",
							"https://www.ikea.com/es/es/images/products/martin-chair__0518625_PE641105_S5.JPG",
							"https://www.ikea.com/es/es/images/products/martin-chair__0518626_PE641104_S5.JPG",
							""
						],
						"description": "Es blanca y sirve para sentarse.\n\nSe pueden apilar para ahorrar espacio cuando no las utilizas.\n\nLos pies autorregulables aportan estabilidad a la silla.\n\nPara mayor estabilidad, vuelve a apretar los tornillos unas dos semanas después del montaje y cuando sea necesario.",
						"price": 15,
						"timesSold": 0,
						"rating": 0,
						"stock": 200,
						"activeStock": 150,
						"location": "Ikea",
						"isActive": true,
						"_id": "5dfa147e77dce6183442fb6a",
						"ownerId": "5df36b3d4acf8b057cac678a",
						"title": "Silla blanca normal",
						"__v": 0
						}				
					}
				}
				
			NOTA: La key del product es lo mismo que su _id.
			
		*/
		
		case "CART_ADD":
		return {
			...state,
			cart:{
				... state.cart,
				[action.payload._id]: action.payload
			}
		};
		
		case "CART_REMOVE":
			console.log( "AAA: ", state.cart );
			delete state.cart[action.payload._id];
			console.log( "BBB: ", state.cart );
		return {
			...state,
			cart: state.cart
		};
		
		default:
		return state;
		
	};
	
};


export default reducer;
