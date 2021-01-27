import { UPDATE_SCORE } from '../actionTypes' 

const score = (state=0, {type, payload}) => {
    if (type === UPDATE_SCORE) {
        return payload
    } else {
        return state
    }
}

export default score;