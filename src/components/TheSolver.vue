<template>
	<section id="nonogram-board">
		<div>
			<div>
				<table :key="interactions">
					<tr class="col-header">
						<td></td>
						<td v-for="(col, colIndex) in data.cols" :key="colIndex">
							<p v-for="(hint, hintIndex) in col" :key="hintIndex">
								{{ hint }}
							</p>
						</td>
					</tr>
					<tr v-for="(row, rowIndex) in board" :key="rowIndex">
						<td class="row-header">
							<span v-for="(hint, hintIndex) in data.rows[rowIndex]" :key="hintIndex">
								{{ hint }}
							</span>
						</td>
						<td v-for="(cell, cellIndex) in row" :key="cellIndex" :class="cell"></td>
					</tr>
				</table>
			</div>
			<button v-on:click="solveBoard()">solve</button>

			<br />
			<br />
			<p>{{ interactions }} - {{ isValid }} - {{ checkType }} - idx: {{ idx }}</p>
		</div>
		<div>
			<table :key="optIdx">
				<tr v-for="(row, rowIndex) in board.length" :key="rowIndex">
					<td v-for="(cell, cellIndex) in board.length" :key="cellIndex" :class="cell"></td>
				</tr>
			</table>
		</div>
	</section>
</template>

<script setup lang="ts">
import data from '../games/data5';
import { ref, onMounted, type Ref } from 'vue';
import { generateColOptions, generateRowOptions } from '../helper/solver-handler';

let interactions = ref(0);
let isValid = ref(false);
let checkType = ref('');
let idx = ref(0);
let board: Ref<string[][]> = ref([]);
let optIdx = ref(0);
let rowsOptions: Ref<number[][][]> = ref([]);
let colsOptions: Ref<number[][][]> = ref([]);
let isFirstCall = ref(true);

onMounted(() => {
	board.value = Array.from({ length: data.boardSize }, () =>
		Array.from({ length: data.boardSize }, () => '')
	);
});

const setCell = (row: number, col: number, value: string) => {
	if (board.value[row][col] == '') {
		board.value[row][col] = value;
	}
};

const checkCols = () => {
	for (let i = 0; i < data.boardSize; i++) {
		let col: string[] = [];
		for (let j = 0; j < data.boardSize; j++) {
			col.push(board.value[j][i]);
		}
		console.group('checking column', i);
		col = checkCollection(data.cols[i], col, i, colsOptions.value);
		console.log('returned collection', col);
		console.groupEnd();
		for (let j = 0; j < data.boardSize; j++) {
			board.value[j][i] = col[j];
		}
	}
};

const checkRows = () => {
	for (let i = 0; i < data.boardSize; i++) {
		console.group('checking row', i);
		board.value[i] = checkCollection(data.rows[i], board.value[i], i, rowsOptions.value);
		console.log('returned collection', board.value[i]);
		console.groupEnd();
	}
};

const checkCollection = (
	params: number[],
	boardCol: string[],
	idx: number,
	options: number[][][]
) => {
	console.log('collection to check', params, boardCol);

	//check if the collection is already filled
	if (params.reduce((a, b) => a + b, 0) == boardCol.filter((x) => x == 'active').length) {
		return boardCol.map((x) => (x == '' ? 'clear' : x));
	}

	//check if the param is the same size as the board
	//then set all as active
	if (params.length == 1 && params[0] == data.boardSize) {
		return boardCol.map(() => 'active');
	}

	//check if a cell has the same value in all the possibilities
	for (let r = 0; r < data.boardSize; r++) {
		let valid = true;
		let remove = false;
		const boardVal = boardCol[r] == '' ? -1 : boardCol[r] == 'active' ? 1 : 0;
		let val = -1;
		for (let p = 0; p < options.length; p++) {
			if (val == -1) {
				val = options[idx][p][r];
				if (val != boardVal && boardVal != -1) {
					remove = true;
					valid = false;
					break;
				}
			} else if (val != options[idx][p][r]) {
				valid = false;
				break;
			}
		}

		if (remove) {
			options[idx] = options[idx].splice(r, 1);
		}

		if (valid) {
			boardCol[r] = options[idx][0][r] == 1 ? 'active' : 'clear';
		}
	}

	return boardCol;
};

const validateBoard = () => {
	for (let i = 0; i < data.boardSize; i++) {
		if (board.value[i].filter((x) => x == '').length > 0) {
			isValid.value = false;
			return;
		}
	}
	isValid.value = true;
};

const solveBoard = () => {
	if (isFirstCall.value) {
		rowsOptions.value = generateRowOptions(data.rows, data.boardSize);
		colsOptions.value = generateColOptions(data.cols, data.boardSize);
		isFirstCall.value = false;
	}

	if (checkType.value == 'rows') {
		board.value[idx.value] = checkCollection(
			data.cols[idx.value],
			board.value[idx.value],
			idx.value,
			rowsOptions.value
		);

		idx.value++;
		if (idx.value >= data.boardSize) {
			checkType.value = 'cols';
			idx.value = 0;
		}
	} else {
		let col = [];
		for (let j = 0; j < data.boardSize; j++) {
			col.push(board.value[j][idx.value]);
		}
		col = checkCollection(data.cols[idx.value], col, idx.value, colsOptions.value);
		for (let j = 0; j < data.boardSize; j++) {
			board.value[j][idx.value] = col[j];
		}
		idx.value++;
		if (idx.value >= data.boardSize) {
			checkType.value = 'rows';
			idx.value = 0;
			interactions.value++;
		}
	}
};
</script>
