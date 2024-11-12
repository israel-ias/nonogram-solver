// formula to calculate the number of possibilities
// calculation a!/(b!(a-b)!) stars and bars theorem
const calculatePossibilities = (N: number, R: number) => {
	R = Math.min(R, N - R);
	let ans = 1;
	for (let i = 0; i < R; i++) {
		ans = ans * (N - i);
		ans = ans / (i + 1);
	}
	return ans;
};

const generateOptions = (params: number[], boardSize: number): number[][] => {
	const cluesSum = params.reduce((a, b) => a + b, 0);
	const numberOfClues = params.length;
	const minEmpty = params.length - 1;
	const minNeeded = cluesSum + minEmpty;
	const freeSpaces = boardSize - minNeeded;

	const options = [];
	if (params.length > 2) {
		const firstParam = params[0];
		params = params.slice(1);

		for (let o = 0; o <= freeSpaces; o++) {
			const result = [];

			for (let j = 0; j < o; j++) {
				result.push(0);
			}

			for (let j = 0; j < firstParam; j++) {
				result.push(1);
			}
			result.push(0);

			const subOptions = generateOptions(params, boardSize - result.length);

			for (let i = 0; i < subOptions.length; i++) {
				const tmp = [...result];
				tmp.push(...subOptions[i]);
				options.push(tmp);
			}
		}

		return options;
	}

	const possibilities = calculatePossibilities(freeSpaces + numberOfClues, numberOfClues);

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

const generateRowOptions = (rowsParams: number[][], boardSize: number): number[][][] => {
	const rowsPossibilities = [];
	for (let i = 0; i < boardSize; i++) {
		rowsPossibilities.push(generateOptions(rowsParams[i], boardSize));
	}
	return rowsPossibilities;
};

const generateColOptions = (colsParams: number[][], boardSize: number): number[][][] => {
	const colsPossibilities = [];
	for (let i = 0; i < boardSize; i++) {
		colsPossibilities.push(generateOptions(colsParams[i], boardSize));
	}
	return colsPossibilities;
};

export { generateColOptions, generateRowOptions };
