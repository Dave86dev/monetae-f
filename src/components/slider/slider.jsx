import React from 'react';
import axios from "axios";
import { getUrl } from "../../utils/uti";
import { withRouter } from "react-router-dom";
import { rdx_productDetail } from "../../redux/actions/products"

import "./slider.scss";

class Slider extends React.Component {
    
    constructor (props) {
        super(props);

        this.state = {
			sliderData: [],
			detail: {}
		}
        
    };

    async componentDidMount () {

        try {

			const res = await axios.get(getUrl(this.props.url));
			this.setState({sliderData : res.data})
			
		} catch (err) {
			console.log(err);
		};
    }

    async pulsaProducto (productData) {

		try {

			const res = await axios.get(getUrl(this.props.url));
			
			this.setState({sliderData : res.data.filter(producto=>producto._id!==productData._id)})
			
		} catch (err) {
			console.log(err);
		};
		 
		//Guardo en redux
		rdx_productDetail(productData);

		//Redirijo 
		this.props.history.push("/detail");
		
	}
    
    render() {
        return(
            <div>
                <div className="scrolling-wrapper-flexbox">
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
                </div>
            </div>
        );
    };
    
    
};
export default (withRouter(Slider));

