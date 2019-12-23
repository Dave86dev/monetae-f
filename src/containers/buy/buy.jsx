import React from "react";
import { connect } from "react-redux";

import axios from "axios";
import { getUrl, session, userBillingOptions } from "../../utils/uti";

import "./buy.scss";

class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            username: "",
            address: "",
            country: "",
            phone: ""

            // message: "",
            // errorTime: 0,
            // messageClassName: "error"
        };
    }

    handleChange = ev => {
        this.setState({ [ev.target.name]: ev.target.type === "number" ? +ev.target.value : ev.target.value });
    };

    async componentDidMount() {
        try {
            let token = session.get().token;
            let id = session.get().userId;

            const res = await axios.get(getUrl(`/user/${id}?token=${token}`));

            this.setState({ userData: res.data });
        } catch (err) {
            console.log(err);
        }
    }

    paymentMethod() {
        let userCard = this.state.userData.billing?.card.number;
        let userPaypal = this.state.userData.billing?.paypal;

        let userBilling = userBillingOptions(userCard, userPaypal);

        let hasCard = userBilling !== 1 && userBilling !== 3;
        let hasPaypal = userBilling !== 2 && userBilling !== 3;

        return (
            <div className="userBillField">
                <div className="userBillPayField mt3">
                    <input type="radio" id="huey" name="payment" value="huey" disabled={hasCard} />
                    <img alt="card" className="imgCard ml2 mr2 mb2" src="./img/card.png"></img>
                    <div className="userPayInfo mb2">{this.state.userData.billing?.card.number}</div>
                </div>
                <div className="userBillPayField">
                    <input type="radio" id="dewey" name="payment" value="dewey" disabled={hasPaypal} />
                    <img alt="paypal" className="imgPaypal ml2 mr2 mb2" src="./img/paypal.png"></img>
                    <div className="userPayInfo mb2">{this.state.userData.billing?.paypal}</div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="mainBuy mt3">
                {/* <pre>{JSON.stringify(this.state.address, null,2)}</pre> */}
                <div className="Data">
                    <div className="card">
                        <div className="cardHeader">
                            <h1 className="cardTitle"> Dirección de envio: </h1>
                        </div>
                        <div className="cardBody">
                            <div className="userDataField">
                                <input
                                    className="inputShipping mt3"
                                    type="text"
                                    placeholder={this.state.userData.username}
                                    name="username"
                                    value={this.state.username}
                                    onChange={ev => {
                                        this.handleChange(ev);
                                    }}
                                ></input>
                            </div>
                            <div className="userDataField">
                                <input
                                    className="inputShipping"
                                    type="text"
                                    placeholder={this.state.userData.billing?.address}
                                    name="address"
                                    value={this.state.address}
                                    onChange={ev => {
                                        this.handleChange(ev);
                                    }}
                                ></input>
                            </div>
                            <div className="userDataField">
                                <input
                                    className="inputShipping"
                                    type="text"
                                    placeholder={this.state.userData.billing?.city}
                                    name="city"
                                    value={this.state.city}
                                    onChange={ev => {
                                        this.handleChange(ev);
                                    }}
                                ></input>
                            </div>
                            <div className="userDataField">
                                <input
                                    className="inputShipping"
                                    type="text"
                                    placeholder={this.state.userData.billing?.country}
                                    name="country"
                                    value={this.state.country}
                                    onChange={ev => {
                                        this.handleChange(ev);
                                    }}
                                ></input>
                            </div>
                            <div className="userDataField">
                                <input
                                    className="inputShipping"
                                    type="text"
                                    placeholder={this.state.userData?.phone}
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={ev => {
                                        this.handleChange(ev);
                                    }}
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Cart ml5">
                    <div className="card">
                        <div className="cardHeader">
                            <h1 className="cardTitle"> Método de pago: </h1>
                        </div>
                        <div className="cardBody">{this.paymentMethod()}</div>
                    </div>
                </div>
                <div className="Shipping ml5">
                    <div className="card">
                        <div className="cardHeader">
                            <h1 className="cardTitle"> Productos y envío: </h1>
                        </div>
                        <div className="cardBody">
                            <div className="totalDisplay">
                                <div className="totalTextDisplay mt3">
                                    <div className="totalTitle">Productos:</div>
                                    <div className="totalNum">{this.props.precioTotal}€</div>
                                    {/* <div className="totalNum">1.000.000€</div> */}
                                </div>
                                <div className="totalTextDisplay">
                                    <div className="totalTitle mt3">Gastos de envío:</div>
                                    <div className="totalNum mt3">6,00€</div>
                                </div>
                                <div className="totalTextDisplay">
                                    <div className="totalTitle mt5">Total:</div>
                                    <div className="totalNum mt5">100€</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    // ese state es de redux
    return {
        cart: state.precioTotal
    };
};
export default connect(mapStateToProps)(Buy);
