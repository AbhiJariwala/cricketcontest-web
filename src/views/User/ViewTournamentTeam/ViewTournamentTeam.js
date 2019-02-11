import React, { Component } from 'react';
import UserPanel from '../../UserPanel/userPanel'
import path from '../../../path';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as  showUserMatchesAction from '../../../action/user/Createteam'
import * as  MatchPlayerScore from '../../../action/TournamentMatch'
import Countdown from './displayTimer';
const banerhome = require('../../../Image/image1.jpg')
class userDashBoard extends Component {
    componentDidMount = () => {
        this.getTournamentMatch();
    }
    getTournamentMatch() {
        let userid=localStorage.getItem("userId")
        this.props.action.UserMatchesteams.Show_My_TeamData(userid);
        this.props.action.MatchPlayerScore.SelectTournamentMatchAction(0, 100, "id", "desc");
    }
    handletornamentteams = (id) => {

        this.props.history.push('/CreateTeam/' + id);
    }
    render() {
        let Tournamentmatchid=[]
        this.props.showUserMatches.map(data=>{            
            if(!Tournamentmatchid.includes(data.tournamentMatchId)){
                Tournamentmatchid=Tournamentmatchid.concat(data.tournamentMatchId)
            }            
        })

        let date = new Date();
        var date1 = date.getDate();
        let month = date.getMonth(); //Be careful! January is 0 not 1
        let year = date.getFullYear();
        let dateString, m, d;
        m = month + 1;
        d = date1;
        if (m < 10) {
            m = "0" + m;
        }
        if (d < 10) {
            d = "0" + d;
        }
        dateString = year + "-" + (m) + "-" + d;
        let tournamentMatch = '';
        if (this.props.ShowTornamentmatches.length !== 0) {
            tournamentMatch = this.props.ShowTornamentmatches.map((tournamentmatch, key) => {
                if(!Tournamentmatchid.includes(parseInt(tournamentmatch.id,10))){ 
                if (dateString <= tournamentmatch.matchDate.substring(0, 10)) {
                    return <div className="card" style={{ borderRadius: "25px", cursor: "pointer" }} key={key} onClick={() => this.handletornamentteams(tournamentmatch.id)} >
                        <div className="card-body"  >
                            <div style={{ float: "left" }}><img alt="logo" src={path + tournamentmatch.Team1[0].teamLogo} style={{ width: 100 }}   ></img></div>
                            <div style={{ float: "center", margin: "auto", width: "45%", padding: "10px", textAlign: "center" }}>
                                <div>{tournamentmatch.Team1[0].teamName + " Vs " + tournamentmatch.Team2[0].teamName}</div>
                                <div><Countdown date={tournamentmatch.matchDate} /></div>
                            </div>
                            <div style={{ float: "right" }}><img alt="logo1" src={path + tournamentmatch.Team2[0].teamLogo} style={{ width: 100, marginTop: -100 }} ></img></div>

                        </div>
                    </div>
                }
            }
                return "";
            })

        } else {
            tournamentMatch = "No Data found"
        }
        return (
            <div className="content" >
                <UserPanel></UserPanel>
                <div className="row" style={{ backgroundRepeat: "none" }} >
                    <div className="col-md-6" style={{ backgroundImage: `url(${banerhome})` }}>
                    </div>
                    <div className="col-md-6" style={{ height: "630px", overflow: "scroll" }}>
                        <div className="card" style={{ borderRadius: "25px" }}>
                            <div className="card-header" style={{ backgroundColor: "gainsboro", textAlign: "center" }} >
                                <h2>Upcoming Matches</h2>
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
        showUserMatches : state.CreateteamReducer.TeamData,
        ShowTornamentmatches: state.TournamentMatchs.allmatchs
    }
};
const mapDispatchToProps = dispatch => ({
    action: {
        MatchPlayerScore: bindActionCreators(MatchPlayerScore, dispatch),
        UserMatchesteams: bindActionCreators(showUserMatchesAction, dispatch)        
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(userDashBoard);

