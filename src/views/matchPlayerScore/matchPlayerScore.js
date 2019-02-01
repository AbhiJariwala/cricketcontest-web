import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Input } from 'reactstrap';

import AddPlayerScore from './addPlayerScore/addPlayerScore';
import { PanelHeader } from "components";

class MatchPlayerScore extends Component {

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
                    <AddPlayerScore isOpen={this.state.modal} toggle={this.toggle} dataid={this.state.Editdataid}></AddPlayerScore>

                    <div style={{ marginTop: "50px" }}>
                        <div style={{ float: "right" }}>
                            Show entries
                            <Input type="select" name="select" id="exampleSelect">
                                <option>5</option>
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </Input>
                        </div>
                        <div style={{ float: "left" }}>
                            <Button color="info" onClick={this.toggle} style={{ width: "70px" }}>Add</Button>
                        </div>
                    </div>

                    <Table responsive hover>
                        <thead className="thead-dark">
                            <tr style={{ textAlign: "center" }}>
                                <th>Tournament</th>
                                <th>Match</th>
                                <th>Player</th>
                                <th>Wicket</th>
                                <th>Run</th>
                                <th>Catch</th>
                                <th>Six</th>
                                <th>Four</th>
                                <th>Stumping</th>
                                <th>Score</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ textAlign: "center" }}>
                                <td>IPL1</td>
                                <td>IPL12</td>
                                <td>Sachin</td>
                                <td>5</td>
                                <td>5</td>
                                <td>5</td>
                                <td>5</td>
                                <td>5</td>
                                <td>5</td>
                                <td>5</td>
                                <td><Button color="info" onClick={this.toggle} style={{ width: "70px" }}>Edit</Button>{'  '} 
                                    <Button style={{ width: "70px", backgroundColor:"#FF0000" }}>Delete</Button>
                                </td>
                            </tr>
                            {/*data*/}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default MatchPlayerScore;