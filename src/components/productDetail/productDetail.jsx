
import React from "react";
import "./productDetail.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


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
	
	
	componentDidMount() {
		this.setState({ quantity: 1 });
	}
	
	
	
	render() {
		
		return (
			<div className="productDetailMain">
				
				<div className="images">
					<img className="img" src={this.props.productData.imageUrl[0]} alt=""/>
					
					<div className="gallery">
						<img className="miniImg" src={this.props.productData.imageUrl[0]} alt=""/>
						<img className="miniImg" src={this.props.productData.imageUrl[1]} alt=""/>
						<img className="miniImg" src={this.props.productData.imageUrl[2]} alt=""/>
						<img className="miniImg" src={this.props.productData.imageUrl[3]} alt=""/>
					</div>
					
				</div>
				
				
				
				<div className="detail">
					<h2 className="title">{this.props.productData.title}</h2>
					<p className="seller">Vendido por: <a href="/">Pepe</a> </p>
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
					
					<button className="purchaseButton">Añadir al carrito</button>
					<button className="purchaseButton">Comprar</button>
				</div>
				
			</div>
		);
	};
	
	
};



const mapStateToProps = (state) => { // ese state es de redux
	return ({
		productData: state.productData
	})
}


export default connect(mapStateToProps) (withRouter(ProductDetail));
