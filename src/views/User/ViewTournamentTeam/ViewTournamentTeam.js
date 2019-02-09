import React, { Component } from 'react';
import UserPanel from '../../UserPanel/userPanel'
import path from '../../../path';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as  MatchPlayerScore from '../../../action/TournamentMatch'
import Countdown from './displayTimer';
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
        // let date = new Date();
         let tournamentMatch = '';
        if (this.props.ShowTornamentmatches.length!==0) {
            tournamentMatch = this.props.ShowTornamentmatches.map((tournamentmatch, key) => {        
                        return <div className="card" style={{backgroundColor:"green",borderRadius: "25px"}} key={key}  onClick={()=>this.handletornamentteams(tournamentmatch.id)} >
                    <div className="card-body"  >
                        <div style={{ float: "left" }}><img alt="logo" src={path + tournamentmatch.Team1[0].teamLogo}  style={{ width: 100 }}   ></img></div>
                        <div style={{ float: "center", margin: "auto", width: "45%", padding: "10px",textAlign:"center" }}>
                        <div>{tournamentmatch.Team1[0].teamName + " Vs " + tournamentmatch.Team2[0].teamName}</div>
                        <div><Countdown date={tournamentmatch.matchDate}/></div>
                        </div>
                        <div style={{ float: "right" }}><img alt="logo1" src={path + tournamentmatch.Team2[0].teamLogo}  style={{ width: 100, marginTop: -50 }} ></img></div>
                        
                    </div>
                </div>
            })
        }else{
            tournamentMatch="No Data found"
        }
        return (            
                <div className="content" >
                    <UserPanel></UserPanel>
                    {/* <img src={banerhome} alt={{}} style={{width: "100%",height: "640px",backgroundImage: `url(${banerhome})`}} ></img> */}
                    <div className="row" style={{ marginTop: "60px", backgroundRepeat: "none" }} >
                        <div className="col-md-6" style={{ height: "630px", overflow: "scroll" }}>
                            <div className="card" style={{ borderRadius: "25px" }}>
                                <div className="card-header" style={{backgroundColor:"gainsboro",textAlign:"center"}} >
                                    Tornament teams
                                </div>
                                <div className="card-body" style={{backgroundColor:"gainsboro"}} >
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

