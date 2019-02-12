import React, { Component } from 'react';
import UserPanel from '../../UserPanel/userPanel'
import path from '../../../path';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as  showUserMatchesAction from '../../../action/user/Createteam'
import * as  MatchPlayerScore from '../../../action/TournamentMatch'
const banerhome = require('../../../Image/image1.jpg')
class userDashBoard extends Component {
    componentDidMount = () => {
        this.getTournamentMatch();
    }
    getTournamentMatch() {
        let userid = localStorage.getItem("userId")
        this.props.action.UserMatchesteams.Show_My_TeamData(userid);
        this.props.action.MatchPlayerScore.SelectTournamentMatchAction(0, 100, "id", "desc");
    }
    handletornamentteams = (id) => {
        this.props.history.push('/MyTeamPlayer/' + id);
    }
    render() {
        let Tournamentmatchid = []
        this.props.showUserMatches.map(data => {
            if (!Tournamentmatchid.includes(data.tournamentMatchId)) {
                Tournamentmatchid = Tournamentmatchid.concat(data.tournamentMatchId)
            }
            return ""
        })

        let tournamentMatch = '';
        if (this.props.ShowTornamentmatches.length !== 0) {
            tournamentMatch = this.props.ShowTornamentmatches.map((tournamentmatch, key) => {
                if (Tournamentmatchid.includes(parseInt(tournamentmatch.id, 10))) {
                    return <div className="card" style={{ borderRadius: "25px", cursor: "pointer" }} key={key} onClick={() => this.handletornamentteams(tournamentmatch.id)} >
                        <div className="card-body"  >
                            <div style={{ float: "left" }}><img alt="logo" src={path + tournamentmatch.Team1[0].teamLogo} style={{ width: 100 }}   ></img></div>
                            <div style={{ float: "center", margin: "auto", width: "45%", padding: "10px", textAlign: "center" }}>
                                <div>{tournamentmatch.Team1[0].teamName + " Vs " + tournamentmatch.Team2[0].teamName}</div>
                            </div>
                            <div style={{ float: "right" }}><img alt="logo1" src={path + tournamentmatch.Team2[0].teamLogo} style={{ width: 100, marginTop: -55 }} ></img></div>

                        </div>
                    </div>
                }
                return "";
            })

        } else {
            tournamentMatch = "No Data found"
        }
        return (
            <div className="content" >
                <UserPanel></UserPanel>
                <div className="row" style={{ backgroundRepeat: "none",marginTop:"-16px" }} >
                    <div className="col-md-6" style={{ backgroundImage: `url(${banerhome})` }}>
                    </div>
                    <div className="col-md-6" style={{ height: "630px", overflow: "scroll" }}>
                        <div className="card" style={{ borderRadius: "25px" }}>
                            <div className="card-header" style={{ backgroundColor: "gainsboro", textAlign: "center" }} >
                                <h2>Matches</h2>
                            </div>
                            <div className="card-body" style={{ backgroundColor: "gainsboro" }} >
                                {tournamentMatch}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        showUserMatches: state.CreateteamReducer.TeamData,
        ShowTornamentmatches: state.TournamentMatchs.allmatchs,
    }
};
const mapDispatchToProps = dispatch => ({
    action: {
        MatchPlayerScore: bindActionCreators(MatchPlayerScore, dispatch),
        UserMatchesteams: bindActionCreators(showUserMatchesAction, dispatch)
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(userDashBoard);