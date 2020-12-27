
import React, {useReducer, useEffect} from 'react';
import Settings, {getRealSize, addPx} from '../settings';
import TetrisBlock from './TetrisBlock';
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

	const makeRegularMove = () => {
		console.log('regular move')
		dispatch({ type : C.DOWN });
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
    	const timerId = setInterval(makeRegularMove, Settings.updateRate);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			clearInterval(timerId);
		}
  	}, []);

	return (
		<div className={'Tetris-stage'} style={style}>
			{state.figure && state.figure.blocks.map((block, idx) =>
				<TetrisBlock
					key={idx}
					position={block}
					color={state.figure.color}
				/>
			)}

			{state.blocksMap.map(function(row, y) {
			return row.reduce(function(filtered, block, x) {
				if (block) {
				return filtered.concat(
					<TetrisBlock
					key = {y * Settings.stageSize.width + x}
					position={{x, y}}
					color={block}
					/> 
				)
				} else {
				return filtered;
				}
			}, [])
			})}
		</div>
	)
}

export default GameStage;