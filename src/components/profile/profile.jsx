import React, { Fragment } from "react";

import axios from "axios";
import { getUrl, session } from "../../utils/uti";

import "./profile.scss";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      userType: ""
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

  muestraBilling() {
    let userBilling = 0;

    if (this.state.userData.billing?.card.number && !this.state.userData.billing?.paypal) {
      //Comprobamos si el usuario disponde de tarjeta de crédito pero no de paypal.
      userBilling = 1;
    }
    if (!this.state.userData.billing?.card.number && this.state.userData.billing?.paypal) {
      //Comprobamos si el usuario disponde de paypal pero no de tarjeta de crédito.
      userBilling = 2;
    }
    if (this.state.userData.billing?.card.number && this.state.userData.billing?.paypal) {
      //Comprobamos si el usuario disponde de ambos sistemas de pago.
      userBilling = 3;
    }

    switch (userBilling) {
      case 1:
        return (
          <div className="userDataField">
            <div className="userDataFieldTitle">Tarjeta de Crédito : </div>
            <div className="userDataFieldContent">{this.state.userData.billing.card.number}</div>
          </div>
        );

      case 2:
        return (
          <div className="userDataField">
            <div className="userDataFieldTitle">Paypal : </div>
            <div className="userDataFieldContent">{this.state.userData.billing.paypal}</div>
          </div>
        );

      case 3:
        return (
          <div className="userDataField">
            <div className="userDataFieldTitle">Tarjeta de Crédito : </div>
            <div className="userDataFieldContent">{this.state.userData.billing.card.number}</div>
            <div className="userDataFieldTitle">Paypal : </div>
            <div className="userDataFieldContent">{this.state.userData.billing.paypal}</div>
          </div>
        );

      default:
        console.log("default");
    }
  }

  render() {
    this.state.userType = this.state.userData.userType === 0 ? "Cliente" : "Vendedor";

    return (
      <div className="main mainProfile">
        <div className="card mt3">
          <div className="cardHeader">
            <h1 className="cardTitle"> {this.state.userData.username} </h1>
            <div className="userTypeClass">{this.state.userType}</div>
          </div>
          <div className="cardBody">
            
            <div className="userDataField">
                <div className="userDataFieldTitle">E-mail : </div>
                <div className="userDataFieldContent">{this.state.userData.email}</div>
            </div>
            <div className="userDataField">
                <div className="userDataFieldTitle">Teléfono : </div>
                <div className="userDataFieldContent">{this.state.userData.phone}</div>
            </div>
            <div className="userDataField">
                <div className="userDataFieldTitle">Dirección : </div>
                <div className="userDataFieldContent">{this.state.userData.billing?.address}</div>
            </div>
            <div className="userDataField">
                <div className="userDataFieldTitle">Ciudad : </div>
                <div className="userDataFieldContent">{this.state.userData.billing?.city}</div>
            </div>
            <div className="userDataField">
                <div className="userDataFieldTitle">País : </div>
                <div className="userDataFieldContent">{this.state.userData.billing?.country}</div>
            </div>
            {this.muestraBilling()}
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
