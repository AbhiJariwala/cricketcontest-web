import React, { Component } from "react";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as loginAction from '../../action/loginAction';
import './UserPanel.css'

class NavbarPage extends Component {
state = {
  isOpen: false
};
logoutClick() {
    this.props.action.logout.logoutUser();
}
toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}
render() {
  return (

<div id="main">
  <div className="container" >
    <nav>
      <div className="nav-xbootstrap"  style={{zIndex:"1",marginTop: "50px"}}>
        <ul>
          <li><a href="https://xbootstrap.com">Home</a></li>
          <li><a href="https://xbootstrap.com">View Tournaments</a></li>
          <li><a href="" onClick={this.logoutClick.bind(this)}>Logout</a></li>
          {/* <li><a href="javascript:void(0)">Web Design<span className="glyphicon glyphicon-chevron-down iconsize"></span></a>
            <ul className="dropdown">
              <li><a href="">HTML</a></li>
              <li><a href="">CSS</a></li>
              <li><a href="">Javascript</a></li>
              <li><a href="">JQuery</a></li>
            </ul>
          </li>
  */}
        </ul>
      </div>
      <div className="nav-bg-xbootstrap">
        <div className="navbar-xbootstrap"> <span></span> <span></span> <span></span> </div>
        <a href="https://xbootstrap.com" className="title-mobile">Cricket Contest</a>        
      </div>
    </nav>
    {/* <div className='content' style={{height:"50px"}}>
    </div> */}
</div>
</div>



    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        logout: bindActionCreators(loginAction, dispatch)
    }
})

export default connect(null, mapDispatchToProps)(NavbarPage);