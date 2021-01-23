
import React, {useReducer, useEffect, useMemo} from 'react';
import BlocksGroup from './BlocksGroup';

import { updateScore, updateNext } from '../../redux/actions'
import { connect } from 'react-redux'

import Settings from '../../settings'
import withLogicSize from './hoc/withLogicSize'
import C from '../../constants'


import {
  makeInitialState,
  blocksReducer
} from '../../gamelogic.js';

const key2Action = {
  '32': {type: C.ROTATE},
  '37': {type: C.LEFT},
  '39': {type: C.RIGHT},
  '40': {type: C.DOWN}
}

const GameStage = ({ updateScore, updateNext, size}) => {

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
		if (state.nextFigure) {
			updateNext(state.nextFigure.blocks || [])
		}
	}, [state.nextFigure])

	useEffect(() => {
		updateScore(state.gameStatus.score)
	}, [state.gameStatus.score])

	const fallingBlocks = state.figure?.blocks.map(block => ({
		position: block,
		color: state.figure.color
	}));

	const fallenBlocks = useMemo(() => {
		const result = [];

		for (let i = 0; i < state.blocksMap.length; i ++ ) {
			for (let j = 0; j < state.blocksMap[i].length; j++ ) {
				const color = state.blocksMap[i][j];
				if (color) {
					result.push({
						position : { x: j, y: i},
						color
					})
				} 
			} 
		}
		return result;

	}, [state.blocksMap]);

	return (
		<div className={'Tetris-stage'} style={size} >	
			<BlocksGroup
				key={0}
				blocks={fallingBlocks}
			/> 
			<BlocksGroup
				key={1}
				blocks={fallenBlocks}
			/>
			{ state.gameStatus.gameOver && <h1> game over! </h1> }
		</div>
	)
}

const mapDispatchToProps = { updateScore, updateNext }
const {width, height} = Settings.stageSize

export default withLogicSize(width, height)(connect(null, mapDispatchToProps)(GameStage));