import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container } from 'reactstrap';
import { Input } from 'reactstrap';
import { Collapse, Button, Popconfirm, message } from 'antd';
import * as TournamentAction from '../../action/Tournament';
import AddTournamentTeam from '../TournamentTeam/AddTournament/addTournamentTeam'
import { PanelHeader } from "components";
import 'antd/dist/antd.css';
class TournamentTeam extends Component {

  componentWillMount = () => {
    this.props.action.Tournament.fetchTournamentAction();
  }
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => {
      return { modal: !prevState.modal }
    });
  }
  callback = (key) => {
    //console.log(key);
  }

  handleDelete = (id) => {
    message.success("successfully deleted" + id);
  }


  render() {
    const Panel = Collapse.Panel;
    let data = "";
    if (this.props.ShowTornamentAll && this.props.ShowTornamentAll.length > 0) {
      data = this.props.ShowTornamentAll.map((tournament, i) => {

        let teams = [];
        if (tournament.Teams.length > 0) {
          teams = tournament.Teams.map((team, i) => {
            return (<div key={i}>
              <div style={{ display: "flex", width: "100%", padding: "9px" }}><p style={{ margin: "5px", fontWeight: "700" }}>{team.teamName}</p>
                <Popconfirm title="Are you sure delete this team?" onConfirm={() => this.handleDelete(team.id)} okText="Yes" cancelText="No">
                  <Button style={{
                    marginRight: "auto",
                    left: "88%",
                    position: "sticky"
                  }} type="danger" icon="delete" /></Popconfirm></div>
            </div>)
          });
        }
        return <Panel header={tournament.tournamentName} key={tournament.id}><div style={{ textAlign: "center" }}><h5>{tournament.tournamentName}</h5><p>{tournament.tournamentDescription}</p></div>
          {teams}</Panel>
      })
    }
    //console.log(this.props.ShowTornamentAll);
    return (
      <Container>

        <PanelHeader size="sm" />
        <AddTournamentTeam isOpen={this.state.modal} toggle={this.toggle}  >  </AddTournamentTeam>
        <div style={{ width: "10%", margin: "25px" }}>
          <div>
            Show entries<Input type="select" name="select" id="exampleSelect">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </Input>
          </div>
        </div>
        <Button color="info" onClick={this.toggle} style={{ width: "62px" }}>Add </Button>
        <div>
          <Collapse onChange={this.callback}>
            {this.props.ShowTornamentAll && this.props.ShowTornamentAll.length > 0 ? data : null}
          </Collapse>
        </div>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ShowTornamentAll: state.Tournament.Tournaments,
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Tournament: bindActionCreators(TournamentAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TournamentTeam)

