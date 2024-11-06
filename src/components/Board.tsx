import React, { useState } from 'react';

interface BoardProps {
  onGameEnd: (result: 'win' | 'lose' | 'draw') => void;
}
function Board({onGameEnd}: BoardProps) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const clearBoard = () => {
    setTimeout(() => {
      setBoard(Array(9).fill(null));
    }, 1500);
  }

  const handleClick = (index: number) => {
    if (board[index] || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    if (checkWin(newBoard, 'X')) {
      onGameEnd('win');
      clearBoard();
      return;
    }

    setIsPlayerTurn(false);
    setTimeout(() => botMove(newBoard), 500);
  };

  const botMove = (currentBoard: string[]) => {
    const emptyCells = currentBoard.map((cell, index) => (cell ? null : index)).filter((index) => index !== null);
    if (emptyCells.length === 0) {
      onGameEnd('draw');
      clearBoard();
      return;
    }

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)] as number;
    currentBoard[randomIndex] = 'O';
    setBoard([...currentBoard]);

    if (checkWin(currentBoard, 'O')) {
      onGameEnd('lose');
      clearBoard();
    } else {
      setIsPlayerTurn(true);
    }
  };

  const checkWin = (board: string[], player: 'X' | 'O') => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombinations.some(
      (combination) => combination.every((index) => board[index] === player)
    );
  };

  return (
    <div className="board columns-3 gap-0 border border-slate-600">
      {board.map((cell, index) => (
        <div key={index} className={`cell flex items-center justify-center border border-slate-600 aspect-square font-rubik-wet-paint text-[40px]`} onClick={() => handleClick(index)}>
          <div className={`relative z-10`}>
            <span className={`${cell === 'X' ? 'text-red-500' : 'text-blue-500'} relative z-10`}>{cell}</span>
            <span className={`text-slate-400 block font-rubik-wet-paint text-[40px] absolute z-0 top-1 right-1`}>{cell}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
