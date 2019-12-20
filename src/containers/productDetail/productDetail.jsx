
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Slider from "../../components/slider/slider";
import store from "../../redux/store";

import "./productDetail.scss";



class ProductDetail extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			quantity: 0,
			
		}
	};
	
	
	
	cambiaDropdown (ev) {
		this.setState({ quantity: ev.target.value });
	};
	
	pulsaFoto (ev, idx) {
		document.querySelector(".img").src = this.props.productData.imageUrl[idx];
	};
	
	meteCesta (_id) {
		
		// Clono el objeto del producto
		let productData = {...this.props.productData};
		
		
		// Busco si ya existe en el carrito
		const encontrado = this.props.cart.find(_x => _x._id === productData._id);
		
		if (! encontrado) { // NO existe ese producto
			
			productData.cartQuantity = +this.state.quantity; // pongo cantidad
			
			
			// Envío a redux
			store.dispatch({
				type: 'CART_ADD',
				payload: productData // OBJ con la info del producto
			});	
			
		} else { // ya existía
			
			let newQuantity = encontrado.cartQuantity + +this.state.quantity; // sumo cantidad
			
			
			// Envío a redux
			store.dispatch({
				type: 'CART_EDIT',
				payload: {
					_id: productData._id,
					newQuantity: newQuantity
				}
			});
			
		};
		
	}
	
	
	componentDidMount() {
		
		// Guardo la última categoría que he mirado
		localStorage.setItem("categoriaBuscada", this.props.productData.category);
		
		
		if (! this.props.productData) { // no tengo el prop
			// Llamar a axios pidiendo info del producto con la _id:
			// this.props.match.params
		};
		
		
		this.setState({ quantity: 1 }); // pongo la cantidad 1 por defecto
		
	}
	
	componentDidUpdate () {
		//Quito la clase hide a todos para reinicializar.
		for (let i= 1; i<4; i++){
			document.querySelector("#img" + i).classList.remove("hide");
		} 
		
		//Se la pongo en caso de que la url tenga el valor "".
		for (let i= 1; i<4; i++){
			if(this.props.productData.imageUrl[i] === ""){
				document.querySelector("#img" + i).classList.add("hide");
			}
		}
	}
	
	render() {
		
		return (
			
			<div className="productDetailMain">
				{
					this.props.productData &&
					<div className="productDetail">
					
						<div className="images">
							<div className="bigImage br">
								<img className="img" src={this.props.productData.imageUrl[0]} alt=""/>
							</div>
							
							<div className="gallery">
								<img className="miniImg" id="img0" onClick={ (ev) => this.pulsaFoto(ev, 0) } src={this.props.productData.imageUrl[0]} alt=""/>
								<img className="miniImg" id="img1" onClick={ (ev) => this.pulsaFoto(ev, 1) } src={this.props.productData.imageUrl[1]} alt=""/>
								<img className="miniImg" id="img2" onClick={ (ev) => this.pulsaFoto(ev, 2) } src={this.props.productData.imageUrl[2]} alt=""/>
								<img className="miniImg" id="img3" onClick={ (ev) => this.pulsaFoto(ev, 3) } src={this.props.productData.imageUrl[3]} alt=""/>
							</div>
							
						</div>
						
						
						
						<div className="detail">
							<h2 className="title">{this.props.productData.title}</h2>
							<p className="seller">Vendedor: <a href="/">{this.props.productData.ownerId}</a> </p>
							<p className="sellerRating">
								<img className="ratingStar" src="/img/star.png" alt=""/>
								<img className="ratingStar" src="/img/star.png" alt=""/>
								<img className="ratingStar" src="/img/star.png" alt=""/>
								<img className="ratingStar" src="/img/star_half.png" alt=""/>
								<img className="ratingStar" src="/img/star_disabled.png" alt=""/>
							</p>
							<h1 className="price">{this.props.productData.price} €</h1>
							<p className="description">
								{this.props.productData.description}
							</p>
						</div>
						
						
						
						<div className="purchase">
							<h1 className="price">{this.state.quantity * this.props.productData.price } €</h1>
							
							<p></p>
							
							<div
								className="cajaDropdown"
								onChange={ (ev) => this.cambiaDropdown(ev) }
							>
								
								<p>Cantidad: </p>
								<select>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
									<option value="10">10</option>
								</select>
								
							</div>
							
							<button className="purchaseButton" onClick={ () => {this.meteCesta(this.props.productData._id)} }>Añadir a la cesta</button>
							<button className="purchaseButton">Comprar</button>
						</div>
					</div>
				}
				
				
				<Slider url={`/product/category?cat=${this.props.productData?.category}&excludeId=
				${this.props.productData?._id}&limit=25`} />
				
			</div>
		);
	};
	
	
};



const mapStateToProps = (state) => { // ese state es de redux
	return ({
		productData: state.productData,
		cart: state.cart
	})
}


export default connect(mapStateToProps) (withRouter(ProductDetail));
