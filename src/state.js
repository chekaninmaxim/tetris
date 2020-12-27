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
	}
}

const positionsEqual = function(p1, p2) {
	return p1.x === p2.x && p1.y === p2.y
}

export function blocksReducer({ figure, blocksMap }, action) {
	console.log(action, figure);
	if (!figure) {
		return {
			figure: getRandomFigure(),
			blocksMap
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
			blocksMap
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

			return {
				figure: null,
				blocksMap: newBlocksMap
			}
		} else {
			return {
				figure: newFigure,
				blocksMap
			}
		}
	} else {
		return {
			figure: isStuck ? figure : newFigure,
			blocksMap
		};
	}
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
