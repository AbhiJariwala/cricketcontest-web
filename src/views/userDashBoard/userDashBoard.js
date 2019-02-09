import React, { Component } from 'react';
import UserPanel from '../UserPanel/userPanel'
import { Button } from 'reactstrap'
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
                    <img src="https://wallpapersite.com/images/pages/pic_w/6005.jpg" alt={{}} style={{width: "100%",height: "690px"}} ></img>
                    <center>
                        <div style={{ marginTop: "-269px" }}><Button onClick={this.handleLetsGoButton.bind(this)} style={{ width: "120px", backgroundColor: "#007bff" }}>Lets play</Button></div>
                    </center>
                </div>
            </div>
        );
    }
}
export default userDashBoard;
