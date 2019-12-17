import { session } from "../../utils/uti";

const reducer = (state = {
	isLoggedIn: !!session.get()
}, action) => {
	
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

		default:
		return state;
		
	};
	
};


export default reducer;
