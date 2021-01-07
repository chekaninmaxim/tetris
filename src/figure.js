import Settings from './settings';

class AbstractTetrisFigure {
	constructor(startPosition, rotation, color = '#00ff00') {
		this.position = this.ensureInside(startPosition, rotation);
		this.rotation = rotation % 4;
		this.color = color
	}

	get blocks() {
		throw "Not implemented";
	}

	ensureInside(position, rotation) {
		throw "Not Implemented"
	}

	rotate() {
		return new this.constructor(this.position, (this.rotation + 1) % 4, this.color)
	}

	move(newPosition) {
		return new this.constructor(newPosition, this.rotation, this.color)
	}
}

class TetrisPedestal extends AbstractTetrisFigure {

	get blocks() {
		const {x, y} = this.position
		switch (this.rotation) {
			case 0:
				return [
					{ x, y },
					{ x: x - 1, y },
					{ x: x + 1, y },
					{ x, y: y - 1 }
				];
			case 1:
				return [
					{ x, y },
					{ x: x + 1, y },
					{ x, y: y - 1 },
					{ x, y: y + 1 }
				]
			case 2:
				return [
					{ x, y },
					{ x: x - 1, y },
					{ x: x + 1, y },
					{ x, y: y + 1 }
				]
			case 3:
				return [
					{ x, y },
					{ x: x - 1, y },
					{ x, y: y - 1 },
					{ x, y: y + 1 }
				]
			default: return []
		}
	}

	ensureInside({x, y}, rotation) {
		return {
			x: Math.max(
				rotation === 1 ? 0 : 1,
				Math.min(x, Settings.stageSize.width - (rotation === 3 ? 1 : 2))),

			y: Math.max(
				rotation === 2 ? 0 : 1,
				Math.min(y, Settings.stageSize.height - (rotation === 0 ? 1 : 2)))
		}
	}

}

class TetrisSquare extends AbstractTetrisFigure {

	get blocks() {
		const { x, y } = this.position

		return [
			{ x, y },
			{ x: x + 1, y },
			{ x, y: y + 1 },
			{ x: x + 1, y: y + 1 },

		];
	}

	ensureInside({x, y}, rotation) {
		return {
			x: Math.max(0, Math.min(x, Settings.stageSize.width - 2)),
			y: Math.max(0, Math.min(y, Settings.stageSize.height - 2))
		}
	}

}

class TetrisLine extends AbstractTetrisFigure {

	get blocks() {
		const { x, y } = this.position

		if (this.rotation % 2) {
			return [
				{ x, y },
				{ x: x + 1, y },
				{ x: x + 2, y },
				{ x: x + 3, y },
			];
		} else {
			return [
				{ x, y },
				{ x, y: y + 1 },
				{ x, y: y + 2 },
				{ x, y: y + 3 },
			];
		}
	}

	ensureInside({ x, y }, rotation) {
		return {
			x: Math.max(0, Math.min(x, Settings.stageSize.width - (rotation % 2 === 1 ? 4 : 1))),
			y: Math.max(0, Math.min(y, Settings.stageSize.height - (rotation % 2 === 0 ? 4 : 1)))
		}
	}

}

class TetrisLeftStep extends AbstractTetrisFigure {

	get blocks() {
		const { x, y } = this.position

		if (this.rotation % 2) {
			return [
				{ x, y: y - 1 },
				{ x, y },
				{ x: x + 1, y: y },
				{ x: x + 1, y: y + 1},
			];
		} else {
			return [
				{ x: x - 1, y },
				{ x, y },
				{ x, y: y - 1 },
				{ x: x + 1, y: y - 1 },
			];
		}
	}

	ensureInside({ x, y }, rotation) {
		return {
			x: Math.max(rotation % 2 ? 0 : 1, Math.min(x, Settings.stageSize.width - 2)),
			y: Math.max(1, Math.min(y, Settings.stageSize.height - (rotation % 2 ? 2 : 1)))
		}
	}
}

class TetrisRightStep extends AbstractTetrisFigure {

