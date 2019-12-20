
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Componentes
import Home from "./containers/home/home";
import Header from "./components/header/header";
import SearchResults from "./containers/searchResults/searchResults";
import ProductDetail from "./containers/productDetail/productDetail";
import Login from "./containers/login/login";
import Profile from "./components/profile/profile";
import Register from "./containers/register/register";
import PasswordRecovery from "./containers/passwordRecovery/passwordRecovery";
import AddProduct from "./containers/addProduct/addProduct";
import Cesta from "./containers/cesta/cesta";
import Buy from "./containers/buy/buy";

// CSS
import "./global.css";
import "./App.css";

export default function App() {
	return (
		<div>
			<Router>
				
				<Header/>
				
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<Route path="/profile" exact component={Profile} />
					<Route path="/passwordRecovery" exact component={PasswordRecovery} />
					
					<Route path="/search" exact component={SearchResults} />
					<Route path="/detail" exact component={ProductDetail} />
					<Route path="/cart" exact component={Cesta} />
					<Route path="/buy" exact component={Buy} />
					
					<Route path="/addProduct" exact component={AddProduct} />
					
				</Switch>
				
			</Router>
		</div>
	);
}



