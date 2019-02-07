// import React, { Component } from 'react';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Table, Button, Input, ButtonGroup } from 'reactstrap';
// import { Modal, message } from 'antd';

// import * as  MatchPlayerScore from '../../action/matchPlayerScore'
// import { PanelHeader } from "components";
// import * as TournamentMatch from '../../action/TournamentMatch'
// import ShowMatchPlayerScore from '../TournamentMatchPlayerScore/ShowMatchPlayerScore'

// class TournamenMatchPlayerScore extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             visible: false,
//             matchPlayerScore: [],
//             teamName: ""
//         };
//     }

//     componentDidMount() {
//         this.getTournamentMatch();
//         this.getMatchPlayerScore(0, 100, "id", "DESC");
//     }

//     getTournamentMatch() {
//         this.props.action.TournamentMatches.SelectTournamentMatchAction(0, 100, "id", "desc");
//     }
//     getMatchPlayerScore(offset, perPageRecord, fieldName, order) {
//         this.props.action.MatchPlayerScore.getTournamentMatchPlayerScore(offset, perPageRecord, fieldName, order);
//     }
//     toggleMatchPlayerScore=()=>{
//         this.setState({
//             visible: !this.state.visible
//         });
//     }

// <<<<<<< HEAD
//     render() {
// <<<<<<< HEAD
// =======
// =======
//     getTournamentMatchPlayerScoreByMatch(tournamentId, tournamentMatchId, teamName) {
// >>>>>>> 6124d53229f374bb68b2a94028a100cdbe3ebe44
// >>>>>>> 50fd3db6bf5747078f571e3d65c22737d2d01005
//         let matchPlayerScore = '';
//         if (this.props.MatchPlayerScore.tournamentMatchPlayerScore) {
//             matchPlayerScore = this.props.MatchPlayerScore.tournamentMatchPlayerScore.map(matchplayerscore => {
//                 return (
//                     (matchplayerscore.tournamentId === tournamentId &&
//                         matchplayerscore.tournamentMatchId === tournamentMatchId)
//                         ? matchplayerscore : '')
//             })
//             this.setState(
//                 {
//                     matchPlayerScore: matchPlayerScore,
//                     teamName: teamName,
//                     visible: true
//                 })
//         }
//     }


//     render() {
//         // console.log(this.state.matchPlayerScore);
//         let tournamentMatch = '';
//         let start = 0;
//         if (this.props.TournamentMatches.tournamentmatchs) {
//             start = 0;
//             tournamentMatch = this.props.TournamentMatches.tournamentmatchs.map((tournamentmatch, key) => {
//                 return <tr key={key} style={{ textAlign: "center" }} >
//                     <td>{start++}</td>
//                     <td>{tournamentmatch.Tournament.tournamentName}</td>
//                     <td>
//                         <Button color="info" onClick={() => this.getTournamentMatchPlayerScoreByMatch(tournamentmatch.tournamentId, tournamentmatch.id, tournamentmatch.Team1[0].teamName)} >
//                             {tournamentmatch.Team1[0].teamName}
//                         </Button>&nbsp;
//                     <b>VS</b>&nbsp;
//                      <Button color="info" onClick={() => this.getTournamentMatchPlayerScoreByMatch(tournamentmatch.tournamentId, tournamentmatch.id, tournamentmatch.Team1[0].teamName)}>
//                             {tournamentmatch.Team2[0].teamName}
//                         </Button>
//                     </td>
//                     <td><Button color="info" style={{ width: "62px" }} >Edit</Button>&nbsp;
//                 <Button color="danger" >Delete</Button></td>
//                 </tr>
//             })
//         } else { return <tr>No Match Found</tr> }
//         return (
//             <div>
//                 <PanelHeader size="sm" />
//                 <div style={{ marginLeft: "15px" }}>
//                     {/* <AddPlayer isOpen={this.state.modal} toggle={this.btnAddClick.bind(this)} data={this.state}> </AddPlayer> */}
//                     <Modal title={this.state.teamName}
//                         visible={this.state.visible}
//                         onCancel={this.toggleMatchPlayerScore}
//                         footer={null}>
//                         <ShowMatchPlayerScore matchPlayerScore={this.state.matchPlayerScore} visible={this.state.visible} />
//                     </Modal>
//                     <div style={{ marginTop: "50px" }}>
//                         <div style={{ float: "right" }}>
//                             Show entries
//                            <Input type="select" name="select" >
//                                 <option value="5">5</option>
//                                 <option value="10">10</option>
//                                 <option value="25">25</option>
//                                 <option value="50">50</option>
//                                 <option value="100">100</option>
//                             </Input>
//                         </div>
//                         <div style={{ float: "left" }}>
//                             <Button color="info" style={{ width: "100%" }}>Add Player</Button>
//                         </div>
//                     </div>

//                     <Table hover>
//                         <thead className="thead-dark">
//                             <tr style={{ textAlign: "center" }}>
//                                 <th>#</th>
//                                 <th style={{ cursor: "pointer" }}>Tournament</th>
//                                 <th style={{ cursor: "pointer" }}>Match</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {tournamentMatch}
//                         </tbody>
//                     </Table>
//                     <ButtonGroup>
//                         <Button color="info" name="Prev">Prev</Button> &nbsp;
//                         <Button color="info" name="Next">Next</Button>
//                     </ButtonGroup>
//                 </div>
//             </div>
//         );
//     }
// }
// const mapStateToProps = (state) => {
//     const { MatchPlayerScore, TournamentMatchs } = state
//     return {
//         MatchPlayerScore: MatchPlayerScore,
//         TournamentMatches: TournamentMatchs
//     }
// };

// const mapDispatchToProps = dispatch => ({
//     action: {
//         MatchPlayerScore: bindActionCreators(MatchPlayerScore, dispatch),
//         TournamentMatches: bindActionCreators(TournamentMatch, dispatch)
//     }
// });
// export default connect(mapStateToProps, mapDispatchToProps)(TournamenMatchPlayerScore);