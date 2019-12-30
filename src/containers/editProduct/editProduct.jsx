import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { listaCategorias } from '../../utils/uti';
import axios from "axios";
import queryString from 'query-string';

import "./editProduct.scss";

import { rdx_productDetail, rdx_productSearchResults } from "../../redux/actions/products";
import { getUrl, numToStr, session } from "../../utils/uti";
import DropdownCategories from "../../components/dropdownCategories/dropdownCategories";



class editProduct extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
            
            categoriaDefecto: "",
            category: "",
			sort: "vd",
			minPrice: "",
			maxPrice: "",
			category: "",
			
			productList: [],
		}
		
	};
	
	componentDidUpdate() {
		this.render();
    };
    
    async componentDidMount () {
        // Busco query
		const queries = queryString.parse(this.props.location.search);
		
		if (! this.props.productData && queries.id) { // no tengo el prop y tengo param
			
			try {
				
				// Pido info
				let res = await axios.get( getUrl(`/product/get?id=${queries.id}`) );
				
				// Guardo en redux
				rdx_productDetail(res.data[0]);
				
			} catch (err) {
				console.log( err );
			};
			
        };
        
        //Traducimos la categoría.....
        
        this.setState({categoriaDefecto: listaCategorias[this.props.productData?.category[0]]});
        
        
    }
	
	render() {
		
		return (
			<div className="addProductMain">
                { this.props.productData && 

                <div className="addProductCard">
                    <h2>Edita un Producto</h2>
                    <div className="productRegisterFieldsA">
                        <input className="inputaddProduct" type="text" placeholder={this.props.productData.title} name="titulo" maxLength="50" value={this.state.titulo} onChange={this.handleChange}></input>
                        <input className="inputaddProduct" type="text" placeholder={this.props.productData.price} name="precio" value={this.state.precio} onChange={this.handleChange}></input>
                        <input className="inputaddProduct" type="text" placeholder={this.props.productData.stock} name="stock" value={this.state.stock} onChange={this.handleChange}></input>
                        <input className="inputaddProduct" type="text" placeholder={this.props.productData.activeStock} name="stockActivo" value={this.state.stockActivo} onChange={this.handleChange}></input>
                        <input className="inputaddProduct" type="text" placeholder={this.props.productData.location} name="location" value={this.state.location} onChange={this.handleChange}></input>
                        
                        <DropdownCategories category={this.category} handleChange={this.handleChange} defaultCategory={this.state.categoriaDefecto} />

                        <input className="inputaddProduct" type="text" placeholder={this.props.productData?.imageUrl[0]} name="image1" value={this.state.image1} onChange={this.handleChange}></input>
                        <input className="inputaddProduct" type="text" placeholder={this.props.productData?.imageUrl[1]} name="image2" value={this.state.image2} onChange={this.handleChange}></input>
                        <input className="inputaddProduct" type="text" placeholder={this.props.productData?.imageUrl[2]} value={this.state.image3} onChange={this.handleChange}></input>
                        <input className="inputaddProduct" type="text" placeholder={this.props.productData?.imageUrl[3]} value={this.state.image4} onChange={this.handleChange}></input>
                    </div>
                    <div className="productRegisterFieldsB">
                        <textarea
                            className="textAddProduct"
                            rows="5"
                            cols="60"
                            maxLength="400"
                            placeholder={this.props.productData.description}
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                        ></textarea>
                        <span id="descriptionRemainingCharacters"></span>

                        <select className="addProductDropdown br" name="isActive" value={this.state.isActive} onChange={this.handleChange}>
                            <option value="false">Oculto</option>
                            <option value="true">A la venta</option>
                        </select>
                    </div>

                    <button onClick={this.pulsaProduct}>Editar</button>
                    <p className={this.state.messageClassName}> {this.state.message} </p>
                </div>

                } 
            </div>
			
		);
	}
}

const mapStateToProps = (state) => { // ese state es de redux
	return ({
		keywords: state.keywords,
        productSearchResults: state.productSearchResults,
        productData: state.productData,
		isLoggedIn: state.isLoggedIn
	})
}


export default connect(mapStateToProps) (withRouter(editProduct));