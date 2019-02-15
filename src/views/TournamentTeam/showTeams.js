import React, { Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { Checkbox, Col, Row, Button, Popconfirm, Icon, Modal } from 'antd';
import {Button as ReactButton} from 'reactstrap'
import './tournamentTeam.css'
import 'antd/dist/antd.css';
import AddTournamentTeam from '.././TournamentTeam/AddTournament/addTournamentTeam'
import * as TournamentTeamAction from '../../action/TournamentTeam';
import * as TournamentAction from '../../action/Tournament';

class ShowTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModal: false,
      teamModal: false,
      visible: false,
      toggle: this.props.toggle,
      tournament: {},
      team: [],
      indeterminate: true,
      checkAll: false,
      tournamentId:"",
      callNotnext:0
    }
    this.toggle = this.toggle.bind(this);
  }
  componentDidUpdate=()=>{    
    if(this.props.tournament.id!==undefined && !this.state.callNotnext){    
        this.setState({tournamentId:this.props.tournament.id,callNotnext:1})    
    }

  }

  deleteClick = (d, d2) => {
    this.setState({
      team: [],
      indeterminate: true,
      checkAll: false
    });
    this.props.deleteClick(d, d2);
  }
  toggle(id) {

  
    this.setState({
      addModal: !this.state.addModal,
      Editdataid: null
    }); 
    if(id==="1")
    {
        this.props.history.push('/tournament');
    }   
    else{
    this.props.toggleTeam();
    }
    this.props.toggleTeam();this.props.toggleTeam();
  }
  Change = (e) => {
    this.setState({ team: e });
    e.length === this.props.tournament.Teams.length ? this.setState({ checkAll: true, indeterminate: false }) : this.setState({ checkAll: false, indeterminate: e.length === 0 ? false : true })

  }

  onCheckAllChange = (e) => {
    let teams = this.props.tournament.Teams.map(team => {
      return team.id
    });
    this.setState({
      team: e.target.checked ? teams : [], indeterminate: false,
      checkAll: e.target.checked
    })
  }
  closeModal = () => {
    this.setState({
      team: [],
      indeterminate: true,
      checkAll: false
    });
    this.props.toggleTeam();
  }
  render() {
    let sTournament='';
      let { tournament } = this.props;
    
    if(this.props.Tournaments && this.props.Tournaments.length>0 ){
      sTournament = this.props.Tournaments.filter(t=>{
        return t.id===tournament.id;
      })
    }
    let teams = ((sTournament[0]?sTournament[0].Teams:null))
    let teamNames = '';
    if (teams && teams.length > 0) {
      teamNames = teams.map((team, i) => {
        return <Row key={i} className="divTeam">
          <Col span={23}>
            <Checkbox value={team.id}>
              {team.teamName}
            </Checkbox>
          </Col>
        </Row>
      })
    }

    return (
      <div>
      <AddTournamentTeam refresh={this.props.refresh} filteredteams ={this.props.filter} isOpen={this.state.addModal} toggle={this.toggle} tournament={this.props.tournament} teamsdata={this.props.teamsdata}/>
        <Modal title={tournament.tournamentName}
          visible={this.props.visible}
          onCancel={this.closeModal}
          footer={null} >
          <div style={{ marginBottom: '9px', marginLeft: '10px' }}>         
          
            {!teams || teams.length === 0 ?
              <div> 
                    <div style={{ float: "right" }}>
                        <div onClick={this.toggle}><ReactButton color="info" >Add Team</ReactButton></div>
                    </div>
                    <p className='noTeams'> No Teams found in {tournament.tournamentName}</p>
              </div> :
              <div>
              <Checkbox indeterminate={this.state.indeterminate}
                checked={this.state.checkAll}
                onChange={this.onCheckAllChange}>
                Check all
          </Checkbox>
          <div style={{ float: "right" }}>
                        <div onClick={this.toggle}><ReactButton color="info" >Add Team</ReactButton></div>
                    </div>
          </div>

            }
</div>

          <Checkbox.Group style={{ width: '100%' }} onChange={this.Change} value={this.state.team}>
            {teamNames}
          </Checkbox.Group>

          <Popconfirm title="Do you want to delete these teams?"
            onConfirm={() => this.deleteClick(tournament.id, this.state.team)} okText="Yes" cancelText="No">
            <Button hidden={this.state.team.length > 0 ? false : true}
              type="danger">
              Delete
                              <span style={{ paddingLeft: "5px" }}>
                <Icon type='delete'
                  style={{ verticalAlign: "text-bottom", paddingBottom: "2px" }} />
              </span>
            </Button>
          </Popconfirm>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  const {Tournaments}=state.Tournament;
  return {
    Tournaments
  }
}
const mapDispatchToProps = dispatch => ({
  action: {
    TournamentTeam: bindActionCreators(TournamentTeamAction, dispatch),
    Tournament: bindActionCreators(TournamentAction,dispatch)
  }
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowTeams))





