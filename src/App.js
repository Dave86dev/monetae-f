
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Componentes
import Home from "./components/home/home";
import Header from "./components/header/header";
import SearchResults from "./components/searchResults/searchResults";
import ProductDetail from "./components/productDetail/productDetail";
import Login from "./components/login/login";
import Register from "./components/register/register";
import PasswordRecovery from "./containers/passwordRecovery/passwordRecovery";
import AddProduct from "./containers/addProduct/addProduct";

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
					<Route path="/profile" exact component={Login} />
					<Route path="/passwordRecovery" exact component={PasswordRecovery} />
					
					<Route path="/search" exact component={SearchResults} />
					<Route path="/detail" exact component={ProductDetail} />
					
					<Route path="/addProduct" exact component={AddProduct} />
					
				</Switch>
				
			</Router>
		</div>
	);
}



