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
                <h1>Welcome user</h1>

            </div>
        );
    }
}



export default userDashBoard;
