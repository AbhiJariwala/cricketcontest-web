import React from 'react';
import { Table } from 'reactstrap';
import UserPanel from '../../UserPanel/userPanel'
import {  Button, Empty } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import path from '../../../path';
import ViewPlayerScore from  './ViewPlayerScore/viewPlayerScore';
import * as  showUserMatchesAction from '../../../action/user/Createteam'

class Players extends React.Component {
  componentDidMount = () => {
    this.getTournamentMatch();
  }
  getTournamentMatch() {
    let userid = localStorage.getItem("userId")
    this.props.action.UserMatchesteams.Show_My_TeamData(userid);
  }
  state = { visible: false,scoredata:[] }
  showModal = (data) => {
    let bindScoreData={
      playerId:data.playerId,
      tournamentMatchId:data.tournamentMatchId
      // playerId:10,
      // tournamentMatchId:1
    }
      
    this.setState({
      visible: true,
      scoredata:bindScoreData
    });

  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  render() {   
    let players,no=1;
    if (this.props.showUserMatches.length !== 0) {
      players = this.props.showUserMatches.map((data, key) => {
        if (data.tournamentMatchId === parseInt(this.props.match.params.id, 10)) {
          return <tr key={key}>
            <th scope="row">{no ++}</th>
            <th><img alt="logo1" src={path + data.Players[0].playerImage} style={{ width: 100,height:100 }} ></img></th>
            <td>{data.Players[0].firstName}{"  "}{data.Players[0].lastName}</td>
            <td>{data.Players[0].description}</td>
            <td><Button type="primary" onClick={()=>this.showModal(data)}>show Score</Button></td>
          </tr>
        }
        return Empty
      })
    }
    return (<div >
      <UserPanel></UserPanel>
      <ViewPlayerScore 
          visible={this.state.visible} 
          handleOk={this.handleOk} 
          onCancel={this.handleCancel}
          binddata={this.state.scoredata}></ViewPlayerScore>
      <div className="container">
        {players!==" " ?        
          <Table>            
            <thead>
              <tr>
                <th>#</th>
                <th>Avtar</th>
                <th>Name</th>
                <th>Detail</th>
                <th>View Point</th>
              </tr>
            </thead>
            <tbody>
              {players}
            </tbody>
          </Table>
          : <h3>No Data</h3>}
      </div>
    </div >
    );
  }
}
const mapStateToProps = (state) => {
  return {
    showUserMatches: state.CreateteamReducer.TeamData,
  }
};
const mapDispatchToProps = dispatch => ({
  action: {
    UserMatchesteams: bindActionCreators(showUserMatchesAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Players);
