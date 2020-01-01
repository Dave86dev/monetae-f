import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import "./storage.scss";

import { rdx_productDetail, rdx_productSearchResults } from "../../redux/actions/products";
import { getUrl, numToStr, session } from "../../utils/uti";
import DropdownCategories from "../../components/dropdownCategories/dropdownCategories";



class Storage extends React.Component {
	
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
	
	
	
	handleChangeStorage = (ev, nombreEstado) => {
		this.setState({[nombreEstado]: ev.target.type === 'number' ? +ev.target.value : ev.target.value}, () => {
			this.llamaAxios();
		});
	};
	
	
	
	llamaAxios() {
		
		// let queryTitle = `title=${this.props.productSearchResults?.keywords}`;
		// let querySort = `sort=${this.state.sort}`;
		// let queryCategory = `category=${this.state.category}`;
        // let token = session.get().token;
        // let id = session.get().userId;

        
		// axios.get( getUrl(`/product/getByOwner?ownerId=${id}&token=${token}`) ).then( (res) => {
			
		// 	rdx_productSearchResults({
		// 		keywords: this.props.productSearchResults?.keywords,
		// 		data: res.data
		// 	});
			
		// }).catch( (err) => {
		// 	console.log( err );
		// });		
		
    };
    
    componentDidMount() {

        let token = session.get().token;
        let id = session.get().userId;

        
		axios.get( getUrl(`/product/getByOwner?ownerId=${id}&token=${token}`) ).then( (res) => {
			
			rdx_productSearchResults({
				keywords: this.props.productSearchResults?.keywords,
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
		console.log(productData);
		
		// Redirijo
		this.props.history.push(`/editProduct?id=${productData._id}`);
		
	};
	
	
	
	muestraResultados() {
		
		return (
			<Fragment>
				
				<table>
					
					<thead>
						<tr>
							<th>Imagen</th>
							<th>Activo</th>
							<th>Almacén</th>
							<th>Título</th>
							<th>Precio</th>
							<th>Stock activo</th>
							<th>Stock</th>
							<th>Valor total</th>
							<th>Acciones</th>
						</tr>
					</thead>
					
					
					<tbody>
						{
							this.props.productSearchResults?.data?.map(_x => {
								return (
									<tr>
										<th>
											<img className="image" src={_x.imageUrl[0]} alt="producto"/>
										</th>
										<th>{_x.isActive ? "Sí" : "No"}</th>
										<th>{_x.location}</th>
										<th>{_x.title}</th>
										<th>{ numToStr(_x.price) }€</th>
										<th>{_x.activeStock}</th>
										<th>{_x.stock}</th>
										<th>{ numToStr(_x.activeStock * _x.price) }€</th>
										<th>
											<button onClick={ () => { this.pulsaResultado(_x)}}>
												Editar
											</button>
										</th>
									</tr>
								)
							})
							
						}
					</tbody>
						
				</table>
				
				{/* {
					this.props.productSearchResults?.data?.map(_x => {
						return (
							<div
								className="card"
								key={_x._id}
								// onClick={ () => { this.pulsaResultado(_x)} }
							>
								<img className="cardImage mr1" src={_x.imageUrl[0]} alt="producto"/>
								<h1 className="cardText">{_x.title}</h1>
								<h1 className="cardText mr1">{ numToStr(_x.price)} €</h1>
								<h1 className="cardText mr1">Almacen: { _x.location}</h1>
								<h1 className="cardText mr1">Stock Total: { _x.stock}</h1>
								<h1 className="cardText mr1">Stock Activo: { _x.activeStock}</h1>
								<button onClick={ () => { this.pulsaResultado(_x)}}>
									Editar
								</button>
							</div>					
						)
					})
					
				} */}
			</Fragment>
		)
		
	}
	
	
	
	render() {
		
		return (
			<div className="mainStorage">
				
				<div className="filters pt3 pb3">
					
				    <div className="almacen">
						<input
							type="text"
							className="ml2 mr5"
							placeholder="Almacen"
							onChange={ (ev) => {this.handleChangeStorage(ev, "minPrice")} }
						/>
						
					</div>

                    <div className="titulo">
						<input
							type="text"
							className="ml2 mr5"
							placeholder="Producto"
							onChange={ (ev) => {this.handleChangeStorage(ev, "minPrice")} }
						/>
						
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


export default connect(mapStateToProps) (withRouter(Storage));

