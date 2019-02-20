import React from 'react';
import { Modal } from 'antd';
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as  matchPlayerScoreAction from '../../../../action/matchPlayerScore';
import '../../style.css';
class viewplayerscore extends React.Component {
  componentWillMount = () => {
    this.getTournamentMatch();
  }

  getTournamentMatch() {
    this.props.action.matchPlayerScore.getTournamentMatchPlayerScore(0, 100, "id", "desc");
  }

  render() {
    let data;
    if (this.props.binddata.length !== 0) {
      data = this.props.matchPlayerScores.map((data, key) => {
        if (data.playerId === this.props.binddata.playerId && this.props.binddata.tournamentId === data.tournamentId) {
          return <div key={key}>
            <Table >
              <tbody>
                <tr>
                  <th className="textAlian">Runs</th>
                  <th>{data.run}</th>
                </tr>
                <tr textAlign="center">
                  <th className="textAlian">six</th>
                  <td>{data.six}</td>
                </tr>
                <tr>
                  <th className="textAlian"  >Four</th>
                  <td>{data.four}</td>
                </tr>
                <tr>
                  <th className="textAlian">wicket</th>
                  <td>{data.wicket}</td>
                </tr>
                <tr>
                  <th className="textAlian">Stumping</th>
                  <td>{data.stumping}</td>
                </tr>
                <tr>
                  <th className="textAlian">catch</th>
                  <td>{data.catch}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th className="textAlian">Point</th>
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
        onCancel={this.props.onCancel}>
        {(data) ? count !== data.length ? data : <p className="noscorefound">Match Remaining</p> : ""}
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
