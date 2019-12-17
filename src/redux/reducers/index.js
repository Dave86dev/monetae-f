
const reducer = (state = {}, action) => {
	
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

		default:
		return state;
		
	};
	
};


export default reducer;
