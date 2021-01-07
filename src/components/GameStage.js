
import React, {useReducer, useEffect} from 'react';
import Settings, {getRealSize, addPx} from '../settings';
import BlocksGroup from './BlocksGroup';
import C from '../constants'
import {
  makeInitialState,
  blocksReducer
} from '../state.js';

const key2Action = {
  '32': {type: C.ROTATE},
  '37': {type: C.LEFT},
  '39': {type: C.RIGHT},
  '40': {type: C.DOWN}
}

const GameStage = () => {

	const style = {
		width: addPx(getRealSize(Settings.stageSize.width)),
		height: addPx(getRealSize(Settings.stageSize.height))
	}

	const [state, dispatch] = useReducer(blocksReducer, makeInitialState());

	const handleKeyDown = ({keyCode}) => {
		const action = key2Action[keyCode];
		if (action) dispatch(action);
	}

	const makeRegularMove = () => dispatch({ type : C.DOWN });

	useEffect(() => {
		if (!state.gameStatus.gameOver) {
			document.addEventListener("keydown", handleKeyDown);
			const timerId = setInterval(makeRegularMove, Settings.updateRate);
			return () => {
				document.removeEventListener("keydown", handleKeyDown);
				clearInterval(timerId);
			}
		}
	}, [state.gameStatus.gameOver]);

	useEffect(() => {
		console.log("your score is ", state.gameStatus.score);
	}, [state.gameStatus.score])

	return (
		<div className={'Tetris-stage'} style={style} >	
			<BlocksGroup
				key={0}
				blocks={
					state.figure?.blocks.map(block => ({
						position: block,
						color: state.figure.color
					}))
				}
			/> 
			<BlocksGroup
				key={1}
				blocks={
					state.blocksMap.map((row, y) => row.reduce((filtered, color, x) => {
						if (color) {
							return filtered.concat({
								position: { x, y },
								color: color
							})
						} else {
							return filtered;
						}
					}, [])).flat()
				}
			/>
			{ state.gameStatus.gameOver && <h1> game over! </h1> }
		</div>
	)
}

export default GameStage;