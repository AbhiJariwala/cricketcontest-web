import React from 'react';
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tournamentAction from '../../../action/Tournament';
import * as tournamentPointAction from '../../../action/tournamentPoint';
import path from '../../../path';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tournamentId: 0,
            runBox: 0,
            sixBox: 0,
            fourBox: 0,
            wicketBox: 0,
            stumpingBox: 0,
            catchBox: 0,
            Runs: {},
            Six: {},
            Four: {},
            Wicket: {},
            Stumping: {},
            Catch: {},
            submitted: false
        };
        this.addScore = this.addScore.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.tournamentNameChangedHandler = this.tournamentNameChangedHandler.bind(this);
        this.runChangeHandler = this.runChangeHandler.bind(this);
        this.sixChangeHandler = this.sixChangeHandler.bind(this);
        this.fourChangeHandler = this.fourChangeHandler.bind(this);
        this.wicketChangeHandler = this.wicketChangeHandler.bind(this);
        this.stumpingChangeHandler = this.stumpingChangeHandler.bind(this);
        this.catchChangeHandler = this.catchChangeHandler.bind(this);
    }

    componentDidMount() {
        this.props.action.Tournaments.fetchTournamentDataAction();
    }

    toggleModal() {
        this.props.toggle();
        this.setState({
            tournamentId: 0,
            runBox: 0,
            sixBox: 0,
            fourBox: 0,
            wicketBox: 0,
            stumpingBox: 0,
            catchBox: 0
        });
    }

    tournamentNameChangedHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    addScore(e) {
        e.preventDefault();
        let points = {
            Runs: this.state.Runs,
            Six: this.state.Six,
            Four: this.state.Four,
            Wicket: this.state.Wicket,
            Stumping: this.state.Stumping,
            Catch: this.state.Catch
        }
        let finalPoints = {
            tournamentId: this.state.tournamentId,
            pointJson: JSON.stringify(points)
        }
        this.props.action.TournamentPoint.addTournamentPointScore(finalPoints, 0, 5, "id", "desc");
        this.toggleModal();
    }

    runChangeHandler = (e, value) => {
        this.setState({
            Runs: {
                ...this.state.Runs,
                [value]: {
                    ...this.state.Runs[value],
                    [e.target.name]: e.target.value
                }
            }
        });
    }

    sixChangeHandler = (e, value) => {
        this.setState({
            Six: {
                ...this.state.Six,
                [value]: {
                    ...this.state.Six[value],
                    [e.target.name]: e.target.value
                }
            }
        });
    }

    fourChangeHandler = (e, value) => {
        this.setState({
            Four: {
                ...this.state.Four,
                [value]: {
                    ...this.state.Four[value],
                    [e.target.name]: e.target.value
                }
            }
        });
    }

    wicketChangeHandler = (e, value) => {
        this.setState({
            Wicket: {
                ...this.state.Wicket,
                [value]: {
                    ...this.state.Wicket[value],
                    [e.target.name]: e.target.value
                }
            }
        });
    }

    stumpingChangeHandler = (e, value) => {
        this.setState({
            Stumping: {
                ...this.state.Stumping,
                [value]: {
                    ...this.state.Stumping[value],
                    [e.target.name]: e.target.value
                }
            }
        });
    }

    catchChangeHandler = (e, value) => {
        this.setState({
            Catch: {
                ...this.state.Catch,
                [value]: {
                    ...this.state.Catch[value],
                    [e.target.name]: e.target.value
                }
            }
        });
    }

    addBox = (box) => {
        if (box === "Runs") {
            this.setState({ runBox: this.state.runBox + 1 })
        } else if (box === "Six") {
            this.setState({ sixBox: this.state.sixBox + 1 })
        } else if (box === "Four") {
            this.setState({ fourBox: this.state.fourBox + 1 })
        } else if (box === "Wicket") {
            this.setState({ wicketBox: this.state.wicketBox + 1 })
        } else if (box === "Stumping") {
            this.setState({ stumpingBox: this.state.stumpingBox + 1 })
        } else if (box === "Catch") {
            this.setState({ catchBox: this.state.catchBox + 1 })
        }
    }

    removeBox = (box) => {
        if (box === "Runs") {
            this.setState({ runBox: this.state.runBox - 1 })
        } else if (box === "Six") {
            this.setState({ sixBox: this.state.sixBox - 1 })
        } else if (box === "Four") {
            this.setState({ fourBox: this.state.fourBox - 1 })
        } else if (box === "Wicket") {
            this.setState({ wicketBox: this.state.wicketBox - 1 })
        } else if (box === "Stumping") {
            this.setState({ stumpingBox: this.state.stumpingBox - 1 })
        } else if (box === "Catch") {
            this.setState({ catchBox: this.state.catchBox - 1 })
        }
    }

    render() {

        let tournamentPointArr = [], notSelectedTournament = [];
        tournamentPointArr = this.props.TournamentPoint.map(tournamentPoint => tournamentPoint.tournamentId);
        let tournamentNameOption = "";
        if (this.props.TournamentPoint.length !== 0) {
            notSelectedTournament = this.props.Tournaments.filter(tournament => !tournamentPointArr.includes(tournament.id));
            tournamentNameOption = notSelectedTournament.map(tournament => {
                return (
                    <option key={tournament.id} value={tournament.id}>{tournament.tournamentName}</option>
                )
            })
        }
        else {
            if (this.props.Tournaments) {
                tournamentNameOption = this.props.Tournaments.map(tournament => {
                    return (
                        <option key={tournament.id} value={tournament.id}>{tournament.tournamentName}</option>
                    )
                })
            }
        }

        let runTotalBox = [], renderRunBox;
        for (let i = 0; i < this.state.runBox; i++) {
            runTotalBox.push(i);
        }
        renderRunBox = runTotalBox.map((value) => {
            return (
                <div key={value}>
                    {value === 0
                        ? <div>
                            <img onClick={() => this.addBox("Runs")} alt="plus" src={path + 'plusPoints.png'} style={{ width: "20px", height: "20px", marginRight: "5px" }}></img>
                            {this.state.runBox >= 2
                                ? <img onClick={() => this.removeBox("Runs")} alt="minus" src={path + 'minusPoints.png'} style={{ width: "20px", height: "20px" }}></img>
                                : ""}
                        </div>
                        : ""}
                    <div style={{ marginTop: "5px" }}>
                        <input type="number" name={"from"} style={{ width: "20%" }} onChange={(e) => this.runChangeHandler(e, value)} />
                        &nbsp;<b>to</b>&nbsp;<input type="number" name={"to"} style={{ width: "20%" }} onChange={(e) => this.runChangeHandler(e, value)} />
                        &nbsp;<b>=</b>&nbsp;<input type="number" name={"point"} style={{ width: "20%" }} onChange={(e) => this.runChangeHandler(e, value)} />
                    </div>
                </div>
            );
        });

        let sixTotalBox = [], renderSixBox;
        for (let i = 0; i < this.state.sixBox; i++) {
            sixTotalBox.push(i);
        }
        renderSixBox = sixTotalBox.map((value) => {
            return (
                <div key={value}>
                    {value === 0
                        ? <div >
                            <img onClick={() => this.addBox("Six")} alt="plus" src={path + 'plusPoints.png'} style={{ width: "20px", height: "20px", marginRight: "5px" }}></img>
                            {this.state.sixBox >= 2
                                ? <img onClick={() => this.removeBox("Six")} alt="minus" src={path + 'minusPoints.png'} style={{ width: "20px", height: "20px" }}></img>
                                : ""}
                        </div>
                        : ""}
                    <div style={{ marginTop: "5px" }}>
                        <input type="number" name={"from"} style={{ width: "20%" }} onChange={(e) => this.sixChangeHandler(e, value)} />
                        &nbsp;<b>to</b>&nbsp;<input type="number" name={"to"} style={{ width: "20%" }} onChange={(e) => this.sixChangeHandler(e, value)} />
                        &nbsp;<b>=</b>&nbsp;<input type="number" name={"point"} style={{ width: "20%" }} onChange={(e) => this.sixChangeHandler(e, value)} />
                    </div>
                </div>
            );
        });

        let fourTotalBox = [], renderFourBox;
        for (let i = 0; i < this.state.fourBox; i++) {
            fourTotalBox.push(i);
        }
        renderFourBox = fourTotalBox.map((value) => {
            return (
                <div key={value}>
                    {value === 0
                        ? <div >
                            <img onClick={() => this.addBox("Four")} alt="plus" src={path + 'plusPoints.png'} style={{ width: "20px", height: "20px", marginRight: "5px" }}></img>
                            {this.state.fourBox >= 2
                                ? <img onClick={() => this.removeBox("Four")} alt="minus" src={path + 'minusPoints.png'} style={{ width: "20px", height: "20px" }}></img>
                                : ""}
                        </div>
                        : ""}
                    <div style={{ marginTop: "5px" }}>
                        <input type="number" name={"from"} style={{ width: "20%" }} onChange={(e) => this.fourChangeHandler(e, value)} />
                        &nbsp;<b>to</b>&nbsp;<input type="number" name={"to"} style={{ width: "20%" }} onChange={(e) => this.fourChangeHandler(e, value)} />
                        &nbsp;<b>=</b>&nbsp;<input type="number" name={"point"} style={{ width: "20%" }} onChange={(e) => this.fourChangeHandler(e, value)} />
                    </div>
                </div>
            );
        });

        let wicketTotalBox = [], renderWicketBox;
        for (let i = 0; i < this.state.wicketBox; i++) {
            wicketTotalBox.push(i);
        }
        renderWicketBox = wicketTotalBox.map((value) => {
            return (
                <div key={value}>
                    {value === 0
                        ? <div >
                            <img onClick={() => this.addBox("Wicket")} alt="plus" src={path + 'plusPoints.png'} style={{ width: "20px", height: "20px", marginRight: "5px" }}></img>
                            {this.state.wicketBox >= 2
                                ? <img onClick={() => this.removeBox("Wicket")} alt="minus" src={path + 'minusPoints.png'} style={{ width: "20px", height: "20px" }}></img>
                                : ""}
                        </div>
                        : ""}
                    <div style={{ marginTop: "5px" }}>
                        <input type="number" name={"from"} style={{ width: "20%" }} onChange={(e) => this.wicketChangeHandler(e, value)} />
                        &nbsp;<b>to</b>&nbsp;<input type="number" name={"to"} style={{ width: "20%" }} onChange={(e) => this.wicketChangeHandler(e, value)} />
                        &nbsp;<b>=</b>&nbsp;<input type="number" name={"point"} style={{ width: "20%" }} onChange={(e) => this.wicketChangeHandler(e, value)} />
                    </div>
                </div>
            );
        });

        let stumpingTotalBox = [], renderStumpingBox;
        for (let i = 0; i < this.state.stumpingBox; i++) {
            stumpingTotalBox.push(i);
        }
        renderStumpingBox = stumpingTotalBox.map((value) => {
            return (
                <div key={value}>
                    {value === 0
                        ? <div >
                            <img onClick={() => this.addBox("Stumping")} alt="plus" src={path + 'plusPoints.png'} style={{ width: "20px", height: "20px", marginRight: "5px" }}></img>
                            {this.state.stumpingBox >= 2
                                ? <img onClick={() => this.removeBox("Stumping")} alt="minus" src={path + 'minusPoints.png'} style={{ width: "20px", height: "20px" }}></img>
                                : ""}
                        </div>
                        : ""}
                    <div style={{ marginTop: "5px" }}>
                        <input type="number" name={"from"} style={{ width: "20%" }} onChange={(e) => this.stumpingChangeHandler(e, value)} />
                        &nbsp;<b>to</b>&nbsp;<input type="number" name={"to"} style={{ width: "20%" }} onChange={(e) => this.stumpingChangeHandler(e, value)} />
                        &nbsp;<b>=</b>&nbsp;<input type="number" name={"point"} style={{ width: "20%" }} onChange={(e) => this.stumpingChangeHandler(e, value)} />
                    </div>
                </div>
            );
        });

        let catchTotalBox = [], renderCatchBox;
        for (let i = 0; i < this.state.catchBox; i++) {
            catchTotalBox.push(i);
        }
        renderCatchBox = catchTotalBox.map((value) => {
            return (
                <div key={value}>
                    {value === 0
                        ? <div >
                            <img onClick={() => this.addBox("Catch")} alt="plus" src={path + 'plusPoints.png'} style={{ width: "20px", height: "20px", marginRight: "5px" }}></img>
                            {this.state.catchBox >= 2
                                ? <img onClick={() => this.removeBox("Catch")} alt="minus" src={path + 'minusPoints.png'} style={{ width: "20px", height: "20px" }}></img>
                                : ""}
                        </div>
                        : ""}
                    <div style={{ marginTop: "5px" }}>
                        <input type="number" name={"from"} style={{ width: "20%" }} onChange={(e) => this.catchChangeHandler(e, value)} />
                        &nbsp;<b>to</b>&nbsp;<input type="number" name={"to"} style={{ width: "20%" }} onChange={(e) => this.catchChangeHandler(e, value)} />
                        &nbsp;<b>=</b>&nbsp;<input type="number" name={"point"} style={{ width: "20%" }} onChange={(e) => this.catchChangeHandler(e, value)} />
                    </div>
                </div>
            );
        });

        return (
            <Container>
                <Modal isOpen={this.props.isOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add Points</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="tournamentName">Select Tournament Name</Label>
                                <Input
                                    type="select" name="tournamentId" id="tournamentName"
                                    onChange={this.tournamentNameChangedHandler}>
                                    <option value="" disabled="" style={{ display: "none" }}>Select Tournament</option>
                                    {tournamentNameOption}
                                </Input>
                                {(this.state.submitted && this.state.tournamentId === 0) ?
                                    <div><br />
                                        <Alert color="warning">
                                            Please select a tournament
                                            </Alert>
                                    </div> : null
                                }
                            </FormGroup>
                        </Form>
                        {this.state.runBox
                            ? <div style={{ textAlign: "center", marginTop: "10px" }}>
                                <h6>Runs</h6>{renderRunBox}
                            </div> : ""}
                        {this.state.sixBox
                            ? <div style={{ textAlign: "center", marginTop: "10px" }}>
                                <h6>Six</h6>{renderSixBox}
                            </div> : ""}
                        {this.state.fourBox
                            ? <div style={{ textAlign: "center", marginTop: "10px" }}>
                                <h6>Four</h6>{renderFourBox}
                            </div> : ""}
                        {this.state.wicketBox
                            ? <div style={{ textAlign: "center", marginTop: "10px" }}>
                                <h6>Wicket</h6>{renderWicketBox}
                            </div> : ""}
                        {this.state.stumpingBox
                            ? <div style={{ textAlign: "center", marginTop: "10px" }}>
                                <h6>Stumping</h6>{renderStumpingBox}
                            </div> : ""}
                        {this.state.catchBox
                            ? <div style={{ textAlign: "center", marginTop: "10px" }}>
                                <h6>Catch</h6>{renderCatchBox}
                            </div> : ""}
                        <div style={{ textAlign: "center" }}>
                            {this.state.runBox === 0
                                ? <Button color="info" onClick={() => this.addBox("Runs")}>Add Runs</Button> : ""}
                            {this.state.sixBox === 0
                                ? <Button color="info" onClick={() => this.addBox("Six")}>Add Six</Button> : ""}
                            {this.state.fourBox === 0
                                ? <Button color="info" onClick={() => this.addBox("Four")}>Add Four</Button> : ""}
                        </div>
                        <div style={{ textAlign: "center" }}>
                            {this.state.wicketBox === 0
                                ? <Button color="info" onClick={() => this.addBox("Wicket")}>Add Wicket</Button> : ""}
                            {this.state.stumpingBox === 0
                                ? <Button color="info" onClick={() => this.addBox("Stumping")}>Add Stumping</Button> : ""}
                            {this.state.catchBox === 0
                                ? <Button color="info" onClick={() => this.addBox("Catch")}>Add Ctach</Button> : ""}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.runBox >= 1 && this.state.sixBox >= 1 && this.state.fourBox >= 1 && this.state.wicketBox >= 1 && this.state.stumpingBox >= 1 && this.state.catchBox >= 1
                            ? <Button color="info" onClick={this.addScore}>submit</Button> : ""}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}
const mapStateToProps = state => ({
    Tournaments: state.Tournament.Tournamentss,
    TournamentPoint: state.TournamentPoint.get_points
});
const mapDispatchToProps = dispatch => ({
    action: {
        Tournaments: bindActionCreators(tournamentAction, dispatch),
        TournamentPoint: bindActionCreators(tournamentPointAction, dispatch)
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);