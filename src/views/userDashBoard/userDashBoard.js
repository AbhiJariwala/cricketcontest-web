import React, { Component } from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import { PanelHeader } from "components";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as loginAction from '../../action/loginAction';
const Option = Select.Option;

class userDashBoard extends Component {
    handleChange(value) {
        console.log(`selected ${value}`);
      }
      logoutClick() {
        this.props.action.logout.logoutUser();
      }
    render() {
        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }
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
