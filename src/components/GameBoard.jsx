
export default function GameBoard({handleSelectedSquare , board }) {
  return board.map((row, rowIndex) => (
    <li key={rowIndex}>
      <ol>
        {row.map((col, colIndex) => (
          <li key={colIndex}>
            <button onClick={()=> handleSelectedSquare(rowIndex, colIndex)} disabled={col !== null} >{col}</button>
          </li>
        ))}
      </ol>
    </li>
  ));
}
