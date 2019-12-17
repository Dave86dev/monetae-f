import React, { Component } from 'react';
import './home.scss';
import axios from "axios";

import { rdx_product } from "../../redux/actions/products"
import { getUrl } from "../../utils/uti";


class Home extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			sliderData: [],
			detail: {}
		}
		
	}

	async componentDidMount () {

		try {

			const res = await axios.get(getUrl("/product/best?limit=10"));
			console.log(res.data);
			this.setState({sliderData : res.data})
			
		} catch (err) {
			console.log(err);
		};


		// let item = document.querySelector('.scrolling-wrapper-flexbox');
		

    	// //we start the mouse wheel identification movement and reference it for scroll
    	// window.addEventListener('mouse', function(e) {
		// 	if (e.deltaY > 0) {
		// 		item.scrollLeft += 100;
		// 		console.log(e);
		// 	}else {
		// 		item.scrollLeft -= 100;
		// 	}
      			
    	// });
		
	}

	imageSlider () {

		return (
			
			<div className="cardSlider">
				{
					this.state.sliderData.map(_y => {
						return (
							<div className="bestSellContainer" key={_y._id}>
								<img onClick={() => this.pulsaProducto(_y)} alt="sliderStuff" src={_y.imageUrl[0]}/>
							</div>
						)
					})
				}
			</div>
		);

	 }
	 
	 pulsaProducto (productData) {
		 
		//Guardo en redux
		rdx_product(productData);

		//Redirijo 
		this.props.history.push("/detail");

	 }

	render() {
		return (

		<div className="home">
			<div className="main">
				
					<div className="titulosMasVendidos">Los más vendidos</div>
					<div className="scrolling-wrapper-flexbox">
			
       							{this.imageSlider()}
			
					</div>
				
			</div>
		</div>
		)
	}

}

export default Home;