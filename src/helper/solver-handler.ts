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

const generateOptions = (params: number[], boardSize: number): number[][] => {
  console.log(params, boardSize);
  const cluesSum = params.reduce((a, b) => a + b, 0);
  const numberOfClues = params.length;
  const minEmpty = params.length - 1;
  const minNeeded = cluesSum + minEmpty;
  const freeSpaces = boardSize - minNeeded;

  let options = [];
  if (params.length > 2) {
    const firstParam = params[0];
    params = params.slice(1);
    options = generateOptions(params, boardSize - firstParam);
    const result = [];
    for (let j = 0; j < firstParam; j++) {
      result.push(1);
    }
    result.push(0);
    for (let i = 0; i < options.length; i++) {
      result.push([...options[i]]);
    }

    return options;
  }

  const possibilities = calculatePossibilities(freeSpaces + numberOfClues, numberOfClues);

  console.log(possibilities);

  let spaceBefore = 0;
  let spaceBetween = 0;

  for (let p = 0; p < possibilities; p++) {
    const option = [];
    for (let j = 0; j < spaceBefore; j++) {
      option.push(0);
    }

    for (let j = 0; j < params.length; j++) {
      for (let k = 0; k < params[j]; k++) {
        option.push(1);
      }

      if (option.length < boardSize) {
        option.push(0);
      }

      if (j == 0) {
        for (let i = 0; i < spaceBetween; i++) {
          option.push(0);
        }
      }
    }

    for (let i = option.length; i < boardSize; i++) {
      option.push(0);
    }

    options.push(option);

    spaceBetween++;
    if (params.length == 1 || spaceBetween + spaceBefore > freeSpaces) {
      spaceBetween = 0;
      spaceBefore++;
    }
  }

  return options;
};

const params = [1, 1, 1];
const boardSize = 10;

const options = generateOptions(params, boardSize);

console.log(options);
