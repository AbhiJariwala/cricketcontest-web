import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Button, Popconfirm} from 'antd';
import './tournamentTeam.css'
import 'antd/dist/antd.css';

import * as TournamentTeamAction from '../../action/TournamentTeam';

class ShowTeams extends Component {
    constructor(props){
        super(props);
       this.state = {
            visible:false,
            toggle:this.props.toggle,
            tournament:{}
        }
    }

    componentWillMount()
    {
        let{tournament}=this.props;
        this.setState({tournament:tournament});
    }
  
    componentWillReceiveProps = (nextProps,nextState) => {
        if (this.props.tournament !== nextProps.tournament)
        {
            this.setState({tournament:{...nextState.tournament}})
        }
      }
      
    deleteClick=(d,d2)=>{
        this.props.deleteClick(d,d2)
    }

    render() {
        let {tournament} = this.state;
        return (
            (tournament.Teams && tournament.Teams.length>0) ?
            tournament.Teams.map((team, i) => {
               return (
                 <div key={i}>
                   <div className="divTeam">
                     <p className="pTeam">{team.teamName}</p>
                     <Popconfirm title="Are you sure delete this team?" onConfirm={()=>this.deleteClick(tournament.id,team.id)} okText="Yes" cancelText="No">
                       <Button type="danger" style={{marginRight: "auto",left: "88%",position: "sticky"}} icon="delete" />
                     </Popconfirm>
                   </div>
                 </div>
               )
             }) :null 
        );
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
      TournamentTeam: bindActionCreators(TournamentTeamAction, dispatch)
    }
  });
  export default connect(null, mapDispatchToProps)(ShowTeams)