	get blocks() {
		const { x, y } = this.position

		if (this.rotation % 2) {
			return [
				{ x, y: y + 1 },
				{ x, y },
				{ x: x + 1, y },
				{ x: x + 1, y: y - 1 },
			];
		} else {
			return [
				{ x: x - 1, y },
				{ x, y },
				{ x, y: y + 1 },
				{ x: x + 1, y: y + 1 },
			];
		}
	}

	ensureInside({ x, y }, rotation) {
		return {
			x: Math.max(rotation % 2 ? 0 : 1, Math.min(x, Settings.stageSize.width - 2)),
			y: Math.max(rotation % 2 ? 1 : 0, Math.min(y, Settings.stageSize.height - 2))
		}
	}

}

class TetrisLShape extends AbstractTetrisFigure {

	get blocks() {
		const { x, y } = this.position;

		switch (this.rotation) {
			case 0:
				return [
					{ x, y },
					{ x: x - 1, y },
					{ x: x + 1, y },
					{ x: x + 1, y: y - 1 }
				];
			case 1:
				return [
					{ x, y },
					{ x: x + 1, y: y + 1 },
					{ x, y: y - 1 },
					{ x, y: y + 1 }
				]
			case 2:
				return [
					{ x, y },
					{ x: x - 1, y },
					{ x: x + 1, y },
					{ x: x - 1, y: y + 1 }
				]
			case 3:
				return [
					{ x, y },
					{ x: x - 1, y: y - 1 },
					{ x, y: y - 1 },
					{ x, y: y + 1 }
				]
			default: return []
		}
	}

	ensureInside({ x, y }, rotation) {
		return {
			x: Math.max(rotation === 1 ? 0 : 1, Math.min(x, Settings.stageSize.width - (rotation === 3 ? 1 : 2))),
			y: Math.max(rotation === 2 ? 0 : 1, Math.min(y, Settings.stageSize.height - (rotation === 0 ? 1 : 2)))
		}
	}

}

class TetrisLShapeMirror extends AbstractTetrisFigure {

	get blocks() {
		const { x, y } = this.position;

		switch (this.rotation) {
			case 0:
				return [
					{ x, y },
					{ x: x - 1, y },
					{ x: x + 1, y },
					{ x: x - 1, y: y - 1 }
				];
			case 1:
				return [
					{ x, y },
					{ x: x + 1, y: y - 1 },
					{ x, y: y - 1 },
					{ x, y: y + 1 }
				]
			case 2:
				return [
					{ x, y },
					{ x: x - 1, y },
					{ x: x + 1, y },
					{ x: x + 1, y: y + 1 }
				]
			case 3:
				return [
					{ x, y },
					{ x: x - 1, y: y + 1 },
					{ x, y: y - 1 },
					{ x, y: y + 1 }
				]
			default: return []
		}
	}

	ensureInside({ x, y }, rotation) {
		return {
			x: Math.max(rotation === 1 ? 0 : 1, Math.min(x, Settings.stageSize.width - (rotation === 3 ? 1 : 2))),
			y: Math.max(rotation === 2 ? 0 : 1, Math.min(y, Settings.stageSize.height - (rotation === 0 ? 1 : 2)))
		}
	}

}

const constructors = [
	(point, rotation, color) => new TetrisSquare(point, rotation, color),
	(point, rotation, color) => new TetrisLeftStep(point, rotation, color),
	(point, rotation, color) => new TetrisRightStep(point, rotation, color),
	(point, rotation, color) => new TetrisPedestal(point, rotation, color),
	(point, rotation, color) => new TetrisLine(point, rotation, color),
	(point, rotation, color) => new TetrisLShape(point, rotation, color),
	(point, rotation, color) => new TetrisLShapeMirror(point, rotation, color),
];

export function getRandomFigure() {
	const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const point = {y : 0, x : Math.floor(Math.random() * Settings.stageSize.width)};
	const rotation = Math.floor(Math.random() * 4);
	const shapeIdx = Math.floor(Math.random() * constructors.length);

	return constructors[shapeIdx](point, rotation, color);
}