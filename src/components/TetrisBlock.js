import React from 'react';
import Settings, {getRealSize, addPx} from '../settings.js';

function TetrisBlock({position, color}) {
  const style = {
    position: 'absolute',
    top: addPx(getRealSize(position.y)),
    left: addPx(getRealSize(position.x)),
    backgroundColor: color,
    border: '2px solid white',
    width : addPx(Settings.cellSize - 4),
    height : addPx(Settings.cellSize - 4),
  }

  return (
    <div className={'Block'} style={style}> </div>
  )
}

export default TetrisBlock;