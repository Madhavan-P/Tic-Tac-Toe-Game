import { useState } from "react";

export default function Player({ name, symbol,isActive , names}) {
// export default function Player({ name, symbol,isActive }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleButtonClick() {
    setIsEditing(editing => !editing);
    if(isEditing) names(symbol,playerName);
  }

  function handleChange(event){
    setPlayerName(event.target.value);
    console.log(event);
  }

  let playerNameStatus = <span className="player-name">{playerName}</span>;
  let btnCaption = "Edit";

  if (isEditing) {
    playerNameStatus = <input type="text" placeholder="Player Name" required value={playerName} onChange={handleChange}/>;
    btnCaption = "Save";
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameStatus}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleButtonClick}>{btnCaption}</button>
    </li>
  );
}
