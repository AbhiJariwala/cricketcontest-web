import React from 'react';
import { Modal } from 'antd';
import * as  matchPlayerScoreAction from '../../../../action/matchPlayerScore'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
class viewplayerscore extends React.Component {  
  componentWillMount = () => {
    this.getTournamentMatch();
  }
  getTournamentMatch() {  
    this.props.action.matchPlayerScore.getTournamentMatchPlayerScore(0, 100, "id", "desc");
  }
  render() {
    // console.log(this.props.matchPlayerScores)
    // this.props.matchPlayerScores.map(data => {      
    //     console.log(data);
    // })
    return (<div >      
        <Modal
          title="Basic Modal"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          onCancel={this.props.onCancel}
        >
          <p>Total Runs:-1</p>
          <p>Total six:-1</p>
          <p>Total four:-1</p>
          <p>Total wicket:-1</p>
          <p>Total stumping:-1</p>
          <p>Total catch:-1</p>
        </Modal>
    </div >
    );
  }
}
const mapStateToProps = (state) => {
  return {
    matchPlayerScores: state.MatchPlayerScore.tournamentMatchPlayerScore,
  }
};
const mapDispatchToProps = dispatch => ({
  action: {
    matchPlayerScore: bindActionCreators(matchPlayerScoreAction, dispatch),
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(viewplayerscore);
