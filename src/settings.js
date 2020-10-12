const Settings = {
	cellSize : 40,
	updateRate : 1000,
	stageSize: {width : 9, height : 20}
}

export default Settings;

export function getRealSize(logicSize) {
  return logicSize * Settings.cellSize
}

export function addPx(value) {
  return value + 'px';
}
