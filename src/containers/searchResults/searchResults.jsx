
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { rdx_productDetail, rdx_productSearchResults } from "../../redux/actions/products";
import { getUrl } from "../../utils/uti";
import DropdownCategories from "../../components/dropdownCategories/dropdownCategories";

import "./searchResults.scss";


class SearchResults extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			
			sort: "vd",
			minPrice: "",
			maxPrice: "",
			category: "",
			
			productList: [],
		}
		
	};
	
	
	
    handleChangeDropdown = (ev) =>{
		this.setState({[ev.target.name]: ev.target.type === 'number' ? +ev.target.value : ev.target.value}, () => {
			this.llamaAxios();
		});
	};
	
	
	
	pulsaSort(tipo) {
		this.setState({ sort: tipo }, () => {
			this.llamaAxios();
		});
	};
	
	
	
	llamaAxios() {
		
		let queryTitle = `title=${this.props.productSearchResults?.keywords}`;
		let querySort = `sort=${this.state.sort}`;
		let queryCategory = `category=${this.state.category}`;
		let queryMinPrice = `minPrice=${this.state.minPrice}`;
		let queryMaxPrice = `minPrice=${this.state.maxPrice}`;
		
		
		axios.get( getUrl(`/product/get?${queryTitle}&${querySort}&${queryCategory}`) ).then( (res) => {
			
			rdx_productSearchResults({
				keywords: this.props.productSearchResults.keywords,
				data: res.data
			});
			
		}).catch( (err) => {
			console.log( err );
		});		
		
	};
	
	
	
	componentDidUpdate() {
		this.render();
	};
	
	
	pulsaResultado(productData) {
		
		// Guardo en redux
		rdx_productDetail(productData);
		
		
		// Redirijo
		this.props.history.push("/detail");
		
	};
	
	
	
	muestraResultados() {
		
		return (
			<Fragment>
				{
					this.props.productSearchResults?.data?.map(_x => {
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
				
				<div className="filters pt3 pb3">
					
					<div className="precio">
						Precio: <input type="text" className="ml2" placeholder="Mín." /> - <input type="text" placeholder="Máx." />
					</div>
					
					<div className="sort ml3">
						<button onClick={() => {this.pulsaSort("pa")}} className="firstBtn">
							<img src="/img/filter_price_asc.png" alt="filtro precio asc"/>
						</button>
						<button onClick={() => {this.pulsaSort("pd")}} >
							<img src="/img/filter_price_des.png" alt="filtro precio des"/>
						</button>
						<button onClick={() => {this.pulsaSort("va")}} >
							<img src="/img/filter_votes_asc.png" alt="filtro votos asc"/>
						</button>
						<button onClick={() => {this.pulsaSort("vd")}} className="lastBtn">
							<img src="/img/filter_votes_des.png" alt="filtro votos des"/>
						</button>
						
					</div>
					
					<div className="categorias ml3">
						<DropdownCategories
							category={this.state.category}
							handleChange={this.handleChangeDropdown}
							defaultCategory={"Todo"}
						/>
					</div>
					
					
				</div>
				
				<div className="mainResults pt3 pb3">
					{this.muestraResultados()}
				</div>		
			</div>
			
		);
	}
}



const mapStateToProps = (state) => { // ese state es de redux
	return ({
		keywords: state.keywords,
		productSearchResults: state.productSearchResults
	})
}


export default connect(mapStateToProps) (withRouter(SearchResults));