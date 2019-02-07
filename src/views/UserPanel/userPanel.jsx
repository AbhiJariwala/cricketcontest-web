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
      <div className="nav-xbootstrap" style={{zIndex:"1",marginTop: "50px"}}>
        <ul>
          <li><a href="https://xbootstrap.com">Home</a></li>
          <li><a href="javascript:void(0)">Web Design<span className="glyphicon glyphicon-chevron-down iconsize"></span></a>
            <ul className="dropdown">
              <li><a href="">HTML</a></li>
              <li><a href="">CSS</a></li>
              <li><a href="">Javascript</a></li>
              <li><a href="">JQuery</a></li>
            </ul>
          </li>
          <li><a href="javascript:void(0)" >Blogger<span className="glyphicon glyphicon-chevron-down iconsize"></span></a>
            <ul className="dropdown">
              <li><a href="https://xbootstrap.com">Widget</a></li>
              <li><a href="https://xbootstrap.com">Tips</a></li>
            </ul>
          </li>
          <li><a href="javascript:void(0)" >Website SEO<span className="glyphicon glyphicon-chevron-down iconsize"></span></a>
            <ul className="dropdown">
              <li><a href="https://xbootstrap.com">Tools</a></li>
              <li><a href="https://xbootstrap.com">Backlink</a></li>
            </ul>
          </li>
          <li><a href="https://xbootstrap.com">Free Themes</a></li>
          <li><a href="https://xbootstrap.com">Premium Themes</a></li>
          <li><a href="https://xbootstrap.com">Business</a></li>
        </ul>
      </div>
      <div className="nav-bg-xbootstrap">
        <div className="navbar-xbootstrap"> <span></span> <span></span> <span></span> </div>
        <a href="https://xbootstrap.com" className="title-mobile">Cricket Contest</a>
        <a  href="" style={{    marginLeft: "1200px"}} onClick={this.logoutClick.bind(this)} className="title-mobile">Logout</a>
      </div>
    </nav>
    {/* <div className='content' style={{height:"50px"}}>
    </div> */}
</div>
</div>




    // <MDBNavbar color="indigo" dark expand="md">
    //   <MDBNavbarBrand>
    //     <strong classNameName="BLACK-text">Cricket Contest</strong>
    //   </MDBNavbarBrand>
    //   <MDBNavbarToggler onClick={this.toggleCollapse} />
    //   <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
    //     <MDBNavbarNav left>
    //       <MDBNavItem active>
    //         <MDBNavLink to="#!">Home</MDBNavLink>
    //       </MDBNavItem>
    //       {/* <MDBNavItem>
    //         <MDBNavLink to="#!">Features</MDBNavLink>
    //       </MDBNavItem> */}
    //       <MDBNavItem>
    //         <MDBNavLink to="#!">Pricing</MDBNavLink>
    //       </MDBNavItem>
    //       <MDBNavItem>
    //         <MDBDropdown>
    //           <MDBDropdownToggle nav caret>
    //             <div classNameName="d-none d-md-inline">Dropdown</div>
    //           </MDBDropdownToggle>
    //           <MDBDropdownMenu classNameName="dropdown-default" right>
    //             <MDBDropdownItem href="#!">Action</MDBDropdownItem>
    //             <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
    //             <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
    //             <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
    //           </MDBDropdownMenu>
    //         </MDBDropdown>
    //       </MDBNavItem>
    //     </MDBNavbarNav>
    //     <MDBNavbarNav right>
         
    //       <MDBNavItem>
    //         <MDBDropdown>
    //           <MDBDropdownToggle nav caret>
    //             <MDBIcon icon="user" />
    //           </MDBDropdownToggle>
    //           <MDBDropdownMenu classNameName="dropdown-default" right>
    //             <MDBDropdownItem href="#!">Profile</MDBDropdownItem>
    //             {/* <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
    //             <MDBDropdownItem href="#!">Something else here</MDBDropdownItem> */}
    //             <MDBDropdownItem onClick={this.logoutClick.bind(this)}> logout</MDBDropdownItem>
    //           </MDBDropdownMenu>
    //         </MDBDropdown>
    //       </MDBNavItem>
    //     </MDBNavbarNav>
    //   </MDBCollapse>
    // </MDBNavbar>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        logout: bindActionCreators(loginAction, dispatch)
    }
})

export default connect(null, mapDispatchToProps)(NavbarPage);