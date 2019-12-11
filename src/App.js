import React from "react";
import Home from "./components/home/home";
import Header from "./components/header/header";
import SearchResults from "./components/searchResults/searchResults";

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
				</Switch>
			</Router>
		</div>
	);
}

function Login() {
	return <h2>Login</h2>;
}

function Register() {
	return <h2>Register</h2>;
}

function Profile() {
	return <h2>Users</h2>;
}
