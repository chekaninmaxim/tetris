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
		nextFigure : getRandomFigure(),
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

export function blocksReducer(state, action) {
	const { figure, nextFigure, blocksMap, gameStatus } = state
	if (!figure) {
		return {
			...state,
			figure: nextFigure,
			nextFigure: getRandomFigure(),
		}
	}

	const oldPositions = figure.blocks;

	const newFigure = moveFigure(figure, action.type)
	const newPositions = newFigure.blocks;

	let isStuck = false; 
	try {
		isStuck = newPositions.some(
			block => blocksMap[block.y][block.x]
		);

	} catch (error) {
		console.log(error);
		return state
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
				figure: nextFigure,
				nextFigure: getRandomFigure(),
				blocksMap: reducedBlocksMap,
				gameStatus: {
					score: gameStatus.score + 1,
					gameOver: isGameOver(reducedBlocksMap)
				}
			}
		} else {
			return {
				...state,
				figure: newFigure,
			}
		}
	} else {
		return {
			...state,
			figure: isStuck ? figure : newFigure,
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

function moveFigure(figure, action) {
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
