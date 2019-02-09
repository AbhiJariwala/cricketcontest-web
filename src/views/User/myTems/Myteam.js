// import React, { Component } from 'react';
// import UserPanel from '../../UserPanel/userPanel'
// import path from '../../../path';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as  MatchPlayerScore from '../../../action/TournamentMatch'
// import Countdown from '../ViewTournamentTeam/displayTimer';
// const banerhome = require('../../../Image/image1.jpg')
// class userDashBoard extends Component {
//     componentDidMount = () => {
//         this.getTournamentMatch();
//     }
//     getTournamentMatch() {
//         this.props.action.MatchPlayerScore.SelectTournamentMatchAction(0, 100, "id", "desc");
//     }
//     handletornamentteams = (id) => {

//         this.props.history.push('/CreateTeam/' + id);
//     }
//     render() {
//        return( <div class="large-screen">
//   <div class="wrap">
//     <div class="btn-toolbar buttons">
//       <div class="btn-group">
//         <button id="desktop" class="btn btn-primary">
//         <i class="fa fa-desktop" aria-hidden="true"></i>
//         Desktop Table
//       </button>
//       </div>
//       <div class="btn-group">
//         <button id="mobile" class="btn btn-default">
//         <i class="fa fa-mobile-phone" aria-hidden="true"></i>
//         Mobile Card List
//       </button>
//       </div>
//     </div>
//     <div class="table-wrapper">
//       <table class="table-responsive card-list-table">
//         <thead>
//           <tr>
//             <th>Column #1</th>
//             <th>Column #2</th>
//             <th>Column #3</th>
//             <th>Column #4</th>
//             <th>Column #5</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td data-title="Column #1">Value #1</td>
//             <td data-title="Column #2">Value #2</td>
//             <td data-title="Column #3">Value #3</td>
//             <td data-title="Column #4">Value #4</td>
//             <td data-title="Column #5">Value #5</td>
//           </tr>
         
          
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>

//         );
//     }
// }
// const mapStateToProps = (state) => {
//     return {
//         ShowTornamentmatches: state.TournamentMatchs.allmatchs,
//     }
// };
// const mapDispatchToProps = dispatch => ({
//     action: {
//         MatchPlayerScore: bindActionCreators(MatchPlayerScore, dispatch),
//     }
// });
// export default connect(mapStateToProps, mapDispatchToProps)(userDashBoard);

