<template>
	<section id="nonogram-board">
		<div>
			<div>
				<table :key="interactions">
					<tbody>
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
					</tbody>
				</table>
			</div>
			<div v-if="working" class="loader"></div>
			<button v-if="!working && !isValid" v-on:click="solveBoard()">solve</button>

			<!-- <p>{{ interactions }} - {{ isValid }} - {{ checkType }} - idx: {{ idx }}</p> -->
		</div>
	</section>
</template>

<script setup lang="ts">
import data from '../games/data15';
import { ref, onMounted, type Ref } from 'vue';
import { generateColOptions, generateRowOptions } from '../helper/solver-handler';

let interactions = ref(0);
let isValid = ref(false);
let checkType = ref('rows');
let idx = ref(0);
let board: Ref<string[][]> = ref([]);
let rowsOptions: Ref<number[][][]> = ref([]);
let colsOptions: Ref<number[][][]> = ref([]);
let working = ref(false);

onMounted(() => {
	board.value = Array.from({ length: data.boardSize }, () =>
		Array.from({ length: data.boardSize }, () => '')
	);
});

const checkCols = () => {
	let col = [];
	for (let j = 0; j < data.boardSize; j++) {
		col.push(board.value[j][idx.value]);
	}

	// console.group('checking col' + idx.value);
	// console.table(data.cols[idx.value]);
	// console.table(col);
	// console.log('options', colsOptions.value[idx.value]);
	// console.groupEnd();

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
};

const checkRows = () => {
	// console.group('checking row' + idx.value);
	// console.table(data.rows[idx.value]);
	// console.table(board.value[idx.value]);
	// console.log('options', rowsOptions.value[idx.value]);
	// console.groupEnd();
	board.value[idx.value] = checkCollection(
		data.rows[idx.value],
		board.value[idx.value],
		idx.value,
		rowsOptions.value
	);

	idx.value++;
	if (idx.value >= data.boardSize) {
		checkType.value = 'cols';
		idx.value = 0;
	}
};

const checkCollection = (
	params: number[],
	boardCol: string[],
	idx: number,
	options: number[][][]
) => {
	// check if the collection is already filled
	if (boardCol.filter((x) => x == '').length == 0) return boardCol;

	// check if the collection is already filled with the active cells
	// then set the rest as clear
	if (params.reduce((a, b) => a + b, 0) == boardCol.filter((x) => x == 'active').length) {
		return boardCol.map((x) => (x == '' ? 'clear' : x));
	}

	// check if the param is the same size as the board
	// then set all as active
	if (params.length == 1 && params[0] == data.boardSize) {
		return boardCol.map(() => 'active');
	}

	// foreach cell, check if the value is the same in all the possibilities
	for (let r = 0; r < data.boardSize; r++) {
		let valid = true;
		let removeIdx = -1;
		const boardVal = boardCol[r] == '' ? -1 : boardCol[r] == 'active' ? 1 : 0;
		let val = -1;
		for (let p = 0; p < options[idx].length; p++) {
			// check if the cell is already filled
			if (boardVal != -1) {
				// if the cell is filled, check if the value is the same as the board
				// if not, remove the possibility
				if (options[idx][p][r] != boardVal) {
					removeIdx = p;
					valid = false;
					break;
				}
			} else if (val == -1) {
				val = options[idx][p][r];
				if (val != boardVal && boardVal != -1) {
					removeIdx = p;
					valid = false;
					break;
				}
			} else if (val != options[idx][p][r]) {
				valid = false;
				break;
			}
		}

		if (removeIdx > -1) {
			options[idx].splice(removeIdx, 1);
		}

		if (valid) {
			boardCol[r] = options[idx][0][r] == 1 ? 'active' : 'clear';
		}
	}

	if (params.reduce((a, b) => a + b, 0) == boardCol.filter((x) => x == 'active').length) {
		boardCol = boardCol.map((x) => (x == '' ? 'clear' : x));
	}

	// console.table(boardCol);
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
	console.timeEnd('solve');
};

const solveBoard = () => {
	rowsOptions.value = generateRowOptions(data.rows, data.boardSize);
	colsOptions.value = generateColOptions(data.cols, data.boardSize);

	// while (!isValid.value) {
	// if (checkType.value == 'rows') {
	// 	checkRows();
	// } else {
	// 	checkCols();
	// }
	// validateBoard();
	working.value = true;
	setTimeout(() => {
		interact();
	}, 50);

	// }
};

const interact = () => {
	if (checkType.value == 'rows') {
		checkRows();
	} else {
		checkCols();
	}
	validateBoard();

	if (isValid.value || interactions.value > 1000) {
		working.value = false;
		return;
	}

	interact();
};
</script>

<style>
.loader {
	border: 16px solid #f3f3f3; /* Light grey */
	border-top: 16px solid #3498db; /* Blue */
	border-radius: 50%;
	width: 120px;
	height: 120px;
	animation: spin 2s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
