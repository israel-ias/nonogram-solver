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
      <button v-on:click="generatePossibilities()">solve</button>

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
import data from '../games/data10';
import { ref, onMounted, type Ref } from 'vue';

let interactions = ref(0);
let isValid = ref(false);
let checkType = ref('');
let idx = ref(0);
let board: Ref<string[][]> = ref([]);
let optIdx = ref(0);

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
    col = checkCollection(data.cols[i], col);
    console.log('returned collection', col);
    console.groupEnd();
    for (let j = 0; j < data.boardSize; j++) {
      board.value[j][i] = col[j];
    }
  }
};
const generatePossibilities = () => {
  tests(1, 1);
  tests(1, 2);
  tests(1, 3);
  tests(1, 4);
  tests(1, 5);
  tests(2, 2);
  tests(2, 3);
  tests(2, 4);
  tests(3, 3);
};

const tests = (length: number, cluesSum: number) => {
  const boardSize = 5;
  //   const params = [1];

  //   const cluesSum = params.reduce((a, b) => a + b, 0);
  const numberOfClues = length;
  const minEmpty = length - 1;
  const minNeeded = cluesSum + minEmpty;
  const freeSpaces = boardSize - minNeeded;

  const possibilitiesCount = calculatePossibilities(freeSpaces + numberOfClues, numberOfClues);
  console.log(
    `length: ${length}, cluesSum: ${cluesSum}, possibilitiesCount: ${possibilitiesCount}`
  );

  //     data.boardSize - (params.reduce((a, b) => a + b, 0) + params.length - 1) + 1;
  //   let possibilities = [];
  //   let p = 0;
  //   for (let i = 0; i < possibilitiesCount; i++) {
  //     let option = [];
  //     for (let j = 0; j < p; j++) {
  //       option.push(0);
  //     }

  //     for (let k = 0; k < params.length; k++) {
  //       for (let j = 0; j < params[k]; j++) {
  //         option.push(1);
  //       }
  //       if (option.length < boardSize) {
  //         option.push(0);
  //       }
  //     }

  //     for (let i = option.length; i < boardSize; i++) {
  //       option.push(0);
  //     }

  //     possibilities.push(option);
  //   }

  //   console.table(possibilities);
};

const calculatePossibilities = (N: number, R: number) => {
  R = Math.min(R, N - R);

  let ans = 1;
  for (let i = 0; i < R; i++) {
    ans = ans * (N - i);
    ans = ans / (i + 1);
  }
  return ans;

  // calculation a!/(b!(a-b)!) stars and bars theorem
};

const checkRows = () => {
  for (let i = 0; i < data.boardSize; i++) {
    console.group('checking row', i);
    board.value[i] = checkCollection(data.rows[i], board.value[i]);
    console.log('returned collection', board.value[i]);
    console.groupEnd();
  }
};

const checkCollection = (params: number[], boardCol: string[]) => {
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

  //get the number of possibilities for the collection
  let possibilities = data.boardSize - (params.reduce((a, b) => a + b, 0) + params.length - 1) + 1;

  let options = [];
  for (let p = 0; p < possibilities; p++) {
    let option = [];

    let keepGoing = true;
    //populate the first cells with clear depending on the
    //possibility that we are creating
    for (let j = 0; j < p; j++) {
      // check if the cell is already active, if so, this is
      // is not a possibility any more
      if (boardCol[p] == 'active') {
        keepGoing = false;
        break;
      }
      option.push('clear');
    }

    if (!keepGoing) {
      continue;
    }

    //populate the cells with active depending on the params
    for (let k = 0; k < params.length; k++) {
      for (let j = 0; j < params[k]; j++) {
        // check if the cell is already clear, if so, this is
        // is not a possibility any more
        if (boardCol[p] == 'clear') {
          keepGoing = false;
          break;
        }
        option.push('active');
      }
      if (!keepGoing) {
        break;
      }
      if (option.length < data.boardSize) {
        option.push('clear');
      }
    }
    if (!keepGoing) {
      continue;
    }

    //populate the rest of the cells with clear
    for (let i = option.length; i < data.boardSize; i++) {
      if (boardCol[i] == 'active') {
        keepGoing = false;
        break;
      }
      option.push('clear');
    }

    if (!keepGoing) {
      continue;
    }

    //add the possibility to the list of options
    options.push(option);
  }

  console.table(options);

  //check if a cell has the same value in all the possibilities
  for (let r = 0; r < data.boardSize; r++) {
    let valid = true;
    let val = '';
    for (let p = 0; p < options.length; p++) {
      if (val == '') {
        val = options[p][r];
      } else if (val != options[p][r]) {
        valid = false;
        break;
      }
    }

    if (valid) {
      boardCol[r] = options[0][r];
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
  if (checkType.value == 'rows') {
    console.group('checking row', idx.value);
    board.value[idx.value] = checkCollection(data.rows[idx.value], board.value[idx.value]);
    console.log('returned collection', board.value[idx.value]);
    console.groupEnd();
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
    console.group('checking column', idx.value);
    col = checkCollection(data.cols[idx.value], col);
    console.log('returned collection', col);
    console.groupEnd();
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
