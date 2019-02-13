import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import ImageUploader from 'react-images-upload'

import * as PlayerAction from '../../../action/Player';
import path from '../../../path';

const deleteIcon = require('../../../Image/delete.jpg');

class AddPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Player: { id: "", firstName: "", lastName: "", dob: "", gender: 1, description: "", playerImage: [], showimage: true },
            fieldsErrors: { firstName: '', lastName: '', dob: '', playerImage: '' },
            fieldsValid: { firstName: false, lastName: false, dob: false, playerImage: "false" },
            formValid: false
        }
    }
    componentWillReceiveProps(nextProps) {
        let Player = nextProps.data.Player;
        if (nextProps.data.Player) {
            if (nextProps.data.Edit) {
                this.setState({
                    Player: Player,
                    formValid: true,
                    fieldsValid: { firstName: true, lastName: true, dob: true, playerImage: "true" },
                })
            }
            else {
                this.setState({
                    Player: Player,
                    formValid: false,
                    fieldsValid: { firstName: false, lastName: false, dob: false, playerImage: "false" },
                })
            }
        }
    }
    genderChangeHandler(e) {
        let gender = 0;
        if (e.target.checked) {
            (e.target.value === "Female") ? gender = 2 : gender = 1;
            this.setState({
                Player: {
                    ...this.state.Player,
                    gender: gender
                }
            })
        }
    }

    imageChangedHandler(image) {    
        this.setState({
            Player: {
                ...this.state.Player,
                playerImage: image
            }
        })
        this.validateField("playerImage", "true");
    }

    inputChangedHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "gender") {
            this.genderChangeHandler(e);
        }
        else {
            this.setState({
                Player: {
                    ...this.state.Player,
                    [name]: value
                }
            }, () => { this.validateField(name, value) })
        }
    }

    cancelImageClick(e) {
        e.preventDefault();
        this.setState({
            Player: {
                ...this.state.Player,
                showimage: false
            }
        })
        this.validateField("playerImage", "false");
    }

    calculateAge(dobString) {
        var dob = new Date(dobString);
        var ageDifMs = Date.now() - dob.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds 
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    validateField(fieldName, value) {

        var fieldValidationErrors = this.state.fieldsErrors;
        var fieldValidation = this.state.fieldsValid;

        switch (fieldName) {
            case 'firstName':
                fieldValidation.firstName = /^[a-zA-Z 0-9]+$/.test(value);
                fieldValidationErrors.firstName = fieldValidation.firstName ? '' : ' Only Alphabets Allow';
                break;

            case 'lastName':
                fieldValidation.lastName = /^[a-zA-Z 0-9]+$/.test(value);
                fieldValidationErrors.lastName = fieldValidation.lastName ? '' : ' Only Alphabets Allow'
                break;

            case 'dob':
                let date = value.split(0, 4);
                fieldValidation.dob = ((this.calculateAge(value) > 5) && (/(?:(?:19|20)[0-9]{2})/.test(date)));
                fieldValidationErrors.dob = fieldValidation.dob ? '' : "Invalid date of birth"
                break;

            case 'playerImage':
                fieldValidation.playerImage = value;
                fieldValidationErrors.playerImage = fieldValidation.playerImage === "true" ? '' : "Must select player image"
                break;

            default:
                break;
        }
        this.setState({
            fieldsErrors: fieldValidationErrors,
            fieldsValid: fieldValidation
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.fieldsValid.firstName &&
                this.state.fieldsValid.lastName &&
                this.state.fieldsValid.dob &&
                (this.state.fieldsValid.playerImage === "true")
        });
    }



    btnSubmitClick = (e) => {
        e.preventDefault();
        if (this.state.formValid) {
            let formdata = new FormData();
            formdata.append("firstName", this.state.Player.firstName);
            formdata.append("lastName", this.state.Player.lastName);
            formdata.append("dob", this.state.Player.dob);
            formdata.append("gender", this.state.Player.gender);
            formdata.append("description", this.state.Player.description);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            let loginUserId = this.props.auth.userId;
            if (!this.props.data.Edit) {
                formdata.append("playerImage", this.state.Player.playerImage[0]);
                formdata.append("createdBy", loginUserId);
                this.props.action.Player.addPlayer(formdata, config);
            }
            else {
                let playerId = this.state.Player.id;
                if (!this.state.Player.showimage) {
                    formdata.append("playerImage", this.state.Player.playerImage[0]);
                }
                formdata.append("id", playerId);
                formdata.append("updatedBy", loginUserId);
                this.props.action.Player.updatePlayer(this.state.Player, formdata, config)
            }
            this.props.toggle();
        }
    }
    render() {
        return (
            <div>
                <div style={{ float: "right", margin: "15px" }}>
                    <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
                        <ModalHeader toggle={this.props.toggle} >Player</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="firstName">First Name</Label>
                                    <Input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.inputChangedHandler.bind(this)} defaultValue={this.state.Player.firstName} />
                                    <span style={{ color: "red" }}>{this.state.fieldsErrors.firstName}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="lastName">Last Name</Label>
                                    <Input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.inputChangedHandler.bind(this)} defaultValue={this.state.Player.lastName} />
                                    <span style={{ color: "red" }}>{this.state.fieldsErrors.lastName}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dob">Date Of Birth</Label>
                                    <Input type="date" name="dob" id="dob" placeholder="Date Of Birth" onChange={this.inputChangedHandler.bind(this)} defaultValue={this.state.Player.dob} />
                                    <span style={{ color: "red" }}>{this.state.fieldsErrors.dob}</span>
                                </FormGroup>
                                <FormGroup tag="fieldset">
                                    <Label>Gender</Label>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="gender" onChange={this.inputChangedHandler.bind(this)} value="Male" checked={(this.state.Player.gender) === 1 ? true : false} />Male
                                        </Label>
                                        <Label check>
                                            <Input type="radio" name="gender" onChange={this.inputChangedHandler.bind(this)} value="Female" checked={(this.state.Player.gender) === 2 ? true : false} />Female
                                        </Label>
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input type="textarea" name="description" id="playerDescription" onChange={this.inputChangedHandler.bind(this)} defaultValue={this.state.Player.description} />
                                </FormGroup>
                                {(this.state.Player.showimage) ?
                                    <div align="center">
                                        <img src={path + this.state.Player.playerImage} height="100px" width="100px" alt="" />
                                        <img src={deleteIcon} height="25px" width="25px" onClick={this.cancelImageClick.bind(this)} style={{ marginBottom: "80px", marginLeft: "-20px", opacity: "0.7" }} alt="" />
                                    </div>
                                    : (<div><ImageUploader
                                        withIcon={true}
                                        buttonText="Select Images"
                                        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                        withPreview={true}
                                        onChange={this.imageChangedHandler.bind(this)}
                                        maxFileSize={5242880}
                                        withLabel={false}
                                        singleImage={true}
                                        accept={"image/*"} />
                                        <center><span style={{ color: "red" }}>{this.state.fieldsErrors.playerImage}</span></center></div>)
                                }
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="info" onClick={this.btnSubmitClick.bind(this)}>Submit</Button>
                            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { auth } = state
    return {
        auth: auth
    }
};
const mapDispatchToProps = dispatch => ({
    action: {
        Player: bindActionCreators(PlayerAction, dispatch)
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer)
