import Settings from './settings'
import C from './constants'
import { getRandomFigure } from './figure'

export const makeInitialState = function() {
	const blocksMap = [];

	for (let i = 0; i < Settings.stageSize.height; i++) {
		blocksMap.push(Array(Settings.stageSize.width));
	}

	return {
		figure : getRandomFigure(),
		blocksMap: blocksMap,
		gameStatus: {
			score: 0,
			gameOver: false
		}
	}
}

const positionsEqual = function(p1, p2) {
	return p1.x === p2.x && p1.y === p2.y
}

export function blocksReducer({ figure, blocksMap, gameStatus }, action) {
	if (!figure) {
		return {
			figure: getRandomFigure(),
			blocksMap,
			gameStatus
		}
	}

	const oldPositions = figure.blocks;

	const newFigure = getNextFigure(figure, action.type)
	const newPositions = newFigure.blocks;

	let isStuck = false; 
	try {
		isStuck = newPositions.some(
			block => blocksMap[block.y][block.x]
		);

	} catch (error) {
		console.log(error);
		return {
			figure,
			blocksMap,
			gameStatus
		}	
	}

	const samePositions = newPositions.every(
		(block, i) => positionsEqual(block, oldPositions[i])
	);

	if (action.type === C.DOWN) {
		if (isStuck || samePositions) {
			const newBlocksMap = blocksMap.slice();
			for (let block of oldPositions) {
				newBlocksMap[block.y][block.x] = figure.color;
			}

			const reducedBlocksMap = reduceFullRows(newBlocksMap);

			return {
				figure: null,
				blocksMap: reducedBlocksMap,
				gameStatus: {
					score: gameStatus.score + 1,
					gameOver: isGameOver(reducedBlocksMap)
				}
			}
		} else {
			return {
				figure: newFigure,
				blocksMap,
				gameStatus
			}
		}
	} else {
		return {
			figure: isStuck ? figure : newFigure,
			blocksMap,
			gameStatus
		};
	}
}

function reduceFullRows(blocksMap) {
	const withoutFullRows = blocksMap.filter(row => 
		row.filter(b => Boolean(b)).length < Settings.stageSize.width
	);
	const numberOfRowsToAdd = Settings.stageSize.height - withoutFullRows.length;
	const emptyRows = [];
	for (let i = 0; i < numberOfRowsToAdd; i ++) {
		emptyRows[i] = Array(Settings.stageSize.width)
	}
	return emptyRows.concat(withoutFullRows);
}

function isGameOver(blocksMap) {
	return blocksMap[0].filter(block => Boolean(block)).length > 0;
}

function getNextFigure(figure, action) {
	const { x, y } = figure.position;
	switch (action) {
		case C.LEFT:
			return figure.move({ x: x - 1, y });
		case C.RIGHT:
			return figure.move({ x: x + 1, y });
		case C.DOWN:
			return figure.move({ x, y: y + 1 });
		case C.ROTATE:
			return figure.rotate();
		default:
			return figure;
	}
}
