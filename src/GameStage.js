
import React from 'react';
import Settings, {getRealSize, addPx} from './settings.js';
import TetrisBlock from './TetrisBlock.js';
import getMovableBlock from './block.js';
import {
  makeInitialState,
  moveBlocksDown,
  moveBlocksLeft,
  moveBlocksRight,

  } from './state.js';
import './App.css';

const keyActions = {
  '37' : moveBlocksLeft,
  '39' : moveBlocksRight,
  '40' : moveBlocksDown
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
    console.log(event.keyCode);
    const handler = keyActions[event.keyCode];
    if (handler) this.setState(handler);
  }

  _makeRegularMove() {
    if (this.state.movableBlocks.length) {
      this.setState(moveBlocksDown);
    } else {
      this.setState(
        oldState => {
          return {...oldState, movableBlocks: getMovableBlock()}
        }
      );
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
        {this.state.movableBlocks.map((block, idx) => <TetrisBlock
          key={idx}
          position={block.position}
          color={block.color} />
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