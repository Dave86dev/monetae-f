import React from "react";
import { connect } from "react-redux";

import axios from "axios";
import { getUrl, session, userBillingOptions } from "../../utils/uti";

import "./storage.scss";

class Storage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    render() {

        return (
            <div className="storageContainer">
               EL PUTO INVENTARIO
            </div>
        )}
}
const mapStateToProps = state => {
    // ese state es de redux
    
    return {
        cart: state.cart,
        precioTotal: state.totalPrice
    };
};
export default connect(mapStateToProps)(Storage);