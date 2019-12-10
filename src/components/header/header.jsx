
import React, {Fragment} from "react";
import "./header.css";


class Header extends React.Component {
	
	constructor () {
		super();
		
	};
	
	render() {
		return (
			<header>
				
				<div className="logo">
					<img src="https://trello-attachments.s3.amazonaws.com/5de522b655e9ad63df7441fb/5def57a617949c786fc8ec01/261e294ef093b2db52c2bf6d093c2bd1/logoMonetae_3.png" alt="logo" />
				</div>
				
				<div className="search">
					
				</div>
				
				<div className="nav">
					
				</div>
				
			</header>
		);
	};
	
	
};


export default Header;