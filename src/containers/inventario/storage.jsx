import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
import axios from "axios";

import "./storage.scss";

import { rdx_productDetail } from "../../redux/actions/products";
import { getUrl, numToStr, session, listaCategorias } from "../../utils/uti";
import DropdownCategories from "../../components/dropdownCategories/dropdownCategories";



class Storage extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			
			sort: "vd",
			
			filtro_categoria: "",
			filtro_titulo: "",
			filtro_almacen: "",
			
			storageProducts: [],
			storageProducts_filtered: [],
			
			
		}
		
	};
	
	
	
    handleChangeDropdown = (ev) =>{
		this.setState({filtro_categoria: ev.target.type === 'number' ? +ev.target.value : ev.target.value}, () => {
			this.applyFilters();
		});
	};
	
	
	
	handleChange = (ev, nombreEstado) => {
		this.setState({[nombreEstado]: ev.target.type === 'number' ? +ev.target.value : ev.target.value}, () => {
			this.applyFilters();
		});
	};
	
	
	
	applyFilters() {
		
		let newArr = this.state.storageProducts.filter( _x => {
			
			console.log( 
				!!(this.state.filtro_categoria)
			);
			
			return (
				
				_x.title.toLowerCase().includes(
					this.state.filtro_titulo.toLowerCase()
				)
				
				&&
				
				_x.location.toLowerCase().includes(
					this.state.filtro_almacen.toLowerCase()
				)
				
				&& 
				
				(_x.category[0] === this.state.filtro_categoria || this.state.filtro_categoria === "")
				
			);
		});
		
		
		// Guardo
		this.setState({ storageProducts_filtered: newArr });
		
		
	};
	
	
	
	resetFilters() {
		
		this.setState({
			filtro_categoria: "",
			filtro_almacen: "",
			filtro_titulo: ""
		}, () => this.applyFilters() );		
		
	};
	
	
	
    componentDidMount() {
		
        let token = session.get().token;
        let id = session.get().userId;
		
        
		axios.get( getUrl(`/product/getByOwner?ownerId=${id}&token=${token}`) ).then( (res) => {
			
			this.setState({
				storageProducts: res.data,
				storageProducts_filtered: res.data
			});
			
		}).catch( (err) => {
			console.log( err );
		});	
		
    };
	
	
	
	pulsaResultado(productData) {
		
		// Guardo en redux
		rdx_productDetail(productData);
		console.log(productData);
		
		// Redirijo
		this.props.history.push(`/editProduct?id=${productData._id}`);
		
	};
	
	
	
	muestraResultados() {
		
		let storageData = this.state.storageProducts_filtered.length > 0 ? this.state.storageProducts_filtered : this.state.storageProducts;
		storageData = this.state.storageProducts_filtered;
		
		
		return (
			<Fragment>
				
				<table>
					
					<thead>
						<tr>
							<th>Imagen</th>
							<th>Activo</th>
							<th>Almacén</th>
							<th>Título</th>
							<th>Categoría</th>
							<th>Precio</th>
							<th>Stock activo</th>
							<th>Stock</th>
							<th>Valor total</th>
							<th>Acciones</th>
						</tr>
					</thead>
					
					
					<tbody>
						{
							storageData?.map(_x => {
								return (
									<tr key={_x._id}>
										<th>
											<img className="image" src={_x.imageUrl[0]} alt="producto"/>
										</th>
										<th>{_x.isActive ? "Sí" : "No"}</th>
										<th>{_x.location}</th>
										<th>{_x.title}</th>
										<th>{listaCategorias[_x.category] }</th>
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
								<h1 className="cardText mr1">filtro_almacen: { _x.location}</h1>
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
					
                    <div className="filtro_titulo">
						<input
							type="text"
							className="ml2 mr5"
							placeholder="Título"
							value={this.state.filtro_titulo}
							onChange={ (ev) => {this.handleChange(ev, "filtro_titulo")} }
						/>
						
					</div>
					
				    <div className="filtro_almacen">
						<input
							type="text"
							className="ml2 mr5"
							placeholder="Almacén"
							value={this.state.filtro_almacen}
							onChange={ (ev) => {this.handleChange(ev, "filtro_almacen")} }
						/>
						
					</div>
					
				    <div className="categorias ml3">
						<DropdownCategories
							category={this.state.filtro_categoria}
							handleChange={this.handleChangeDropdown}
							defaultCategory={"Todo"}
						/>
					</div>
					
					<button
						className="reiniciarFiltros ml5"
						onClick={ () => this.resetFilters() }
					>
						Reiniciar filtros
					</button>
					
					
				</div>
				
				<div className="mainResults pt3 pb3">
					{this.muestraResultados()}
				</div>
				
			</div>
			
		);
	}
}



// const mapStateToProps = (state) => { // ese state es de redux
// 	return ({
// 		keywords: state.keywords,
// 		productSearchResults: state.productSearchResults,
// 		productSearchResults_original: state.productSearchResults,
// 	})
// }


export default (withRouter(Storage));

