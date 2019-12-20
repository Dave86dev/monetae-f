
import React, { Fragment } from "react";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./cesta.scss";

import store from "../../redux/store";
import { rdx_productDetail } from "../../redux/actions/products";
import { minMax } from "../../utils/uti";



class Cesta extends React.Component {
	
	// constructor (props) {
	// 	super(props);
	// };
	
	
	
	pulsaResultado(productData) {
		
		// Guardo en redux
		rdx_productDetail(productData);
		
		
		// Redirijo
		this.props.history.push(`/detail?id=${productData._id}`);
		
	};
	
	
	
	pulsaBotonMasMenos(_id, cantidad) {
		
		// Busco si ya existe en el carrito
		const encontrado = this.props.cart.find(_x => _x._id === _id);
		
		
		// No se ha encontrado, salgo
		if (! encontrado) {
			console.log( "ERROR CESTA: no existe el producto que se está editando" );
			return;
		};
		
		
		let nuevaCantidad = minMax( encontrado.cartQuantity + cantidad, 0, 100 ); // sumo o resto cantidad
		// encontrado.cartQuantity = nuevaCantidad;  // se la pongo
		
		
		// Estoy aplicando cantidad 0, llamo a borrar
		if (nuevaCantidad === 0) {
			
			console.log( "borrando" );
			
			store.dispatch({
				type: 'CART_REMOVE',
				payload: encontrado._id
			});
			
			return;
		};
		
		
		// Envío a redux
		store.dispatch({
			type: 'CART_EDIT',
			payload: {
				_id: encontrado._id,
				newQuantity: nuevaCantidad
			}
		});
		
	}
	
	
	
	muestraResultados() {
		
		return (
			<Fragment>
				{
					this.props.cart.map(_x => {
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
export default connect(mapStateToProps) (Cesta);