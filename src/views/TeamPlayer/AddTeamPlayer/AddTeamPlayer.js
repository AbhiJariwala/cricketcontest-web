import React, { Component } from 'react';
import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
// import TeamPlayer from '../TeamPlayer';
class AddTeamPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }


    render() {
        return (
            <Container>
                <div style={{ float: "right", margin: "15px" }}>
                    <Button color="info" onClick={this.toggle}>Add Team Player</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Team Player</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="tournamentName">Tournament Name:</Label>
                                    <Input type="select" name="select" id="tournamentName">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="teamName">Team Name</Label>
                                    <Input type="select" name="teamName" id="teamName">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Players">Players</Label>
                                    <Input type="select" name="Players" id="Players" multiple>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="info" onClick={this.toggle}>Submit</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>

            </Container>
        );
    }
}
export default AddTeamPlayer
