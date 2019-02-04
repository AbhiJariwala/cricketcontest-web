import React, { Component } from "react";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as loginAction from '../../action/loginAction';

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
    <MDBNavbar color="indigo" dark expand="md">
      <MDBNavbarBrand>
        <strong className="BLACK-text">Cricket Contest</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={this.toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to="#!">Home</MDBNavLink>
          </MDBNavItem>
          {/* <MDBNavItem>
            <MDBNavLink to="#!">Features</MDBNavLink>
          </MDBNavItem> */}
          <MDBNavItem>
            <MDBNavLink to="#!">Pricing</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-none d-md-inline">Dropdown</div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default" right>
                <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
         
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default" right>
                <MDBDropdownItem href="#!">Profile</MDBDropdownItem>
                {/* <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem> */}
                <MDBDropdownItem onClick={this.logoutClick.bind(this)}> logout</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        logout: bindActionCreators(loginAction, dispatch)
    }
})

export default connect(null, mapDispatchToProps)(NavbarPage);