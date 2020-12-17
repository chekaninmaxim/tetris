import React from 'react';
import Settings, {getRealSize, addPx} from '../settings.js';

function TetrisBlock(props) {
  const style = {
    position: 'absolute',
    top: addPx(getRealSize(props.position.y)),
    left: addPx(getRealSize(props.position.x)),
    backgroundColor: props.color,
    border: '2px solid white',
    width : addPx(Settings.cellSize - 4),
    height : addPx(Settings.cellSize - 4),
  }

  return (
    <div className={'Block'} style={style}> </div>
  )
}

export default TetrisBlock;