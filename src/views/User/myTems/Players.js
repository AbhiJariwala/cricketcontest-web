import React from 'react';
import { Table } from 'reactstrap';
import UserPanel from '../../UserPanel/userPanel'
import { Modal, Button } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import path from '../../../path';
import * as  showUserMatchesAction from '../../../action/user/Createteam'

class Players extends React.Component {
  componentDidMount = () => {
    this.getTournamentMatch();
  }
  getTournamentMatch() {
    let userid=localStorage.getItem("userId")
    this.props.action.UserMatchesteams.Show_My_TeamData(userid);
  }
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {

    let players
    players =this.props.showUserMatches.map((data,key)=>{            
      if(data.tournamentMatchId==this.props.match.params.id){        
        return <tr key={key}>
        <th scope="row">{key+1}</th>
        <th><img alt="logo1" src={path + data.Players[0].playerImage} style={{ width: 100}} ></img></th>
        <td>{data.Players[0].firstName}{ "  "}{data.Players[0].lastName}</td>
        <td>{data.Players[0].description}</td>
        <td> <Button type="primary" onClick={this.showModal}>
              show Score
            </Button>
        </td>
      </tr>
      
      }
  })
    return (<div >
      <UserPanel></UserPanel>
      <div className="container">
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
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
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
