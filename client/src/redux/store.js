import { ReactReduxContext } from "react-redux";
import {combineReducers, createStore} from 'redux'
import score from './reducers/score'
import nextFigure from './reducers/nextFigure'

const reducer = combineReducers({
    score,
    nextFigure
})

export default createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );


