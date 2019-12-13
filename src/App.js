
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
				
				<Header />
				
				<Switch>
					<Route path="/" exact> <Home /> </Route>
					<Route path="/login" exact> <Login /> </Route>
					<Route path="/register" exact> <Register /> </Route>
					<Route path="/profile" exact> <Login /> </Route>
					<Route path="/passwordRecovery" exact> <PasswordRecovery /> </Route>
					
					<Route path="/search" exact> <SearchResults /> </Route>
					<Route path="/detail" exact> <ProductDetail /> </Route>
					
					<Route path="/addProduct" exact> <AddProduct /> </Route>
					
				</Switch>
				
			</Router>
		</div>
	);
}



