import AC from './actionTypes'

export const updateScore = (score) => ({
    type : AC.UPDATE_SCORE,
    payload: score
})

export const updateNext = (nextFigure) => ({
    type : AC.UPDATE_NEXT,
    payload: nextFigure
})