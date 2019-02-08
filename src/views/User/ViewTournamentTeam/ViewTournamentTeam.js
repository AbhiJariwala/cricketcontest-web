import React, { Component } from 'react';
import UserPanel from '../../UserPanel/userPanel'
import path from '../../../path';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as  MatchPlayerScore from '../../../action/TournamentMatch'
const banerhome = require('../../../Image/image1.jpg')
class userDashBoard extends Component {
    componentDidMount = () => {
        this.getTournamentMatch();
    }
    getTournamentMatch() {
        this.props.action.MatchPlayerScore.SelectTournamentMatchAction(0, 100, "id", "desc");
    }
    handletornamentteams=(id)=>{
        this.props.history.push('/CreateTeam/'+id);
    }
    render() {
        let tournamentMatch = '';
        if (this.props.ShowTornamentmatches) {
            tournamentMatch = this.props.ShowTornamentmatches.map((tournamentmatch, key) => {
                return <div className="card" key={key} style={{ borderRadius: "25px" }} onClick={()=>this.handletornamentteams(tournamentmatch.id)} >
                    <div className="card-body"  >
                        <div style={{ float: "left" }}><img alt="logo" src={path + "add.png"}  style={{ width: 100 }}   ></img></div>
                        <div style={{ float: "center", margin: "auto", width: "45%", padding: "10px",textAlign:"center" }}>{tournamentmatch.Team1[0].teamName + " Vs " + tournamentmatch.Team2[0].teamName}</div>
                        <div style={{ float: "right" }}><img alt="logo1" src={path + "add.png"}  style={{ width: 100, marginTop: -50 }} ></img></div>
                    </div>
                </div>
            })
        }
        return (            
                <div className="content" style={{ overflow: "none" }}>
                    <UserPanel></UserPanel>
                    {/* <img src={banerhome} alt={{}} style={{width: "100%",height: "640px",backgroundImage: `url(${banerhome})`}} ></img> */}
                    <div className="row" style={{ marginTop: "60px", backgroundRepeat: "none" }} >
                        <div className="col-md-6" style={{ height: "630px", overflow: "scroll" }}>
                            <div className="card" style={{ borderRadius: "25px" }}>
                                <div className="card-header" >
                                    Tornament teams
                                </div>
                                <div className="card-body" >
                                    {tournamentMatch}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" style={{backgroundImage: `url(${banerhome})`}}>
                        </div>
                    </div>
                </div>            
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ShowTornamentmatches: state.TournamentMatchs.tournamentmatchs,
    }
};
const mapDispatchToProps = dispatch => ({
    action: {
        MatchPlayerScore: bindActionCreators(MatchPlayerScore, dispatch),
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(userDashBoard);

