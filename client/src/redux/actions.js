import {

} from './actionTypes'

export const updateScore = (score) => ({
    type : UPDATE_SCORE,
    payload: score
})

export const updateNext = (nextFigure) => ({
    type : UPDATE_NEXT,
    payload: nextFigure
})