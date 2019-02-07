import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Popconfirm } from 'antd';
// import './tournamentTeam.css'
import 'antd/dist/antd.css';

import * as TournamentTeamAction from '../../action/TournamentTeam';

class ShowTeams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            toggle: this.props.toggle,
            matchPlayerScore: []
        }
    }

    componentWillMount() {
        this.setState({ matchPlayerScore: this.props.matchPlayerScore });
    }

    // componentWillReceiveProps = (nextProps, nextState) => {
    //     if (this.props.tournament !== nextProps.tournament) {
    //         this.setState({ tournament: { ...nextState.tournament } })
    //     }
    // }

    // deleteClick = (d, d2) => {
    //     this.props.deleteClick(d, d2)
    // }

    render() {
        let matchPlayerScore = this.state.matchPlayerScore;
        console.log(matchPlayerScore)
        return (
            (matchPlayerScore && matchPlayerScore.length > 0) ?
                matchPlayerScore.map((playerscore, i) => {
                    return (
                        <div key={i}>
                            <div className="divTeam">
                                <p className="pTeam">{playerscore.Player.firstName}{" " + playerscore.Player.lastName}</p>
                                {/* <Popconfirm title="Are you sure delete this team?" onConfirm={() => this.deleteClick(tournament.id, team.id)} okText="Yes" cancelText="No">
                                    <Button type="danger" style={{ marginRight: "auto", left: "88%", position: "sticky" }} icon="delete" />
                                </Popconfirm> */}
                            </div>
                        </div>
                    )
                }) : null
        );
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        TournamentTeam: bindActionCreators(TournamentTeamAction, dispatch)
    }
});
export default connect(null, mapDispatchToProps)(ShowTeams)
