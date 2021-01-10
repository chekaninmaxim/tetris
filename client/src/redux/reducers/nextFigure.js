import AC from '../actionTypes' 

const nextFigure = (state = [], { type, payload }) => {
    if (AC.UPDATE_NEXT === type) {
        return payload
    } else {
        return state
    }
}

export default nextFigure