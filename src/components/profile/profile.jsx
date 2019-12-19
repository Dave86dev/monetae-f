import React from "react";

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
		userBilling = 3; 
	 }
	 if (this.state.userData.billing?.card.number && this.state.userData.billing?.paypal) {
	   //Comprobamos si el usuario disponde de ambos sistemas de pago.
		userBilling = 2;
	 }

	
	switch (userBilling) {
        case 1:
          return <div className="userDataField">País : {this.state.userData.billing?.country}</div>;
  
        case 2:
          return <div className="userDataField">hahahaha : {this.state.userData.billing?.country}</div>;
  
        case 3:
          return <div className="userDataField">hehehehe : {this.state.userData.billing?.country}</div>;
  
        default:
          console.log("default");
      }
  }

  render() {
	  
	  this.state.userType = this.state.userData.userType === 0 ? "Cliente" : "Vendedor";
	
      return (
        <div className="main mainProfile">
          <div className="card">
            <div className="cardHeader">
              <h1 className="cardTitle"> {this.state.userData.username} </h1>
            </div>
            <div className="cardBody">
              <div className="userDataField">{this.state.userType}</div>
              <div className="userDataField">E-mail : {this.state.userData.email}</div>
              <div className="userDataField">Teléfono : {this.state.userData.phone}</div>
              <div className="userDataField">Dirección : {this.state.userData.billing?.address}</div>
              <div className="userDataField">Ciudad : {this.state.userData.billing?.city}</div>
              <div className="userDataField">País : {this.state.userData.billing?.country}</div>
  
              {this.muestraBilling()}
            </div>
          </div>
        </div>
      );
  }
}
export default Profile;
