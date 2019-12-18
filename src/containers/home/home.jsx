import React, { Component } from 'react';
import './home.scss';

import Slider from "../../components/slider/slider";


class Home extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			detail: {}
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
			<div className="main">
				
					<div className="sliderProductosHome">Los más vendidos</div>
					
			
       				<Slider url="/product/best?limit=10" />
			
					
					<div className="sliderProductosHome">Los más votados</div>
				
			
					<Slider url="/product/voted?limit=10" />
			
					
					<div className="sliderProductosHome">Sugerencias para ti</div>
					
			
					<Slider url="/product/best?limit=10" />
			
			</div>
		</div>
		)
	}

}

export default Home;