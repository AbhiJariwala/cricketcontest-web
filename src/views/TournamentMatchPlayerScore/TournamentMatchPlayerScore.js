import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button, Input, ButtonGroup } from 'reactstrap';

import * as  MatchPlayerScore from '../../action/matchPlayerScore'
import { PanelHeader } from "components";
// import "./TournamenMatchPlayerScore/TournamenMatchPlayerScore.css"

class TournamenMatchPlayerScore extends Component {
    componentDidMount() {
        this.getMatchPlayerScore(1, 100, "id", "DESC");
    }

    getTournamentMatch(){
        
    }
    getMatchPlayerScore(offset, perPageRecord, fieldName, order) {
        this.props.action.MatchPlayerScore.getTournamentMatchPlayerScore(offset, perPageRecord, fieldName, order);
    }

    render() {
        console.log(this.props.MatchPlayerScore.tournamentMatchPlayerScore);
        let matchPlayerScore = '';
        let start = 0;
        if (this.props.MatchPlayerScore.tournamentMatchPlayerScore) {
            start = 0;
            matchPlayerScore = this.props.MatchPlayerScore.tournamentMatchPlayerScore.map((tournamenMatchPlayerScore, key) => {
                return <tr key={key} style={{ textAlign: "center" }} >
                    <td>{start++}</td>
                    <td>{tournamenMatchPlayerScore.Tournaments[0].tournamentName}</td>
                    <td><Button className="info">{tournamenMatchPlayerScore.Tournaments[0].TournamentMatches[0].Team1[0].teamName}</Button>&nbsp;
                    <b>VS</b>&nbsp;
                     <Button className="info">{tournamenMatchPlayerScore.Tournaments[0].TournamentMatches[0].Team2[0].teamName}</Button></td>
                    {/* <td>{tournamenMatchPlayerScore.Tournaments[0].TournamentMatches.}</td> */}
                    <td><Button color="info" style={{ width: "62px" }} >Edit</Button>&nbsp;
                <Button color="danger"  >Delete</Button></td>
                </tr>
            })
        } else { return <tr>No Player Found</tr> }
        return (
            <div>
                <PanelHeader size="sm" />
                <div style={{ marginLeft: "15px" }}>
                    {/* <AddPlayer isOpen={this.state.modal} toggle={this.btnAddClick.bind(this)} data={this.state}> </AddPlayer> */}
                    <div style={{ marginTop: "50px" }}>
                        <div style={{ float: "right" }}>
                            Show entries
                           <Input type="select" name="select" >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </Input>
                        </div>
                        <div style={{ float: "left" }}>
                            <Button color="info" style={{ width: "100%" }}>Add Player</Button>
                        </div>
                    </div>

                    <Table hover>
                        <thead className="thead-dark">
                            <tr style={{ textAlign: "center" }}>
                                <th>#</th>
                                <th style={{ cursor: "pointer" }}>Tournament</th>
                                <th style={{ cursor: "pointer" }}>Match</th>
                                {/* <th style={{ cursor: "pointer" }}>Team Name</th>
                                <th style={{ cursor: "pointer" }}>Player Name</th>
                                <th style={{ cursor: "pointer" }}>Wicket</th>
                                <th style={{ cursor: "pointer" }}>Run</th>
                                <th style={{ cursor: "pointer" }}>Catch</th>
                                <th style={{ cursor: "pointer" }}>Six</th>
                                <th style={{ cursor: "pointer" }}>Four</th>
                                <th style={{ cursor: "pointer" }}>Stumping</th>
                                <th style={{ cursor: "pointer" }}>Score</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matchPlayerScore}
                        </tbody>
                    </Table>
                    <ButtonGroup>
                        <Button color="info" name="Prev">Prev</Button> &nbsp;
                            <Button color="info" name="Next">Next</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }

    // {
    //     let matchPlayerScore = '';
    //     let start = 0;
    //     if (this.props.MatchPlayerScore.tournamenMatchPlayerScore) {
    //         start = 0;
    //         //   start = this.state.pageRecord;
    //         matchPlayerScore = this.props.MatchPlayerScore.tournamenMatchPlayerScore.map((tournamenMatchPlayerScore, key) => {
    //             return <tbody>
    //                 <tr key={key} style={{ textAlign: "center" }} >
    //                     <td>{start++}</td>
    //                     <td>{tournamenMatchPlayerScore.Tournaments.tounamentName}</td>
    //                     <td><Button color="info" style={{ width: "62px" }} >Edit</Button>&nbsp;
    //             <Button color="danger"  >Delete</Button></td>
    //                 </tr>
    //             </tbody>
    //         })
    //     } else { return <p>No Player Found</p> }
    //     return (
    //         <div>
    //             <PanelHeader size="sm" />
    //             <div style={{ marginLeft: "15px" }}>
    //                 {/* <AddPlayer isOpen={this.state.modal} toggle={this.btnAddClick.bind(this)} data={this.state}> </AddPlayer> */}
    //                 <div style={{ marginTop: "50px" }}>
    //                     <div style={{ float: "right" }}>
    //                         Show entries
    //                 <Input type="select" name="select">
    //                             <option value="5">5</option>
    //                             <option value="10">10</option>
    //                             <option value="25">25</option>
    //                             <option value="50">50</option>
    //                             <option value="100">100</option>
    //                         </Input>
    //                     </div>
    //                     <div style={{ float: "left" }}>
    //                         <Button color="info" onClick={this.toggle} style={{ width: "100%" }}>Add Player</Button>
    //                     </div>
    //                 </div>

    //                 <Table hover>
    //                     <thead className="thead-dark">
    //                         <tr style={{ textAlign: "center" }} onClick={this.sortingChangedHandler.bind(this)}>
    //                             <th>#</th>
    //                             <th>Avtar</th>
    //                             <th style={{ cursor: "pointer" }}>Tournament Name</th>
    //                             <th style={{ cursor: "pointer" }}>Match</th>
    //                             <th style={{ cursor: "pointer" }}>Team Name</th>
    //                             <th style={{ cursor: "pointer" }}>Player Name</th>
    //                             <th style={{ cursor: "pointer" }}>Wicket</th>
    //                             <th style={{ cursor: "pointer" }}>Run</th>
    //                             <th style={{ cursor: "pointer" }}>Catch</th>
    //                             <th style={{ cursor: "pointer" }}>Six</th>
    //                             <th style={{ cursor: "pointer" }}>Four</th>
    //                             <th style={{ cursor: "pointer" }}>Stumping</th>
    //                             <th style={{ cursor: "pointer" }}>Score</th>
    //                             <th>Action</th>
    //                         </tr>
    //                     </thead>                    
    //                         {matchPlayerScore}                      
    //                 </Table>
    //                 <ButtonGroup>
    //                     <Button color="info" name="Prev">Prev</Button> &nbsp;
    //                         <Button color="info" name="Next">Next</Button>
    //                 </ButtonGroup>
    //             </div>
    //         </div>
    //     );

}
const mapStateToProps = (state) => {
    const { MatchPlayerScore } = state
    return {
        MatchPlayerScore: MatchPlayerScore
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        MatchPlayerScore: bindActionCreators(MatchPlayerScore, dispatch)
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(TournamenMatchPlayerScore);