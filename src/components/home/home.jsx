import React, { Component } from 'react';
import Header from '../header/header'
import './home.css';



class Home extends Component {
	
    render() {
        return (
			

            <div className="home">
					
                    <div className="main">
			    		
						<div className="card">
							
							<div className="img">
								<img src="https://www.ikea.com/pt/en/images/products/stefan-chair__0727320_PE735593_S5.JPG" alt="product image"/>
							</div>
							
							<div className="body">
								
								<div className="header">
									<h1 className="title">Silla normal y corriente</h1>
									<h1 className="price">999.99€</h1>
								</div>
								
								<div className="description">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum corporis, ipsa laborum nisi blanditiis repellat vitae reiciendis voluptates quaerat! Eveniet excepturi aspernatur doloremque inventore dignissimos nemo iure cupiditate et esse?
								</div>
								
							</div>
							
						</div>
						
						
			   	 	</div>
				
			</div>
			
        )
    }
	
}

export default Home;