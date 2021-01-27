import {UPDATE_NEXT} from '../actionTypes' 

const nextFigure = (state = [], { type, payload }) => {
    if (UPDATE_NEXT === type) {
        return payload
    } else {
        return state
    }
}

export default nextFigure;