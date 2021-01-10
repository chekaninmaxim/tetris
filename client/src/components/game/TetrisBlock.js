import React from 'react';
import PropTypes from 'prop-types';
import Settings, {getRealSize, addPx} from '../../settings.js';

function TetrisBlock({position, color, scale}) {
  const style = {
    top: addPx(getRealSize(position.y) * scale),
    left: addPx(getRealSize(position.x) * scale),
    backgroundColor: color,
    width : addPx(Settings.cellSize * scale - 4),
    height : addPx(Settings.cellSize * scale - 4),
  }

  return (
    <div className={'Block'} style={style}> </div>
  )
}

TetrisBlock.propTypes = {
  position : PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number
  }).isRequired,
  color: PropTypes.string.isRequired,
  scale: PropTypes.number.isRequired
}

export default TetrisBlock;