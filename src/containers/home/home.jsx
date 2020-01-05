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

	UNSAFE_componentWillMount () {
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

	
	render() {
		return (
		
		<div className="home">
			<div className="mainHome">
					
					<div className="sliderProductosHome">Los más vendidos</div>
					
					
       				{/* <Slider url="/product/best?limit=10" /> */}
       				<Slider url="/product/get?isActive=true&sort=tsd&limit=10" />
					
					
					<div className="sliderProductosHome">Los más votados</div>
					
					
					{/* <Slider url="/product/voted?limit=10" /> */}
					<Slider url="/product/get?isActive=true&sort=rd&limit=10" />
					
					<div className="sliderProductosHome">Sugerencias para ti</div>
					
					
					{/* <Slider url={`/product/category?cat=${this.state.categoriaSugerida}&limit=10`} /> */}
					<Slider url={`/product/get?category=${this.state.categoriaSugerida}&limit=10`} />
					
					
					<div className="sliderProductosHome">Los más económicos</div>
					
					
       				{/* <Slider url="/product/econ?limit=10" /> */}
       				<Slider url="/product/get?isActive=true&sort=pa&limit=10" />
					
			</div>
		</div>
		)
	}

}

export default Home;