import React from "react";

import axios from "axios";
import { getUrl, session } from "../../utils/uti";

import "./profile.scss";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
        let token = session.get().token;
        let id = session.get().userId;
        
        const res = await axios.get(getUrl(`/user/${id}?token=${token}`));
        
    } catch (err) {
        console.log(err);
    };
  }

  render() {
    return (
      <div className="main mainProfile">
        <div className="card">
          <div className="cardHeader">
            <h1 className="cardTitle"> Perfil de Usuario </h1>
          </div>
          <div className="cardBody">Cuerpo del perfil</div>
        </div>
      </div>
    );
  }
}
export default Profile;
