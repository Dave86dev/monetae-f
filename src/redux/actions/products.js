import store from "../store"


export const rdx_product = (productData) => {
    store.dispatch({
		type: 'PRODUCT_DETAIL',
		payload: productData
	})
};

