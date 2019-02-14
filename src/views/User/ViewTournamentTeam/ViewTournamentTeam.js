import React, { Component } from 'react';
import UserPanel from '../../UserPanel/userPanel'
import path from '../../../path';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as  showUserMatchesAction from '../../../action/user/Createteam';
import * as TournamentAction from '../../../action/Tournament';

class userDashBoard extends Component {
    componentDidMount = () => {
        this.getTournamentMatch();
    }
    getTournamentMatch() {
        let userid = localStorage.getItem("userId")
        this.props.action.UserMatchesteams.Show_My_TeamData(userid);
        this.props.action.Tournament.fetchTournamentAction(0, 100, "desc", "id");
    }
    handletornamentteams = (id) => {
        this.props.history.push('/CreateTeam/' + id);
    }
    render() {
        let tournaments = '';
        if (this.props.Tournaments.length !== 0) {
            tournaments = this.props.Tournaments.map((tournament, i) => {
                return <div key={i} className="card" style={{ borderRadius: "25px", cursor: "pointer" }} onClick={() => this.handletornamentteams(tournament.id)} >
                    <div className="card-body">
                        <div style={{ float: "left", display: "inline-block", border: "1px solid #000" }}><img alt="logo" src={path + tournament.tournamentBanner} style={{ width: "60px", height: "50px" }}></img></div>
                        <div style={{ float: "center", margin: "auto", width: "45%", padding: "10px", textAlign: "center" }}>
                            {tournament.tournamentName}
                        </div>
                    </div>
                </div>
            })

        } else {
            tournaments = "No Data found"
        }

        return (
            <div className="content" >
                <UserPanel></UserPanel>
                <div className="row" style={{ backgroundRepeat: "none", marginTop: "-16px" }} >
                    <div className="col-md-7"></div>
                    <div className="col-md-5" style={{ height: "100%" }}>
                        <div className="card" style={{ borderRadius: "25px" }}>
                            <div className="card-header" style={{ backgroundColor: "gainsboro", textAlign: "center" }} >
                                <h2>Tournaments</h2>
                            </div>
                            <div className="card-body" style={{ backgroundColor: "gainsboro" }} >
                                <h5>{tournaments}</h5>
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
        Tournaments: state.Tournament.Tournaments
    }
};
const mapDispatchToProps = dispatch => ({
    action: {
        UserMatchesteams: bindActionCreators(showUserMatchesAction, dispatch),
        Tournament: bindActionCreators(TournamentAction, dispatch)
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(userDashBoard);

