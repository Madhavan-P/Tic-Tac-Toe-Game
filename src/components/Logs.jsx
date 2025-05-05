export default function Logs({turns}){
    // const logs = ["log1","log2"];
    return(
        <ol id="log">
            {turns.map((turn)=>(
                <li key={`${turn.square.row}${turn.square.col}`}>{turn.playerTurn} Selected {turn.square.row},{turn.square.col}</li>
            ))}
        </ol>
    )
}