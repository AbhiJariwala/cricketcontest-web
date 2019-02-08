import React, { Component } from 'react';
import { Container } from 'reactstrap';
import UserPanel from '../../UserPanel/userPanel'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as  MatchPlayerScore from '../../../action/TournamentMatch'
import {
    Card, CardBody
} from 'reactstrap';
import path from '../../../path';
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
    addplayerteam=(e, teams) =>{
        
        let teamId = [];
        if (e.target.name === "plusImg")
            teamId = [].concat(teams.id);
        else
            teamId = this.state.Myteam.splice(this.state.Myteam.indexOf(teams.id), 1);
        this.setState({ Myteam: teamId });
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
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
                        //  console.log(data)
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
                                            <img alt="true" name="minusImg" onClick={()=>this.addplayerteam(this,data)} style={{ width: 45 }} src="data:image/png;base64,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"></img>
                                            : <img alt="true" name="plusImg" onClick={()=>this.addplayerteam(this,data)} style={{ width: 45 }} src="data:image/png;base64,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"></img>
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
                                        <img alt="true" style={{ width: 45 }} onClick={() => this.addplayerteam(data)} src="data:image/png;base64,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"></img>
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

            <div>
                <UserPanel></UserPanel>
                <div style={{ marginTop: "60px", backgroundRepeat: "none" }}>
                    <div className="row">
                        <div className="col-sm-5" >
                            <Card style={{ background: "linear-gradient(104deg, #3c3c3c 47%, #323232" }}>
                                <CardBody>
                                    <div className="row">
                                        <div className="col-sm-12" style={{ textAlign: "center", color: "white" }}>
                                            <p >max 7 player from a team</p>
                                        </div>
                                    </div>
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
                                                <p >Pick 11 Players</p>
                                            </div>
                                        </div>
                                        <TabContent activeTab={this.state.activeTab}>

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
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-md-7">
                            <img alt="Cricket Contest" src="https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/ff0cd817-22d5-4a75-921a-865cdc728320_scaled.jpg" style={{ height: 1000 }}></img>
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
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);