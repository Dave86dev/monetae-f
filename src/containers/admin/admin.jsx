import React, { Fragment } from "react";
import Moment from 'react-moment';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import "./admin.scss";

import { rdx_productDetail } from "../../redux/actions/products";
import { getUrl, numToStr, session, listaCategorias } from "../../utils/uti";

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: "vd",

            filtro_dias: "",
            filtro_meses: "",
            filtro_years: "",

            productSales: [],
            productSales_filtered: []
        };
    }

    handleChange = (ev, nombreEstado) => {
        this.setState({ [nombreEstado]: ev.target.type === "number" ? +ev.target.value : ev.target.value }, () => {
            // this.applyFilters();
        });
    };

    applyFilters() {
        let newArr = this.state.storageProducts.filter(_x => {
            console.log(!!this.state.filtro_categoria);

            return (
                _x.title.toLowerCase().includes(this.state.filtro_dias.toLowerCase()) &&
                _x.location.toLowerCase().includes(this.state.filtro_meses.toLowerCase()) &&
                _x.location.toLowerCase().includes(this.state.filtro_years.toLowerCase())
            );
        });

        // Guardo
        this.setState({ productSales_filtered: newArr });
    }

    resetFilters() {
        this.setState(
            {
                filtro_dias: "",
                filtro_meses: "",
                filtro_years: ""
            },
            () => this.applyFilters()
        );
    }

    componentDidMount() {
        let token = session.get().token;
        let id = session.get().userId;

        //we show all the purchases
        axios
            .get(getUrl(`/purchase/get`))
            .then(res => {
                this.setState({
                    productSales: res.data,
                    storageProducts_filtered: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    pulsaResultado(productData) {
        // Guardo en redux
        // rdx_productDetail(productData);
        // console.log(productData);

        // Redirijo
        // this.props.history.push(`/editProduct?id=${productData._id}`);
        console.log("si, has pulsado un resultado, lo se");
    }

    muestraResultados() {
        // let adminData = this.state.productSales_filtered.length > 0 ? this.state.productSales_filtered : this.state.productSales;
        // adminData = this.state.productSales_filtered;

        let adminData = this.state.productSales;
        let estado;

        return (
            <Fragment>
                <table>
                    <thead>
                        <tr>
                            <th>Items</th>
                            <th>Fecha</th>
                            <th>Comprador</th>
                            <th>Vendedor</th>
                            <th>Ciudad Destino</th>
                            <th>Pais Destino</th>
                            <th>Origen</th>
                            <th>Valor total</th>
                            <th>Estado</th>
                        </tr>
                    </thead>

                    <tbody>
                        {adminData?.map(_x => {
							
							//Traducción del estado de cada purchase
                            switch (_x.status) {
                                case 0:
                                    estado = "Esperando pago.";
                                    break;

                                case 1:
                                    estado = "Pagado, preparando envio.";
                                    break;

                                case 2:
                                    estado = "Enviado.";
                                    break;

                                case 3:
                                    estado = "Recibido";
                                    break;

                                default:
                                    estado = "Esperando pago.";
                                    break;
                            }

                            return (
                                <tr key={_x._id}>
                                    <th>{_x.items}</th>
                                    <th><Moment format="YYYY/MM/DD">{_x.date}</Moment></th>
                                    <th>{_x.buyerId}</th>
                                    <th>{_x.sellerId}</th>
                                    <th>{_x.destinationCity}</th>
                                    <th>{_x.destinationCountry}</th>
                                    <th>{_x.originLocation}</th>
                                    <th>{_x.totalValue}€</th>
                                    <th>{estado}</th>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* {
					this.props.productSearchResults?.data?.map(_x => {
						return (
							<div
								className="card"
								key={_x._id}
								// onClick={ () => { this.pulsaResultado(_x)} }
							>
								<img className="cardImage mr1" src={_x.imageUrl[0]} alt="producto"/>
								<h1 className="cardText">{_x.title}</h1>
								<h1 className="cardText mr1">{ numToStr(_x.price)} €</h1>
								<h1 className="cardText mr1">filtro_almacen: { _x.location}</h1>
								<h1 className="cardText mr1">Stock Total: { _x.stock}</h1>
								<h1 className="cardText mr1">Stock Activo: { _x.activeStock}</h1>
								<button onClick={ () => { this.pulsaResultado(_x)}}>
									Editar
								</button>
							</div>					
						)
					})
					
				} */}
            </Fragment>
        );
    }

    muestraFacturas() {
        this.props.history.push("/facturas");
    }

    render() {
        return (
            <div className="mainStorage">
                <div className="filters pt3 pb3">
                    <div className="filtro_dias">
                        <input
                            type="text"
                            className="ml2 mr5"
                            placeholder="Compras por día"
                            value={this.state.filtro_dias}
                            onChange={ev => {
                                this.handleChange(ev, "filtro_dias");
                            }}
                        />
                    </div>

                    <div className="filtro_meses">
                        <input
                            type="text"
                            className="ml2 mr5"
                            placeholder="Compras por mes"
                            value={this.state.filtro_meses}
                            onChange={ev => {
                                this.handleChange(ev, "filtro_meses");
                            }}
                        />
                    </div>

                    <div className="filtro_years">
                        <input
                            type="text"
                            className="ml2 mr5"
                            placeholder="Compras por año"
                            value={this.state.filtro_years}
                            onChange={ev => {
                                this.handleChange(ev, "filtro_years");
                            }}
                        />
                    </div>

                    <button className="reiniciarFiltros ml5" onClick={() => this.resetFilters()}>
                        Reiniciar filtros
                    </button>
                    <button className="reiniciarFiltros ml5" onClick={() => this.muestraFacturas()}>
                        Facturas
                    </button>
                </div>

                <div className="mainResults pt3 pb3">{this.muestraResultados()}</div>
            </div>
        );
    }
}

// const mapStateToProps = (state) => { // ese state es de redux
// 	return ({
// 		keywords: state.keywords,
// 		productSearchResults: state.productSearchResults,
// 		productSearchResults_original: state.productSearchResults,
// 	})
// }

export default withRouter(Admin);
