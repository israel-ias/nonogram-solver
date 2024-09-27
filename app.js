import { data } from "./data10.js";

const app = Vue.createApp({
  data() {
    return {
      cols20: [
        [1],
        [2, 4],
        [11],
        [11, 2],
        [4, 2, 3, 1],
        [1, 1, 2],
        [2, 1, 1, 2],
        [1, 2, 2],
        [1, 1, 3, 4, 1],
        [1, 5, 8],
        [1, 5, 2, 7],
        [1, 2, 3, 3],
        [1, 1, 2, 2],
        [1, 2, 3],
        [1, 2, 6, 1],
        [2, 2, 4, 7],
        [2, 2, 6, 5],
        [2, 1, 9],
        [2, 11],
        [8],
      ],
      rows20: [
        [7],
        [3, 2],
        [3, 3, 2],
        [1, 2, 2, 1],
        [1, 1, 1, 1],
        [2, 1, 2, 4],
        [1, 3, 2, 2],
        [1, 5, 2, 1, 1],
        [2, 3, 2, 2, 2],
        [3, 1, 4, 2, 2],
        [3, 2, 1, 2, 5],
        [6, 2, 2, 6],
        [3, 3, 3, 4],
        [3, 3, 3, 3],
        [2, 2, 3, 2],
        [3, 2, 5],
        [2, 3, 5],
        [2, 3, 4],
        [4, 4, 4],
        [2, 3],
      ],
      board20: [
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
      ],
      cols: [[3], [8], [9], [2, 3], [1, 1], [1, 3, 1], [2, 6], [10], [8], [3]],
      rows: [
        [6],
        [3, 3],
        [2, 2],
        [2, 2],
        [2, 3],
        [4, 5],
        [4, 5],
        [4, 5],
        [2, 3],
        [4],
      ],
      board: [
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
      ],
      boardSize: 10,
      interactions: 0,
      isValid: false,
      checkType: "rows",
      idx: 0,
    };
  },
  methods: {
    setCell(row, col, value) {
      if (this.board[row][col] == "") {
        this.board[row][col] = value;
      }
    },
    checkCols() {
      for (let i = 0; i < this.boardSize; i++) {
        let col = [];
        for (let j = 0; j < this.boardSize; j++) {
          col.push(this.board[j][i]);
        }
        console.group("checking column", i);
        col = this.checkCollection(this.cols[i], col);
        console.log("returned collection", col);
        console.groupEnd();
        for (let j = 0; j < this.boardSize; j++) {
          this.board[j][i] = col[j];
        }
      }
    },
    checkRows() {
      for (let i = 0; i < this.boardSize; i++) {
        console.group("checking row", i);
        this.board[i] = this.checkCollection(this.rows[i], this.board[i]);
        console.log("returned collection", this.board[i]);
        console.groupEnd();
      }
    },

    checkCollection(params, boardCol) {
      console.log("collection to check", params, boardCol);

      //check if the collection is already filled
      if (
        params.reduce((a, b) => a + b, 0) ==
        boardCol.filter((x) => x == "active").length
      ) {
        return boardCol.map((x) => (x == "" ? "clear" : x));
      }

      //check if the param is the same size as the board
      //then set all as active
      if (params.length == 1 && params[0] == this.boardSize) {
        return boardCol.map((x) => "active");
      }

      //get the number of possibilities for the collection
      let possibilities =
        this.boardSize -
        (params.reduce((a, b) => a + b, 0) + params.length - 1) +
        1;

      let options = [];
      for (let p = 0; p < possibilities; p++) {
        let option = [];

        let keepGoing = true;
        //populate the first cells with clear depending on the
        //possibility that we are creating
        for (let j = 0; j < p; j++) {
          // check if the cell is already active, if so, this is
          // is not a possibility any more
          if (boardCol[p] == "active") {
            keepGoing = false;
            break;
          }
          option.push("clear");
        }

        if (!keepGoing) {
          continue;
        }

        //populate the cells with active depending on the params
        for (let k = 0; k < params.length; k++) {
          for (let j = 0; j < params[k]; j++) {
            // check if the cell is already clear, if so, this is
            // is not a possibility any more
            if (boardCol[p] == "clear") {
              keepGoing = false;
              break;
            }
            option.push("active");
          }
          if (!keepGoing) {
            break;
          }
          if (option.length < this.boardSize) {
            option.push("clear");
          }
        }
        if (!keepGoing) {
          continue;
        }

        //populate the rest of the cells with clear
        for (let i = option.length; i < this.boardSize; i++) {
          if (boardCol[i] == "active") {
            keepGoing = false;
            break;
          }
          option.push("clear");
        }

        if (!keepGoing) {
          continue;
        }

        //add the possibility to the list of options
        options.push(option);
      }

      console.table(options);

      //check if a cell has the same value in all the possibilities
      for (let r = 0; r < this.boardSize; r++) {
        let valid = true;
        let val = "";
        for (let p = 0; p < options.length; p++) {
          if (val == "") {
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
    },

    validateBoard() {
      for (let i = 0; i < this.boardSize; i++) {
        if (this.board[i].filter((x) => x == "").length > 0) {
          isValid = false;
          return;
        }
      }
      isValid = true;
    },

    solveBoard() {
      if (this.checkType == "rows") {
        console.group("checking row", this.idx);
        this.board[this.idx] = this.checkCollection(
          this.rows[this.idx],
          this.board[this.idx]
        );
        console.log("returned collection", this.board[this.idx]);
        console.groupEnd();
        this.idx++;
        if (this.idx >= this.boardSize) {
          this.checkType = "cols";
          this.idx = 0;
        }
      } else {
        let col = [];
        for (let j = 0; j < this.boardSize; j++) {
          col.push(this.board[j][this.idx]);
        }
        console.group("checking column", this.idx);
        col = this.checkCollection(this.cols[this.idx], col);
        console.log("returned collection", col);
        console.groupEnd();
        for (let j = 0; j < this.boardSize; j++) {
          this.board[j][this.idx] = col[j];
        }
        this.idx++;
        if (this.idx >= this.boardSize) {
          this.checkType = "rows";
          this.idx = 0;
          this.interactions++;
        }
      }

      // do {
      //   this.interactions++;
      //   this.checkCols();
      //   this.checkRows();
      //   this.validateBoard();

      //   if (this.interactions > 10) {
      //     break;
      //   }
      // } while (!this.isValid);
    },
  },
});

app.mount("#nonogram-board");
