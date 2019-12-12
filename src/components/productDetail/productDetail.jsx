
import React, {Fragment} from "react";
import "./productDetail.css";


class ProductDetail extends React.Component {
	
	// constructor (props) {
	// 	super(props);
		
	// };
	
	render() {
		return(
			<div className="productDetailMain">
				
				<div className="images">
					<img className="img" src="https://www.ikea.com/es/es/images/products/ivar-chair-pine__0728155_PE736115_S5.JPG?f=s" alt=""/>
					
					<div className="gallery">
						<img className="miniImg" src="https://www.ikea.com/es/es/images/products/ivar-chair-pine__0728155_PE736115_S5.JPG?f=s" alt=""/>
						<img className="miniImg" src="https://www.ikea.com/es/es/images/products/ivar-chair-pine__0728155_PE736115_S5.JPG?f=s" alt=""/>
						<img className="miniImg" src="https://www.ikea.com/es/es/images/products/ivar-chair-pine__0728155_PE736115_S5.JPG?f=s" alt=""/>
						<img className="miniImg" src="https://www.ikea.com/es/es/images/products/ivar-chair-pine__0728155_PE736115_S5.JPG?f=s" alt=""/>
					</div>
					
				</div>
				
				
				
				<div className="detail">
					<h2 className="title">Silla nomal y corriente</h2>
					<p className="seller">Vendido por: <a href="/">Pepe</a> </p>
					<p className="sellerRating">
						<img className="ratingStar" src="/img/star.png" alt=""/>
						<img className="ratingStar" src="/img/star.png" alt=""/>
						<img className="ratingStar" src="/img/star.png" alt=""/>
						<img className="ratingStar" src="/img/star_half.png" alt=""/>
						<img className="ratingStar" src="/img/star_disabled.png" alt=""/>
					</p>
					<h1 className="price">99.999 €</h1>
					<p className="description">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati non, vitae ex dolore officiis consequatur? Alias, commodi repellendus tenetur soluta mollitia, non quidem, possimus necessitatibus quisquam omnis totam aut consequuntur.
						asdadsLorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis porro, amet recusandae eum delectus commodi in deleniti similique fuga unde quod cum sed, voluptatem quia, quisquam soluta dolores. Autem, beatae.
					</p>
				</div>
				
				
				
				<div className="purchase">
					<h1 className="price">99.999 €</h1>
					
					<p></p>
					
					<div className="cajaDropdown">
						
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


export default ProductDetail;