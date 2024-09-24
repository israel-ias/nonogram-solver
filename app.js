const app = Vue.createApp({
  data() {
    return {
      cols: [[5], [1, 2], [4], [1, 2], [4]],
      rows: [[2, 1], [1, 1, 1], [1, 1, 1], [5], [5]],
      board: [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ],
      boardSize: 5,
      interactions: 0,
    };
  },
  methods: {
    setCell(row, col, value) {
      if (this.board[row][col] == "") {
        this.board[row][col] = value;
      }
    },
    checkCols() {
      for (let i = 0; i < this.cols.length; i++) {
        if (this.cols[i].length == 1 && this.cols[i][0] == this.boardSize) {
          for (let k = 0; k < this.boardSize; k++) {
            this.setCell(k, i, "active");
          }
        }

        let options =
          this.boardSize -
          this.cols[i].reduce((a, b) => a + b, 0) +
          this.cols[i].length;
        let tempCol = [];
        for (let o = 0; o < options; o++) {
          tempCol[o] = [];

          for (let j = 0; j < o; j++) {
            tempCol[o].push("clear");
          }

          for (let k = 0; k < this.cols[i].length; k++) {
            for (let j = 0; j < this.cols[i][k]; j++) {
              tempCol[o].push("active");
            }
            if (tempCol.length < this.boardSize) {
              tempCol[o].push("clear");
            }
          }

          while (tempCol[o].length < this.boardSize) {
            tempCol[o].push("clear");
          }
        }

        for (let r = 0; r < this.boardSize; r++) {
          let valid = true;
          let val = "";
          for (let o = 0; o < options; o++) {
            if (val == "") {
              val = tempCol[o][r];
            } else if (val != tempCol[o][r]) {
              valid = false;
              break;
            }
          }

          if (valid) {
            this.setCell(r, i, tempCol[0][r]);
          }
        }
      }
    },
    checkRows() {
      for (let i = 0; i < this.boardSize; i++) {
        this.board[i] = this.checkCollection(this.rows[i], this.board[i]);
        // if (this.rows[i].length == 1 && this.rows[i][0] == this.boardSize) {
        //   for (let k = 0; k < this.boardSize; k++) {
        //     this.setCell(i, k, "active");
        //   }
        // }

        // let options =
        //   this.boardSize -
        //   (this.rows[i].reduce((a, b) => a + b, 0) + this.rows[i].length - 1) +
        //   1;

        // let tempRow = [];
        // for (let o = 0; o < options; o++) {
        //   tempRow[o] = [];

        //   for (let j = 0; j < o; j++) {
        //     tempRow[o].push("clear");
        //   }

        //   for (let k = 0; k < this.rows[i].length; k++) {
        //     for (let j = 0; j < this.rows[i][k]; j++) {
        //       tempRow[o].push("active");
        //     }
        //     if (tempRow.length < this.boardSize) {
        //       tempRow[o].push("clear");
        //     }
        //   }

        //   while (tempRow[o].length < this.boardSize) {
        //     tempRow[o].push("clear");
        //   }
        // }

        // for (let r = 0; r < this.boardSize; r++) {
        //   let valid = true;
        //   let val = "";
        //   for (let o = 0; o < options; o++) {
        //     if (val == "") {
        //       val = tempRow[o][r];
        //     } else if (val != tempRow[o][r]) {
        //       valid = false;
        //       break;
        //     }
        //   }

        //   if (valid) {
        //     this.setCell(i, r, tempRow[0][r]);
        //   }
        // }
      }
    },

    checkCollection(params, boardCol) {
      if (params.length == 1 && params[0] == this.boardSize) {
        for (let k = 0; k < this.boardSize; k++) {
          boardCol[k] = "active";
        }
        return boardCol;
      }

      let options =
        this.boardSize -
        (params.reduce((a, b) => a + b, 0) + params.length - 1) +
        1;
      let tempRow = [];
      for (let o = 0; o < options; o++) {
        tempRow[o] = [];

        for (let j = 0; j < o; j++) {
          tempRow[o].push("clear");
        }

        for (let k = 0; k < params.length; k++) {
          for (let j = 0; j < params[k]; j++) {
            tempRow[o].push("active");
          }
          if (tempRow.length < this.boardSize) {
            tempRow[o].push("clear");
          }
        }

        while (tempRow[o].length < this.boardSize) {
          tempRow[o].push("clear");
        }
      }

      for (let r = 0; r < this.boardSize; r++) {
        let valid = true;
        let val = "";
        for (let o = 0; o < options; o++) {
          if (val == "") {
            val = tempRow[o][r];
          } else if (val != tempRow[o][r]) {
            valid = false;
            break;
          }
        }

        if (valid) {
          boardCol[r] = tempRow[0][r];
        }
      }

      return boardCol;
    },

    validateBoard() {
      for (let i = 0; i < this.boardSize; i++) {
        for (let j = 0; j < this.boardSize; j++) {
          if (this.board[i][j] == "") {
            return false;
          }
        }
      }
      return true;
    },

    solveBoard() {
      this.checkCols();
      this.interactions++;
      this.checkRows();
      this.interactions++;
      alert(this.validateBoard());
    },
  },
});

app.mount("#nonogram-board");
