import React from "react";
import Home from "./components/home/home";
import Header from "./components/header/header";
import SearchResults from "./components/searchResults/searchResults";
import ProductDetail from "./components/productDetail/productDetail";
import Login from "./components/login/login";
import Register from "./components/register/register";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./global.css";
import "./App.css";


export default function App() {
	return (
		<div>
			<Router>
				
				<Header />
				
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/login" exact>
						<Login />
					</Route>
					<Route path="/register" exact>
						<Register />
					</Route>
					<Route path="/profile" exact>
						<Profile />
					</Route>
					<Route path="/search" exact>
						<SearchResults />
					</Route>
					<Route path="/detail" exact>
						<ProductDetail />
					</Route>
				</Switch>
				
			</Router>
		</div>
	);
}


function Profile() {
	return <h2>Users</h2>;
}

