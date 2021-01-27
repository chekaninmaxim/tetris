import { combineReducers } from 'redux';
import score from './score';
import nextFigure from './nextFigure';
import authentication from './auth'

export default combineReducers({
    score,
    nextFigure,
    authentication
});