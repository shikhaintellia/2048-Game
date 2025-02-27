
export const getEmptyBoard = () => {
  return Array(4)
    .fill(0)
    .map(() => Array(4).fill(0));
};

export const generateRandom = (board) => {
  let emptyCells = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        emptyCells.push({ row: i, col: j });
      }
    }
  }

  if (emptyCells.length === 0) return board;

  const { row, col } =
    emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[row][col] = Math.random() < 0.9 ? 2 : 4;

  return board;
};

// Function to compress (move tiles) and merge tiles with score tracking
const moveAndMerge = (row) => {
  let newRow = row.filter((num) => num !== 0); // Remove zeros
  let score = 0;

  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2; // Merge
      score += newRow[i]; // Add merged tile to score
      newRow[i + 1] = 0;
    }
  }

  newRow = newRow.filter((num) => num !== 0); // Remove merged zeroes
  while (newRow.length < 4) newRow.push(0); // Fill with zeroes

  return { row: newRow, score };
};

// Function to move left with score tracking
export const moveLeft = (board) => {
  let newBoard = [];
  let totalScore = 0;

  for (let i = 0; i < 4; i++) {
    let { row, score } = moveAndMerge(board[i]);
    newBoard.push(row);
    totalScore += score;
  }

  return { board: newBoard, score: totalScore };
};

// Function to move right with score tracking
export const moveRight = (board) => {
  let newBoard = [];
  let totalScore = 0;

  for (let i = 0; i < 4; i++) {
    let reversedRow = [...board[i]].reverse();
    let { row, score } = moveAndMerge(reversedRow);
    newBoard.push(row.reverse());
    totalScore += score;
  }

  return { board: newBoard, score: totalScore };
};

// Function to move up with score tracking
export const moveUp = (board) => {
  let newBoard = Array(4)
    .fill(0)
    .map(() => Array(4).fill(0));
  let totalScore = 0;

  for (let col = 0; col < 4; col++) {
    let column = board.map((row) => row[col]);
    let { row, score } = moveAndMerge(column);
    totalScore += score;
    for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
      newBoard[rowIdx][col] = row[rowIdx];
    }
  }

  return { board: newBoard, score: totalScore };
};

// Function to move down with score tracking
export const moveDown = (board) => {
  let newBoard = Array(4)
    .fill(0)
    .map(() => Array(4).fill(0));
  let totalScore = 0;

  for (let col = 0; col < 4; col++) {
    let column = board.map((row) => row[col]).reverse();
    let { row, score } = moveAndMerge(column);
    totalScore += score;
    row.reverse();
    for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
      newBoard[rowIdx][col] = row[rowIdx];
    }
  }

  return { board: newBoard, score: totalScore };
};

// Check if the game is over (no moves left)
export const isOver = (board) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) return false;
      if (j < 3 && board[i][j] === board[i][j + 1]) return false;
      if (i < 3 && board[i][j] === board[i + 1][j]) return false;
    }
  }
  return true;
};

// Check if player wins (reaches 2048)
export const checkWin = (board) => {
  return board.some((row) => row.includes(2048));
};

