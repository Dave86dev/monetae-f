import React from "react";

import axios from "axios";
import { getUrl, session, userBillingOptions } from "../../utils/uti";

import "./buy.scss";

class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        };
    }

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

        let hasCard = (userBilling !== 1) && (userBilling !== 3);
        let hasPaypal = (userBilling !== 2) && (userBilling !== 3);
        
        
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
                <div className="Data">
                    <div className="card">
                        <div className="cardHeader">
                            <h1 className="cardTitle"> Dirección de envio: </h1>
                        </div>
                        <div className="cardBody">
                            <div className="userDataField">
                                <div className="userDataFieldContent">{this.state.userData.username}</div>
                            </div>
                            <div className="userDataField">
                                <div className="userDataFieldContent">{this.state.userData.billing?.address}</div>
                            </div>
                            <div className="userDataField">
                                <div className="userDataFieldContent">
                                    {this.state.userData.billing?.city},{this.state.userData.billing?.country}
                                </div>
                            </div>
                            <div className="userDataField">
                                <div className="userDataFieldContent">{this.state.userData?.phone}</div>
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
                            <h1 className="cardTitle"> Titulo </h1>
                        </div>
                        <div className="cardBody">body</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Buy;
