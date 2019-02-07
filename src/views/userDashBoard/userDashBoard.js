import React, { Component } from 'react';
import UserPanel from '../UserPanel/userPanel'
import { Button } from 'reactstrap'
const banerhome = require('../../Image/image1.jpg')
class userDashBoard extends Component {
    logoutClick() {
        this.props.action.logout.logoutUser();
    }
    handleLetsGoButton = () => {
        this.props.history.push('/viewTournamentteam');
    }
    render() {
        return (
            <div>
                <UserPanel></UserPanel>
                <div>
                    <img src={banerhome} alt={{}} style={{width: "100%",height: "640px"}} ></img>
                    <center>
                        <div style={{ marginTop: "-269px" }}><Button onClick={this.handleLetsGoButton.bind(this)} style={{ width: "120px", backgroundColor: "forestgreen" }}>Lets play</Button></div>
                    </center>
                </div>
            </div>
        );
    }
}
export default userDashBoard;
