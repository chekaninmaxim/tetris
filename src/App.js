import React from 'react';
import GameStage from './GameStage.js';

import {
  makeInitialState,
  moveBlocksDown,
  moveBlocksLeft,
  moveBlocksRight,

  } from './state.js';
import './App.css';

function App() {
  return (
    <div className="App"> <GameStage /> </div>
  );
}

export default App;
