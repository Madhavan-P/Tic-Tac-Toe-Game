import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Logs from "./components/Logs";
import {WINNING_COMBINATION} from './Wining_Combination.js'
import GameOver from "./components/GameOver.jsx";

function derivedActivePlayer(gameTurns){
  let currentPlayer = "X";
      if (gameTurns.length > 0 && gameTurns[0].playerTurn === "X") {
        currentPlayer = "O";
      }
    return currentPlayer;
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


const PLAYERS = {
  X :"Player 1",
  O :"Player 2",
}

function DerivedGameBoard(gameTurn){
  
  let gameBoard = [...INITIAL_GAME_BOARD].map((array)=>[...array]);

  for(const turns of gameTurn){
    const {square , playerTurn} = turns;
    const {row,col} = square;
    console.log(gameBoard[row][col]);
    
    gameBoard[row][col] = playerTurn;
    console.log(gameBoard[row][col]);
  }
  return gameBoard;
}


function DerivedWinner(gameBoard,playerName){
  let winner ;

  for (const combination of WINNING_COMBINATION){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

      if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        winner = playerName[firstSquareSymbol];
        // winner = firstSquareSymbol;
      }
      
  }

  return winner;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [playerName, setPlayerName] =  useState(PLAYERS)
  // console.log(playerName[]);

  function handleNewName(symbol,newName){
    setPlayerName(
      prevName => ( 
        { ...prevName , [symbol] : newName } )
    )
  }

  function handleRematch(){
    setGameTurn([]);
  }

  const activePlayer = derivedActivePlayer(gameTurn)

  const gameBoard = DerivedGameBoard(gameTurn);

  const winner = DerivedWinner(gameBoard,playerName);
  

  const hasDraw  = gameTurn.length === 9 && !winner

  function handleSelectedSquare(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {

      const currentPlayer = derivedActivePlayer(prevTurn)

      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, playerTurn: currentPlayer },
        ...prevTurn,
      ];

      return updatedTurn;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} names = {handleNewName} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} names = {handleNewName} />
        </ol>
        <ol id="game-board">
          {/* {winner && <p>You won, {winner}!</p>} */}
          {(winner  || hasDraw) && <GameOver winner={winner} rematch={handleRematch}/> }
          <GameBoard 
            handleSelectedSquare={handleSelectedSquare}
            board={gameBoard} 
          />
        </ol>
      </div>
      <Logs turns={gameTurn} />
    </main>
  );
}

export default App;
