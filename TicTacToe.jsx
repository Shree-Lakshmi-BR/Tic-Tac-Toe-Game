import React, { useState } from 'react';
import "./TicToeToe.css" 

let initialBoard = () => Array(9).fill(null);

function TicTacToe() {
    let [board, setBoard] = useState(initialBoard);
    let [isXNext, setIsXNext] = useState(true);

    let win_pattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let calcWinner = (cboard) => {
        for (let i = 0; i < win_pattern.length; i++) {
            let [x, y, z] = win_pattern[i];
            if (cboard[x] && cboard[x] === cboard[y] && cboard[x] === cboard[z]) {
                return cboard[x];
            }
        }
        return null;
    };

    let updateCell = (i) => {
        let winner = calcWinner(board);
        if (winner || board[i]) return;
        let newBoard = [...board];
        newBoard[i] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    let statusMessage = () => {
        let winner = calcWinner(board);
        if (winner) return `Player ${winner} wins!🥳🥳`;
        if (!board.includes(null)) return "It's a draw!😊😊";
        return `Player ${isXNext ? "X" : "O"}'s turn`;
    };

    let resetGame = () => {
        setBoard(initialBoard());
        setIsXNext(true);
    };

    return (
        <div className='game'>
            <div className="status">
                {statusMessage()}
                <button className='reset' onClick={resetGame}>Reset Game</button>
            </div>
            <div className="board">
                {board.map((b, i) => (
                    <button className='cell' key={i} onClick={() => updateCell(i)} disabled={b !== null}>
                        {b}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TicTacToe;

