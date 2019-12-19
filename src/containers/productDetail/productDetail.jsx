
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
	
	pulsaCesta () {
		
		const cart = {...this.props.cart}; // clono todo el obj de redux
		let nuevaId = this.props.productData._id; // pillo la id del product que estamos viendo en detalle
		
		
		if (! cart[nuevaId]) { // no existe ese producto
			
			cart[nuevaId] = this.props.productData; // lo añado
			cart[nuevaId].cartQuantity = +this.state.quantity; // añado la cantidad
			
		} else { // ya existe
			
			cart[nuevaId].cartQuantity = cart[nuevaId].cartQuantity + +this.state.quantity; // sumo cantidad
			
		};
		
		
		store.dispatch({
			type: 'CART_ADD',
			payload: cart[nuevaId]
		});
		
	}
	
	
	componentDidMount() {
		
		console.log( this.props.match.params );
		
		
		if (! this.props.productData) {
			// axios
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
							
							<button className="purchaseButton" onClick={ () => {this.pulsaCesta()} }>Añadir a la cesta</button>
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
