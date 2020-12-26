
import React from 'react';
import Settings, {getRealSize, addPx} from '../settings';
import TetrisBlock from './TetrisBlock';
import C from '../constants'
import { getRandomFigure } from '../figure';
import {
  makeInitialState,
  moveBlocksFactory
} from '../state.js';

const keyActions = {
  '32': moveBlocksFactory(C.ROTATE),
  '37': moveBlocksFactory(C.LEFT),
  '39': moveBlocksFactory(C.RIGHT),
  '40': moveBlocksFactory(C.DOWN)
}

class GameStage extends React.Component {
  constructor(props) {
    super(props);

    this.stageWidth = Settings.stageSize.width;
    this.stageHeight = Settings.stageSize.height;
    this.style = {
      width: addPx(getRealSize(this.stageWidth)),
      height: addPx(getRealSize(this.stageHeight))
    }

    this.state = makeInitialState();
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._makeRegularMove = this._makeRegularMove.bind(this);
  }

  _handleKeyDown(event) {
    const handler = keyActions[event.keyCode];
    if (handler && this.state.figure) this.setState(handler);
  }

  _makeRegularMove() {
    if (this.state.figure) {
      this.setState(moveBlocksFactory(C.DOWN));
    } else {
      this.setState({ figure: getRandomFigure()});
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown);
    this.timerId = setInterval(this._makeRegularMove, Settings.updateRate);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className={'Tetris-stage'} style={this.style}>
        {this.state.figure && this.state.figure.blocks.map((block, idx) => <TetrisBlock
          key={idx}
          position={block}
          color={this.state.figure.color} />
        )}

        {this.state.blocksMap.map(function(row, y) {
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
}

export default GameStage;