import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function TicTacToe() {
  // Game state: board, whose turn, winner/draw, etc.
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell);

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    if (board[idx] || winner) return;
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(emptyBoard);
    setXIsNext(true);
  }

  // Determine current status message
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Turn: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="ttt-outer">
      <div className="ttt-container">
        <div className="ttt-status" data-testid="status">{status}</div>

        <div className="ttt-board" role="grid">
          {board.map((cell, idx) => (
            <button
              key={idx}
              className="ttt-cell"
              onClick={() => handleCellClick(idx)}
              aria-label={`Row ${Math.floor(idx/3) + 1} Column ${idx%3 + 1}`}
              disabled={!!cell || !!winner}
              data-testid={`cell-${idx}`}
            >
              {cell}
            </button>
          ))}
        </div>

        <button className="ttt-reset-btn" onClick={handleReset} data-testid="reset">
          Reset
        </button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(squares) {
  // All winning lines
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6] // diags
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <div className="app" style={{ minHeight: "100vh" }}>
      <main>
        <TicTacToe />
      </main>
    </div>
  );
}

export default App;
