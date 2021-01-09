import AC from '../actionTypes' 

const score = (state=0, {type, payload}) => {
    if (type === AC.UPDATE_SCORE) {
        return payload
    } else {
        return state
    }
}

export default score