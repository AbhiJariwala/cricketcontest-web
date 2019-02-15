import React, { Component } from 'react';
import UserPanel from '../UserPanel/userPanel'
import { Button } from 'reactstrap'
import './userDashBoard.css'

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
                <div style={{ marginTop: "-20px" }}>
                    <img src="https://wallpapersite.com/images/pages/pic_w/6005.jpg" alt={{}} style={{ width: "100%", height: "100%", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} ></img>
                    <center>
                        <div style={{ marginTop: "-269px" }}><button onClick={this.handleLetsGoButton.bind(this)} className="button button2 btn btn-info">Lets play</button></div>
                    </center>
                </div>
            </div>
        );
    }
}
export default userDashBoard;
