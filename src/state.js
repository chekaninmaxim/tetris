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

export function moveBlocksFactory(action) {

	const setStateFn = function({figure, blocksMap}) {

		const oldPositions = figure.blocks;
		const newFigure = getNextFigure(figure, action)
		const newPositions = newFigure.blocks;
		console.log(oldPositions, newPositions);

		const isStuck = newPositions.some(
			block => blocksMap[block.y][block.x]
		);

		const samePositions = newPositions.every(
			(block, i) => positionsEqual(block, oldPositions[i])
		);
		
		if (action === C.DOWN) {
			console.log(isStuck, samePositions);
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

	return setStateFn;
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
