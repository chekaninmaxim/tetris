import Settings from './settings.js';
import getMovableBlock from './block.js';

export const makeInitialState = function() {
	const blocksMap = [];

	for (let i = 0; i < Settings.stageSize.height; i++) {
		blocksMap.push(Array(Settings.stageSize.width));
	}

	return {
		movableBlocks : getMovableBlock(),
		blocksMap: blocksMap,
	}
}

function moveBlocksFactory(getNewPosition) {
	const setStateFn = function(state) {

		const isFigureStuck = state.movableBlocks.some(block => {
			const newPosition = getNewPosition(block.position);

			return Boolean(state.blocksMap[block.position.x][block.position.y + 1])
				|| newPosition.y >= Settings.stageSize.height - 1;
		});

		if (isFigureStuck) {
			const newBlocksMap = state.blocksMap.slice();
			for (let block of state.movableBlocks) {
				const newPosition = getNewPosition(block.position);
				console.log(newPosition);
				newBlocksMap[newPosition.y][newPosition.x] = block.color;
			}

			return {
				movableBlocks : [],
				blocksMap: newBlocksMap
			}
		} else {
			const positionsEqual = function(p1, p2) {
				return p1.x === p2.x && p1.y === p2.y
			}

			const blocksShoudNotMove = state.movableBlocks.some(b =>
				positionsEqual(getNewPosition(b.position), b.position)
			);
			if (blocksShoudNotMove) {
				return state;
			} else {

				const newMovableBlocks = state.movableBlocks.map(block => {
					const newBlock = {
						...block,
						position : getNewPosition(block.position)
					}
					return newBlock;
				});

				return {
					...state,
					movableBlocks: newMovableBlocks,
				};
			}
		}
	}

	return setStateFn;
}

export const moveBlocksDown = moveBlocksFactory(p => ({
	x: p.x,
	y: Math.min(p.y + 1, Settings.stageSize.height - 1)
}));

export const moveBlocksLeft = moveBlocksFactory(p => ({
	x: Math.max(p.x - 1, 0),
	y: p.y
}));

export const moveBlocksRight = moveBlocksFactory(p => ({
	x: Math.min(p.x + 1, Settings.stageSize.width - 1),
	y: p.y
}));
