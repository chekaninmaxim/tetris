import React from 'react'
import GameStage from './GameStage'
import GameInfo from './GameInfo'
import Settings from '../../settings'
import withLogicSize from './hoc/withLogicSize'

function Game({ size }) {
  return (
    <div className="Game" style={size}>
        <GameInfo />
        <GameStage />
      </div>
  );
}

const {width, height} = Settings.stageSize;

export default withLogicSize(width, height + 1)(Game);
