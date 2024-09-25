const app = Vue.createApp({
  data() {
    return {
      cols: [
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
      rows: [
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
      board: [
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
      boardSize: 20,
      interactions: 0,
      isValid: false,
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
          col.push(this.board[i][j]);
        }
        col = this.checkCollection(this.cols[i], col);
        for (let j = 0; j < this.boardSize; j++) {
          this.board[i][j] = col[j];
        }
      }
      // for (let i = 0; i < this.cols.length; i++) {
      //   if (this.cols[i].length == 1 && this.cols[i][0] == this.boardSize) {
      //     for (let k = 0; k < this.boardSize; k++) {
      //       this.setCell(k, i, "active");
      //     }
      //   }

      //   let options =
      //     this.boardSize -
      //     this.cols[i].reduce((a, b) => a + b, 0) +
      //     this.cols[i].length;
      //   let tempCol = [];
      //   for (let o = 0; o < options; o++) {
      //     tempCol[o] = [];

      //     for (let j = 0; j < o; j++) {
      //       tempCol[o].push("clear");
      //     }

      //     for (let k = 0; k < this.cols[i].length; k++) {
      //       for (let j = 0; j < this.cols[i][k]; j++) {
      //         tempCol[o].push("active");
      //       }
      //       if (tempCol.length < this.boardSize) {
      //         tempCol[o].push("clear");
      //       }
      //     }

      //     while (tempCol[o].length < this.boardSize) {
      //       tempCol[o].push("clear");
      //     }
      //   }

      //   for (let r = 0; r < this.boardSize; r++) {
      //     let valid = true;
      //     let val = "";
      //     for (let o = 0; o < options; o++) {
      //       if (val == "") {
      //         val = tempCol[o][r];
      //       } else if (val != tempCol[o][r]) {
      //         valid = false;
      //         break;
      //       }
      //     }

      //     if (valid) {
      //       this.setCell(r, i, tempCol[0][r]);
      //     }
      //   }
      // }
    },
    checkRows() {
      for (let i = 0; i < this.boardSize; i++) {
        this.board[i] = this.checkCollection(this.rows[i], this.board[i]);
      }
    },

    checkCollection(params, boardCol) {
      if (params.length == 1 && params[0] == this.boardSize) {
        for (let k = 0; k < this.boardSize; k++) {
          boardCol[k] = "active";
        }
        return boardCol;
      }

      let possibilities =
        this.boardSize -
        (params.reduce((a, b) => a + b, 0) + params.length - 1) +
        1;
      let options = [];
      for (let p = 0; p < possibilities; p++) {
        let option = [];

        let keepGoing = true;
        for (let j = 0; j < p; j++) {
          if (boardCol[p] == "active") {
            keepGoing = false;
            break;
          }
          option.push("clear");
        }

        if (!keepGoing) {
          continue;
        }

        for (let k = 0; k < params.length; k++) {
          for (let j = 0; j < params[k]; j++) {
            if (boardCol[p] == "clear") {
              keepGoing = false;
              break;
            }
            option.push("active");
          }
          if (!keepGoing) {
            break;
          }
          if (options.length < this.boardSize) {
            option.push("clear");
          }
        }
        if (!keepGoing) {
          continue;
        }

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

        options.push(option);
      }

      for (let r = 0; r < this.boardSize; r++) {
        let valid = true;
        let val = "";
        for (let p = 0; p < possibilities; p++) {
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
        for (let j = 0; j < this.boardSize; j++) {
          if (this.board[i][j] == "") {
            isValid = false;
            return;
          }
        }
      }
      isValid = true;
    },

    solveBoard() {
      while (!this.isValid) {
        this.interactions++;
        this.checkCols();
        this.checkRows();
        this.validateBoard();

        if (this.interactions > 10) {
          break;
        }
      }
    },
  },
});

app.mount("#nonogram-board");
