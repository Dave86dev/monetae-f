import React from "react";

import axios from "axios";
import { getUrl, session } from "../../utils/uti";

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

    render() {
        return (
            <div className="mainBuy mt3">
                <div className="Data">
                    <div className="card">
                        <div className="cardHeader">
                            <h1 className="cardTitle"> {this.state.userData.username} </h1>
                        </div>
                        <div className="cardBody">body</div>
                    </div>
                </div>
                <div className="Cart ml5">
                    <div className="card">
                        <div className="cardHeader">
                            <h1 className="cardTitle"> Titulo </h1>
                        </div>
                        <div className="cardBody">body</div>
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
