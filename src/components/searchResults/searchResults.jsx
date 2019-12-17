
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { rdx_product } from "../../redux/actions/products";
import { getUrl } from "../../utils/uti";

import "./searchResults.scss";


class SearchResults extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			productList: [],
			
		}
		
	};
	
	
	
	componentDidMount() {
		
		axios.get(
			getUrl("/product/all")
		).then( (res) => {
			
			this.setState({productList: res.data});
			
		}).catch( (err) => {
			console.log( err );
		});
		
	};
	
	
	pulsaResultado(productData) {
		
		// Guardo en redux
		rdx_product(productData);
		
		
		// Redirijo
		this.props.history.push("/detail");
		
	};
	
	
	
	muestraResultados() {
		
		return (
			<Fragment>
				{
					this.state.productList.map(_x => {
						return (
							<div
								className="card"
								key={_x._id}
								onClick={ () => { this.pulsaResultado(_x)} }
							>
								<div className="cardHeader">
									<img className="cardImage" src={_x.imageUrl[0]} alt="producto"/>
								</div>
								
								<div className="cardBody">
									<h1 className="cardPrice">{_x.price} €</h1>
									<h2 className="cardTitle">{_x.title}</h2>
									<p className="cardDescription">
										{_x.description}
									</p>
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
				<div className="mainResults">
					{this.muestraResultados()}
					
					{/* TEMPLATE */}
					{/* <div className="card">
						<div className="cardHeader">
							<img className="cardImage" src="https://www.ikea.com/es/es/images/products/ivar-chair-pine__0728155_PE736115_S5.JPG?f=s" alt="producto"/>
						</div>
						
						<div className="cardBody">
							<h1 className="cardPrice">99.999 €</h1>
							<h2 className="cardTitle">Silla nomal y corriente</h2>
							<p className="cardDescription">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati non, vitae ex dolore officiis consequatur? Alias, commodi repellendus tenetur soluta mollitia, non quidem, possimus necessitatibus quisquam omnis totam aut consequuntur.
								asdadsLorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis porro, amet recusandae eum delectus commodi in deleniti similique fuga unde quod cum sed, voluptatem quia, quisquam soluta dolores. Autem, beatae.
							</p>
						</div>
					</div> */}
					
				</div>		
			</div>
			
		);
	}
}


// const mapStateToProps = (state) => { // ese state es de redux
// 	return ({
// 		productData: state.productData // creamos la prop clickedResult a partir de la key clickedResult del state
// 	})
// }


export default /*connect(mapStateToProps)*/ (withRouter(SearchResults));

// withRouter(SearchResults) es para meter Header en el contexto de "Route" para que tenga el history y toa la movida
