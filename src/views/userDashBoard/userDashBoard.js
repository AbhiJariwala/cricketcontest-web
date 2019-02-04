import React, { Component } from 'react';

import UserPanel from '../UserPanel/userPanel'

class userDashBoard extends Component {

    logoutClick() {
        this.props.action.logout.logoutUser();
    }
    render() {

        return (
            <div>
<UserPanel></UserPanel>
                {/* <PanelHeader size="sm"> <h1 style={{ color: "white", marginTop: "-35px", textAlign: "center" }}>Cricket Contest</h1></PanelHeader> */}
                <h1>Welcome user</h1>

            </div>
        );
    }
}



export default userDashBoard;
