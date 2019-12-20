import React, { Component } from 'react';
import { listaCategorias } from '../../utils/uti';
import './home.scss';

import Slider from "../../components/slider/slider";


class Home extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			detail: {},
			categoriaSugerida : ""
		}
		
	}

	componentWillMount () {
		//Comprobamos si hay una categoría guardada en el localStorage.

		if(localStorage.getItem("categoriaBuscada")) {
			this.setState({ categoriaSugerida : localStorage.getItem("categoriaBuscada") });
		}else{

			//En caso de no haberla, asignamos una categoría random.

			let arrCategorias = Object.keys(listaCategorias);
		
			let lengthObj = Object.keys(listaCategorias).length;
		
			let numRand = Math.floor (Math.random() * ((lengthObj + 1) - 0) + 0);
	
			this.setState({ categoriaSugerida: arrCategorias[numRand] });
		}
	}

	async componentDidMount () {

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

	
	render() {
		return (

		<div className="home">
			<div className="mainHome">
				
					<div className="sliderProductosHome">Los más vendidos</div>
					
			
       				<Slider url="/product/best?limit=10" />
			
					
					<div className="sliderProductosHome">Los más votados</div>
				
			
					<Slider url="/product/voted?limit=10" />
			
					
					<div className="sliderProductosHome">Sugerencias para ti</div>
					
			
					<Slider url={`/product/category?cat=${this.state.categoriaSugerida}&limit=10`} />
			
			</div>
		</div>
		)
	}

}

export default Home;