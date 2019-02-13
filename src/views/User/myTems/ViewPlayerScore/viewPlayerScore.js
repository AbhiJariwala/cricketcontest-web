import React from 'react';
import { Modal } from 'antd';
import {  Table } from "reactstrap";
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
    let data

    if (this.props.binddata.length !== 0) {
      data = this.props.matchPlayerScores.map((data, key) => {

        if (data.playerId === this.props.binddata.playerId && this.props.binddata.tournamentMatchId === data.tournamentMatchId) {

          return <div key={key}>
            <Table >
              <tbody>
                <tr>
                  <th style={{ textAlign: "center" }}>Runs</th>
                  <th>{data.run}</th>
                </tr>

                <tr textAlign="center">
                  <th style={{ textAlign: "center" }}>six</th>
                  <td>{data.six}</td>
                </tr>

                <tr>
                  <th style={{ textAlign: "center" }}  >Four</th>
                  <td>{data.four}</td>
                </tr>

                <tr>
                  <th style={{ textAlign: "center" }}>wicket</th>
                  <td>{data.wicket}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>Stumping</th>
                  <td>{data.stumping}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>catch</th>
                  <td>{data.catch}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th style={{ textAlign: "center" }}>Point</th>
                  <td>{data.score}</td>
                </tr>
              </tfoot>
            </Table>

          </div>
        }

        return null;
      })
    }
    
    let count = 0
    if (data) {
      for (let index = 0; index < data.length; index++) {
        if (data[index] === undefined) {
          count = count + 1
        }
      }
    }
    return (<div >
      <Modal
        title="Show Points"
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.onCancel}
      >
        {(data) ? count !== data.length ? data : <p style={{ fontSize: "20px", color: "grey", textAlign: "center" }}>Match Remaining</p> : ""}
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
