import React, { useEffect, useState } from "react";
import {
  getEmptyBoard,
  generateRandom,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  isOver,
  checkWin,
} from "./GameBoard";

const Cell = ({ number }) => {
  return (
    <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
  );
};

const GameController = () => {
  const [board, updateBoard] = useState(() => {
    let newBoard = getEmptyBoard();
    newBoard = generateRandom(newBoard);
    newBoard = generateRandom(newBoard);
    return newBoard;
  })

  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScore")
      ? parseInt(localStorage.getItem("bestScore"))
      : 0
  );

  const checkEndGame = () => {
    if (checkWin(board)) {
      console.log("You win!!");
    } else if (isOver(board)) {
      console.log("Game over!!");
      setGameOver(true);
    }
  };

  const handleMove = (moveFunc) => {
    const { board: newBoard, score: gainedScore } = moveFunc(board);
    updateBoard(generateRandom(newBoard));
    setScore((prev) => prev + gainedScore);
    checkEndGame();
  };

  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        handleMove(moveLeft);
        break;
      case "ArrowRight":
        handleMove(moveRight);
        break;
      case "ArrowUp":
        handleMove(moveUp);
        break;
      case "ArrowDown":
        handleMove(moveDown);
        break;
      default:
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score);
      console.log("score")
    }
  }, [score, bestScore]);

  const handleNewGame = () => {
    setScore(0);
    setGameOver(false);
    let newBoard = getEmptyBoard();
    newBoard = generateRandom(newBoard);
    newBoard = generateRandom(newBoard);
    updateBoard(newBoard);
  };

  return (
    <>
      <div className="main-cont">
        <div className="main-head">
          <div className="score-container">
            <h1 className="title-2048">
              <a href="/">2048</a>
            </h1>
            <div className="score">Score: {score}</div>
            <div className="best-score">Best Score: {bestScore}</div>
          </div>
          <div className="game-header">
            <div className="text-container">
              <h1>Play 2048 Game Online</h1>
              <p>
                Join the numbers and get to the <strong>2048 tile!</strong>
              </p>
            </div>
            <button className="new-game-btn" onClick={handleNewGame}>
              New Game
            </button>
          </div>
        </div>

        <div className="game-board">
          {board.map((row, i) => (
            <div key={i} className="row">
              {row.map((cell, j) => (
                <Cell key={j} number={cell} />
              ))}
            </div>
          ))}
        </div>
      </div>
      {gameOver && (
        <div className="popup">
          <div className="popup-content">
            <h1>Game Over...!</h1>
            <button onClick={handleNewGame}>Try Again</button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameController;
