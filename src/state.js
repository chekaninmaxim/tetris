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

const positionsEqual = function(p1, p2) {
	return p1.x === p2.x && p1.y === p2.y
}


function moveBlocksFactory(getNewPosition, isDown=false) {

	const setStateFn = function(state) {

		const newPositions = state.movableBlocks.map(block => {
			const newPosition = getNewPosition(block.position);
			if (state.blocksMap[newPosition.y][newPosition.x]) {
				return block.position
			} else {
				return newPosition
			}
		});

		const isMoveInvalid = state.movableBlocks.some(
			(block, i) => positionsEqual(block.position, newPositions[i])
		);

		if (isMoveInvalid) {
			if (isDown) {

				const newBlocksMap = state.blocksMap.slice();
				for (let block of state.movableBlocks) {
					console.log(block.position);
					newBlocksMap[block.position.y][block.position.x] = block.color;
				}

				return {
					movableBlocks : [],
					blocksMap: newBlocksMap
				}
			} else {
				return state;
			}
		} else {
			const newMovableBlocks = state.movableBlocks.map((block, i) => {
				const newBlock = {
					...block,
					position : newPositions[i]
				}
				return newBlock;
			});

			return {
				...state,
				movableBlocks: newMovableBlocks,
			};
		}
	}

	return setStateFn;
}

export const moveBlocksDown = moveBlocksFactory(p => ({
	x: p.x,
	y: Math.min(p.y + 1, Settings.stageSize.height - 1)
}), true);

export const moveBlocksLeft = moveBlocksFactory(p => ({
	x: Math.max(p.x - 1, 0),
	y: p.y
}));

export const moveBlocksRight = moveBlocksFactory(p => ({
	x: Math.min(p.x + 1, Settings.stageSize.width - 1),
	y: p.y
}));
