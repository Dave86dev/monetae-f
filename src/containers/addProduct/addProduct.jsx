
import React from "react";

// import axios from "axios";
// import getUrl from "../../utils/getUrl";

import './addProduct.scss';


class AddProduct extends React.Component {
	
    constructor (props) {
		super(props);
		
		this.state = {
            titulo: "",
            precio: "",
            stock: "",
            stockActivo: "",
            location: "",
            category: "",
            description: "",
            image1: "",
            image2: "",
            image3: "",
            image4: "",
            isActive: "false",


            message: "",
			errorTime: 0,
			messageClassName: "error",
		};
		
        this.pulsaProduct = this.pulsaProduct.bind(this);
    };
    
     handleChange = (ev) =>{
         
         this.setState({[ev.target.name]: ev.target.type === 'number' ? +ev.target.value : ev.target.value});
        
     }

   
    pulsaProduct ()  {

        //Comprobamos que todos los campos esten rellenados

        let arraddProduct = ["titulo","precio","stock","stockActivo","location","category",
        "description","image1"];

        for(let _x of arraddProduct) {
            if(this.state[_x] === ""){
                this.muestraError(`El campo ${_x} no puede estar vacío`);
                return;
            }
        }

        if (this.state.titulo.length < 3) {
            this.muestraError("El titulo debe de tener al menos 3 caracteres.");
            return;
        };

        if (! /[0-9]/g.test(this.state.precio) ) {
            this.muestraError("El precio debe ser válido.");
            return;
        };

        if (! /[0-9]/g.test(this.state.stock) ) {
            this.muestraError("El stock debe ser válido.");
            return;
        };

        if (! /[0-9]/g.test(this.state.stockActivo) ) {
            this.muestraError("El stock activo debe ser válido.");
            return;
        };

        if (! /[a-z0-9]+/gi.test(this.state.location) ) {
            this.muestraError("La localización debe ser válida.");
            return;
        };

        


    }

    muestraError (message, timeout = 3, isError = true) {
		
		// Pongo la clase
		let className = isError ? "error" : "success";
		this.setState({messageClassName: className});
		
		
		// Pongo el mensaje
		this.setState({message: message});
		
		
		// Ya estoy en loop
		if (this.state.errorTime > 0) {
			this.setState({errorTime: timeout});
			return; // y salgo
		};
		
		
		this.setState({errorTime: timeout}); // Entro por primera vez, pongo tiempo
		
		
		// Loop
		let loop = setInterval( ()=> {
			
			if (this.state.errorTime <= 0) {
				this.setState({message: ""});
				clearInterval(loop); // salgo del loop
			};
			
			
			this.setState( preState => ( {errorTime: preState.errorTime - 1}) );
			
		}, 1000);
		
	};

    render() {
       
		return(
			<div className="addProductMain">
            {/* <pre>{JSON.stringify(this.state, null,2)}</pre> */}

				<div className="addProductCard">
					<h2>Añade un nuevo producto</h2>
                    <div className="productRegisterFieldsA">
                        <input className="inputaddProduct" type="text" placeholder="Título" name="titulo" maxlength="50" value={this.state.titulo}  onChange={this.handleChange} ></input>
                        <input className="inputaddProduct" type="text" placeholder="Precio"  name="precio" value={this.state.precio}  onChange={this.handleChange} ></input>
                        <input className="inputaddProduct" type="password" placeholder="Stock"  name="stock" value={this.state.stock}  onChange={this.handleChange} ></input>
                        <input className="inputaddProduct" type="password" placeholder="Stock Activo"  name="stockActivo" value={this.state.stockActivo}  onChange={this.handleChange} ></input>
                        <input className="inputaddProduct" type="text" placeholder="Localizacion"  name="location" value={this.state.location}  onChange={this.handleChange} ></input>
                        <input className="inputaddProduct" type="text" placeholder="Categoría"  name="category" value={this.state.category}  onChange={this.handleChange} ></input>
                        <input className="inputaddProduct" type="text" placeholder="Link imagen 1"  name="image1" value={this.state.image1}  onChange={this.handleChange} ></input>
                        <input className="inputaddProduct" type="text" placeholder="Link imagen 2"  name="image2" value={this.state.image2}  onChange={this.handleChange} ></input>
                        <input className="inputaddProduct" type="text" placeholder="Link imagen 3"  name="image3" value={this.state.image3}  onChange={this.handleChange} ></input>
                        <input className="inputaddProduct" type="text" placeholder="Link imagen 4"  name="image4" value={this.state.image4}  onChange={this.handleChange} ></input>
                    </div>
                    <div className="productRegisterFieldsB">
                        <textarea className="textAddProduct" rows="5" cols="60" maxlength="200" placeholder="Add product description here." name="description" value={this.state.description}  onChange={this.handleChange}></textarea>
                        <select className="addProductDropdown br" name="isActive" onChange={this.handleChange}>
					        	<option value="false">Oculto</option>
					        	<option value="true">A la venta</option>
					    </select>
                    </div>
                    <p className={this.state.messageClassName}> {this.state.message} </p>
                    <button onClick={this.pulsaProduct}>Añadir</button>
                </div>

			</div>
		);
	};
	
	
};


export default AddProduct;