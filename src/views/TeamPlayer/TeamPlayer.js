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
                <div className="content">
                    {this.state.modal ? <AddTeamPlayer isOpen={this.state.modal} toggle={this.toggle} /> : null }
                    <div style={{ marginTop: "50px" }}>
                        <div style={{ float: "right" }}>
                            Show entries
                            <Input type="select" name="select" id="exampleSelect">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </Input>
                        </div>

                        <div style={{ float: "left" }}>
                            <Button color="info" onClick={this.toggle}>Add </Button>
                        </div>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Action</th>
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
                        <Button color="info">Prev</Button>&nbsp;
                        <Button color="info">Next</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default TeamPlayer;

