import React, { Component } from 'react'
import { Table, Container, Button, Input, ButtonGroup } from "reactstrap";

import { PanelHeader } from "components";

// import icons from "variables/icons";

import AddTeamPlayer from './AddTeamPlayer/AddTeamPlayer'

class TeamPlayer extends Component {

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
            <div>
                <PanelHeader size="sm" />
                <Container>
                    <AddTeamPlayer />
                    {/* <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Tournament</ModalHeader>
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
                            <Button color="primary" onClick={this.toggle}>Submit</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal> */}
                    <div style={{ width: "10%", margin: "25px" }}>
                        <div>
                            Show entries<Input type="select" name="select" id="exampleSelect">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </Input></div>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                                <td> <Button color="info" onClick={this.toggle} style={{ width: "62px" }}>Edit</Button>{' '}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <ButtonGroup>
                        <Button>Prev</Button> &nbsp;
                    <Button>Next</Button>
                    </ButtonGroup>
                </Container>

            </div>
        );
    }
}

export default TeamPlayer;

