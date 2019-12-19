
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./cesta.scss";

import store from "../../redux/store";
import { rdx_productDetail } from "../../redux/actions/products";
import { minMax } from "../../utils/uti";



class Cesta extends React.Component {
	
	constructor (props) {
		super(props);
		
	};
	
	
	pulsaResultado(productData) {
		
		// Guardo en redux
		rdx_productDetail(productData);
		
		
		// Redirijo
		this.props.history.push(`/detail?id=${productData._id}`);
		
	};
	
	
	pulsaBotonMasMenos(_id, n) {
		
		const cart = {...this.props.cart}; // clono todo el obj de redux
		let nuevaId = _id;
		
		
		let nuevaCantidad = 0;
		
		if (cart[nuevaId]) { // existe ese producto
			
			nuevaCantidad = minMax( cart[nuevaId].cartQuantity + n, 0, 100 ); // sumo o resto cantidad
			cart[nuevaId].cartQuantity = nuevaCantidad;  // se la pongo
			
		} else {
			console.log( "ERROR CESTA: no existe el producto que se está editando" );
			return;
		};
		
		
		// Estoy aplicando cantidad 0, llamo a borrar
		if (nuevaCantidad === 0) {
			
			console.log( "borrando" );
			
			store.dispatch({
				type: 'CART_REMOVE',
				payload: cart[nuevaId]
			});
			
			
			return;
		};
		
		
		// Envío a redux
		store.dispatch({
			type: 'CART_ADD',
			payload: cart[nuevaId]
		});		
		
	}
	
	
	componentDidUpdate() {
		this.render();
	}
	
	
	
	
	muestraResultados() {
		
		let objCart = this.props.cart;
		let arrCart = [];
		
		
		// Paso de objeto a array
		for (let _x of Object.keys(objCart)) {
			arrCart.push(objCart[_x])
		};
		
		
		
		return (
			<Fragment>
				{
					arrCart.map(_x => {
						return (
							<div
								className="card"
								key={_x._id}
							>
								<div className="cardHeader">
									<img
										className="cardImage"
										src={_x.imageUrl[0]}
										alt="producto"
										onClick={ () => { this.pulsaResultado(_x)} }
									/>
								</div>
								
								<div className="cardBody">
									<h1 className="cardPrice">{_x.price} €</h1>
									<h2 className="cardTitle">{_x.title}</h2>
									
								</div>
								
								<div className="cajaCantidad">
									<button className="botonMenos" onClick={() => {this.pulsaBotonMasMenos(_x._id, -1) } } >-</button>
									<span className="cantidad">{_x.cartQuantity}</span>
									<button className="botonMas" onClick={() => {this.pulsaBotonMasMenos(_x._id, 1) } } >+</button>
								</div>
								
							</div>
						)
						
					})
					
				}
			</Fragment>
		)
		
	}
	
	
	
	render() {
		
		return (
			<div className="mainSearch">
				<div className="mainResults pt3 pb3">
					{this.muestraResultados()}
				</div>
			</div>
			
		);
	}
}



const mapStateToProps = (state) => { // ese state es de redux
	return ({
		cart: state.cart
	})
}


export default connect(mapStateToProps) (withRouter(Cesta));