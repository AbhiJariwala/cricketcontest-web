import React, { Component } from 'react';

import { Card, CardHeader, CardBody, Row, Col, Label, CardFooter, Button, Form, FormGroup, Input } from "reactstrap";

import { Link } from 'react-router-dom';
import { PanelHeader } from "components";

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as loginAction from '../../action/loginAction';

class Login extends Component {

    state = {
        email: "",
        password: "",
        fieldsErrors: { email: '', password: '' },
        fieldsValid: { email: false, password: false },
        formValid: false,
        err_msg: ""
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.fieldsErrors;
        let fieldValidation = this.state.fieldsValid;

        switch (fieldName) {
            case 'email':
                fieldValidation.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = fieldValidation.email ? '' : ' Invalid Email';
                break;
            case 'password':
                fieldValidation.password = value.length >= 6;
                fieldValidationErrors.password = fieldValidation.password ? '' : ' Password is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            fieldValidation: fieldValidation
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.fieldValidation.email &&
                this.state.fieldValidation.password
        });
    }


    inputChangeHandler(e) {
        this.setState({ fieldsErrors: { email: '', password: '' } })
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) })
    }

    enterPress(e){
        if(e.key==="Enter"){
            this.props.action.auth.loginUser(this.state);
        }
    }
    btnLoginClick(e) {
        e.preventDefault();
        this.props.action.auth.loginUser(this.state);
    }
    render() {
        return (
            <div>
                <hr />
                <PanelHeader size="sm"> <h1 style={{ color: "white", marginTop: "-35px", textAlign: "center" }}>Cricket Contest</h1></PanelHeader>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: "15px" }}>
                    <Row  >
                        <Col sm={12}>
                            <Card style={{ width: "500px" }}>
                                <CardHeader>
                                    <h5 className="title">Login</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form onKeyPress={this.enterPress.bind(this)}>
                                        <FormGroup>
                                            {(this.props.err_msg !== "") ? <span style={{ color: "red" }}>{this.props.err_msg}</span> : ""}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="email"><b>Email</b></Label>
                                            <Input type="email" name="email" id="email" placeholder="example@example.com" onChange={this.inputChangeHandler.bind(this)} value={this.state.email} />
                                            <span style={{ color: "red" }}>{this.state.fieldsErrors.email}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password"><b>Password</b></Label>
                                            <Input type="password" name="password" id="password" placeholder="Password" onChange={this.inputChangeHandler.bind(this)} value={this.state.password} />
                                            <span style={{ color: "red" }}>{this.state.fieldsErrors.password}</span>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    <Button style={{ "float": "right", "marginBottom": "10px", "width": "100%" }} color="info" onClick={this.btnLoginClick.bind(this)}>Login</Button>
                                </CardFooter>
                                <br />
                                <hr />
                                <CardFooter>
                                    <center>Don't have any account? <Link to="/registration" path="/registration">Register</Link></center>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth: auth,
        err_msg: auth.error_msg
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        auth: bindActionCreators(loginAction, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);