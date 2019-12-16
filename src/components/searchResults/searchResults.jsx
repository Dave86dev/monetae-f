import React from "react";

import "./searchResults.css";
import axios from "axios";
import { getUrl } from "../../utils/uti";


class SearchResults extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			productList: {}
		}
		
	}
	
	
	
	componentDidMount() {
		
		axios.get(
			getUrl("/product/all")
		).then( (res) => {
			
			console.log( "RES SEARCH: ", res );
			
		}).catch( (err) => {
			console.log( err );
		});
		
	};
	
	
	
	render() {
		return (
			<div className="mainSearch">
				
				<div className="card">
					<div className="cardHeader">
						<img className="cardImage" src="https://www.ikea.com/es/es/images/products/ivar-chair-pine__0728155_PE736115_S5.JPG?f=s" alt="producto"/>
					</div>
					
					<div className="cardBody">
						<h1 className="cardPrice">99.999 €</h1>
						<h2 className="cardTitle">Silla nomal y corriente</h2>
						<p className="cardDescription">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati non, vitae ex dolore officiis consequatur? Alias, commodi repellendus tenetur soluta mollitia, non quidem, possimus necessitatibus quisquam omnis totam aut consequuntur.
							asdadsLorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis porro, amet recusandae eum delectus commodi in deleniti similique fuga unde quod cum sed, voluptatem quia, quisquam soluta dolores. Autem, beatae.
						</p>
					</div>
				</div>
				
				
				{/* TEMPLATE */}
				{/* <div className="card">
					<div className="cardHeader">
						<img className="cardImage" src="https://www.ikea.com/es/es/images/products/ivar-chair-pine__0728155_PE736115_S5.JPG?f=s" alt="producto"/>
					</div>
					
					<div className="cardBody">
						<h1 className="cardPrice">99.999 €</h1>
						<h2 className="cardTitle">Silla nomal y corriente</h2>
						<p className="cardDescription">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati non, vitae ex dolore officiis consequatur? Alias, commodi repellendus tenetur soluta mollitia, non quidem, possimus necessitatibus quisquam omnis totam aut consequuntur.
							asdadsLorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis porro, amet recusandae eum delectus commodi in deleniti similique fuga unde quod cum sed, voluptatem quia, quisquam soluta dolores. Autem, beatae.
						</p>
					</div>
				</div> */}
				

				
				
				
				
			</div>
		);
	}
}

export default SearchResults;
