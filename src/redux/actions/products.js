import store from "../store"


export const rdx_productDetail = (productData) => {
    store.dispatch({
		type: 'PRODUCT_DETAIL',
		payload: productData
	})
};


export const rdx_productSearchResults = (productSearchResults) => {
    store.dispatch({
		type: 'PRODUCT_SEARCH',
		payload: productSearchResults
	})
};

