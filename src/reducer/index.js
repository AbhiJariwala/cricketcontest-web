import { combineReducers } from 'redux'

import auth from './loginReducer';
import Tournament from './Tournament'
import Team from './Team'
import Player from './Player'
import teamPlayer from './teamPlayer'


export default combineReducers({ auth, Tournament, Team, Player, teamPlayer });