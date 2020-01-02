import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import { session, getUrl } from "../../utils/uti";
import { login } from "../../redux/actions/users";
import { rdx_productSearchResults } from "../../redux/actions/products";

import "./header.css";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keywords: "",
            debounce_timeout: null
        };
    }

    BotonesHeader() {
        let nCesta = this.props.cart ? Object.keys(this.props.cart).length : 0;
        let strNCesta = nCesta === 0 ? "" : `(${nCesta})`;

        const userType = session.get()?.userType;

        if (this.props.isLoggedIn && userType) {
            // si estoy logeado...

            //en el caso de que sea vendedor..
			if (userType === 1) {
                return (
                    <Fragment>
                        <button>
                            <NavLink exact to="/profile">
                                Perfil
                            </NavLink>
                        </button>
                        <button>
                            <NavLink exact to="/storage">
                                Mi inventario
                            </NavLink>
                        </button>
                        <button>
                            <NavLink exact to="/cart">
                                Cesta {strNCesta}
                            </NavLink>
                        </button>
                        <button className="logoutButton" onClick={() => this.pulsaLogout()}>
                            Logout
                        </button>
                    </Fragment>
                );
            } else {
                //en el caso de que sea sólo comprador..
                return (
                    <Fragment>
                        <button>
                            <NavLink exact to="/profile">
                                Perfil
                            </NavLink>
                        </button>
                        <button>
                            <NavLink exact to="/cart">
                                Cesta {strNCesta}
                            </NavLink>
                        </button>
                        <button className="logoutButton" onClick={() => this.pulsaLogout()}>
                            Logout
                        </button>
                    </Fragment>
                );
            }
        } else {
            //visito la página de forma anónima..
            return (
                <Fragment>
                    <button>
                        <NavLink exact to="/login">
                            Acceder
                        </NavLink>
                    </button>
                    <button>
                        <NavLink exact to="/register">
                            Registrarse
                        </NavLink>
                    </button>
                    <button>
                        <NavLink exact to="/cart">
                            Cesta {strNCesta}
                        </NavLink>
                    </button>
                </Fragment>
            );
        }
    }

    buscaResultados() {
        let keywords = this.state.keywords;
        let query = keywords !== "" ? `?title=${keywords}` : "";

        axios
            .get(getUrl(`/product/get${query}`))
            .then(res => {
                // Envio a redux
                rdx_productSearchResults({
                    keywords: keywords,
                    data: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    debounce() {
        // Si ya estoy en un timeout, salgo y cancelo
        if (this.state.debounce_timeout) {
            clearTimeout(this.state.debounce_timeout); // quito el loop
            this.setState({ debounce_timeout: null }); // y su referencia
        }

        // Empiezo un timeout
        const loop = setTimeout(() => {
            this.buscaResultados();
        }, 500);

        // Guardo la referencia de timeout
        this.setState({ debounce_timeout: loop });
    }

    pulsaTecla(ev) {
        let busqueda = ev.target.value;
        busqueda = busqueda.trim();

        if (busqueda === "") {
            this.props.history.push("/");
        } else {
            // Guardo resultados
            this.setState({ keywords: busqueda });

            // Busco resultados
            this.debounce();

            // Redirijo
            this.props.history.push("/search");
        }
    }

    pulsaLogout() {
        let token = session.get().token;

        // Hago la llamada para borrar mi token
        axios.get(getUrl(`/user/logout?token=${token}`));

        // Borro mis datos de sesión
        session.del();

        // Digo que no estoy logeado (con redux)
        login(false);

        // Redirección
        this.props.history.push("/");
    }

    render() {
        return (
            <header>
                <div className="logo">
                    <NavLink to="/">
                        <img src="https://trello-attachments.s3.amazonaws.com/5def57a617949c786fc8ec01/128x128/b7e4b100119342c9fa696e34ec5e9621/logoMonetae_3lit.png" alt="logo" />
                    </NavLink>
                </div>

                <div className="search">
                    <input
                        type="text"
                        placeholder="Búsqueda"
                        onChange={ev => {
                            this.pulsaTecla(ev);
                        }}
                    />
                    <div className="backgroundIcon">
                        <i className="material-icons">search</i>
                    </div>
                </div>

                <div className="nav">{this.BotonesHeader()}</div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    // ese state es de redux
    return {
        isLoggedIn: state.isLoggedIn, //creamos la prop user a partir de la key user del state
        cart: state.cart
    };
};

export default connect(mapStateToProps)(withRouter(Header));

// withRouter(Header) es para meter Header en el contexto de "Route" para que tenga el history y toa la movida
