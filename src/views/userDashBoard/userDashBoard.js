import React, { Component } from 'react';
import { PanelHeader } from "components";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as loginAction from '../../action/loginAction';

class userDashBoard extends Component {

    logoutClick() {
        this.props.action.logout.logoutUser();
    }
    render() {

        return (
            <div>
                <PanelHeader size="sm"> <h1 style={{ color: "white", marginTop: "-35px", textAlign: "center" }}>Cricket Contest</h1></PanelHeader>
                <h1>Welcome user</h1>
                <h3><button onClick={this.logoutClick.bind(this)} >Logout </button></h3>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        logout: bindActionCreators(loginAction, dispatch)
    }
})

export default connect(null, mapDispatchToProps)(userDashBoard);
