import React, { Component } from 'react';
import { Container } from 'reactstrap';
import UserPanel from '../../UserPanel/userPanel'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col,Button } from 'reactstrap';
import classnames from 'classnames';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as  MatchPlayerScore from '../../../action/TournamentMatch'
import * as  CreateTeamAction from '../../../action/user/Createteam'
import {
    Card, CardBody
} from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import path from '../../../path';
let teamId = [];
class CreateTeam extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            Myteam: [],
            activeTab: '1'
            
        };
    }
    componentDidMount = () => {
        this.getTournamentMatch();
    }
    getTournamentMatch() {
        this.props.action.MatchPlayerScore.SelectTournamentMatchAction(0, 100, "id", "desc");
    }
    addplayerteam = (teams) => {
        if (this.state.Myteam.length!==12) {
            teamId.push(teams.id);
            this.setState({ Myteam: teamId });
          } else {
            confirmAlert({
              message: 'you are already selected 11 players?.',
              buttons: [{
                label: 'ok',        
              }
              ]
            })
          }
        }
    minusplayerteam = (teams) => {
        teamId.pop(teams.id);
        this.setState({ Myteam: teamId });
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    createteam=(E)=>{
        
        E.preventDefault();   
        const userId = localStorage.getItem("userId");
        const tournamentId=this.props.match.params.id;        
        let data="";
        this.state.Myteam.map(data=>{
            data={
                userId,
                tournamentId,
                playerId:data
            }
        this.props.action.CreateTeam.createTeam(data)
        })
        
    }
    render() {
        console.log(this.state.Myteam);
        let teamplayers = [];
        let teamName1 = [];
        let tournamentMatch = '', tournamentMatch2 = '';
        if (this.props.ShowTornamentmatches.length !== 0) {
            this.props.ShowTornamentmatches.map((tournamentmatch) => {
                if (parseInt(this.props.match.params.id, 10) === tournamentmatch.id) {
                    teamName1 = tournamentmatch;
                    tournamentMatch = tournamentmatch.Team1[0].player.map((data, key) => {
                        teamplayers.push(data.id);
                        return <Container key={key}>
                            <Card body>
                                <div className="row">
                                    <div className="col-sm-2" style={{ width: "100%" }}>
                                        <img alt="demo" src={path + data.playerImage} style={{ height: "50px", width: "175px" }}></img>
                                    </div>
                                    <div className="col-sm-7">
                                        <p>{data.firstName}{data.lastName}</p>
                                    </div>
                                    <div className="col-sm-3">
                                        {(this.state.Myteam.length > 0 && this.state.Myteam.includes(data.id)) ?
                                            <img alt="" onClick={() => this.minusplayerteam(data)} style={{ width: 45,cursor:"pointer" }} src={path + "minus.png"}></img>
                                        : <img alt="" onClick={() => this.addplayerteam(data)} style={{ width: 45,cursor:"pointer" }} src={path + "plus.png"}></img>
                                        }
                                    </div>
                                </div>
                            </Card>
                        </Container>
                    })
                    tournamentMatch2 = tournamentmatch.Team2[0].player.map((data, key) => {
                        return <Container key={key}>
                            <Card body>
                                <div className="row">
                                    <div className="col-sm-2" style={{ width: "100%" }}>
                                        <img alt="demo" src={path + data.playerImage} style={{ height: "50px", width: "175px" }}></img>
                                    </div>
                                    <div className="col-sm-7">
                                        <p>{data.firstName}{' '}{data.lastName}</p>
                                    </div>
                                    <div className="col-sm-3">
                                    {(this.state.Myteam.length > 0 && this.state.Myteam.includes(data.id)) ?
                                            <img alt="" onClick={() => this.minusplayerteam(data)} style={{ width: 45 }} src={path + "minus.png"}></img>
                                            : <img alt="" onClick={() => this.addplayerteam(data)} style={{ width: 45 }} src={path + "plus.png"}></img>
                                        }
                                    </div>
                                </div>
                            </Card>
                        </Container>
                    })
                }
                return 0
            })
        } else {
            tournamentMatch = "No Data"
            tournamentMatch2 = "No Data"
        }

        if (teamName1.length !== 0) {
        }
        return (
            <div >
                <UserPanel></UserPanel>
                <div className="container" style={{  backgroundRepeat: "none" }}>
                    <div className="row">
                    <div className="col-md-6">
                            <img alt="Cricket Contest" src="https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/ff0cd817-22d5-4a75-921a-865cdc728320_scaled.jpg" ></img>
                            <div className="row" >
                                <div className="col-md-4"><img src={teamName1.length !== 0 ? path + teamName1.Team2[0].teamLogo : ""} alt="demo" style={{ height: "30px", width: "30px" }}></img> </div>
                                <div className="col-md-4"><img src={teamName1.length !== 0 ? path + teamName1.Team2[0].teamLogo : ""} alt="demo" style={{ height: "30px", width: "30px" }}></img> </div>
                                <div className="col-md-4"><img src={teamName1.length !== 0 ? path + teamName1.Team2[0].teamLogo : ""} alt="demo" style={{ height: "30px", width: "30px" }}></img> </div>                                
                            </div>
                        </div>
                        <div className="col-sm-6" >
                            <Card style={{ background: "linear-gradient(104deg, #3c3c3c 47%, #323232" }}>
                                <CardBody>                                    
                                    <div className="row" style={{ color: "white" }} >
                                        <div className="col-sm-3">
                                            <p>Players</p>
                                            <p>0/11</p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p><img alt="demo" className="img-circle" src={teamName1.length !== 0 ? path + teamName1.Team1[0].teamLogo : ""} style={{ height: "30px", width: "30px" }}></img> </p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p>{teamName1.length !== 0 ? teamName1.Team1[0].teamName : ""}</p>
                                            <p>0</p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p><img src={teamName1.length !== 0 ? path + teamName1.Team2[0].teamLogo : ""} alt="demo" style={{ height: "30px", width: "30px" }}></img> </p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p>{teamName1.length !== 0 ? teamName1.Team2[0].teamName : ""}</p>
                                            <p>0</p>
                                        </div>
                                    </div>
                                    <div className="row" style={{ background: "white" }}><Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => { this.toggle('1'); }}>
                                                {teamName1.length !== 0 ? teamName1.Team1[0].teamName : ""}
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => { this.toggle('2'); }}>
                                                {teamName1.length !== 0 ? teamName1.Team2[0].teamName : ""}
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                        <div className="row" style={{}}>
                                            <div className="col-sm-12" style={{ marginTop: "30px" }}>
                                                <p >Pick 11 Players From Both Team</p>
                                            </div>
                                        </div>
                                        <TabContent activeTab={this.state.activeTab} >
                                            <TabPane tabId="1">
                                                <Row>
                                                    <Col sm="12">
                                                        <Col sm="12">
                                                            {tournamentMatch}
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <Row>
                                                    <Col sm="12">
                                                        <Col sm="12">
                                                            {tournamentMatch2}
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent></div>
                                        <div style={{float:"right"}}>
                                        {this.state.Myteam.length===11?
                                            <Button onClick={this.createteam.bind(Event)} >Continue</Button>
                                             :<Button disabled>Continue</Button>}                                         
                                        </div>
                                </CardBody>
                            </Card>
                        </div>
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
        CreateTeam: bindActionCreators(CreateTeamAction, dispatch),
        

    }
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);