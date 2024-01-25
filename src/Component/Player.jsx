import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [currValue, setValue] = useState(name);
  const [isEdit, setIsEdit] = useState(false);
  function editHandler() {
    setIsEdit((edit) => !edit);
    if (isEdit) {
      onChangeName(symbol, currValue);
    }
  }
  function inpHandler(e) {
    setValue(e.target.value);
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEdit ? (
          <input type="text" value={currValue} onChange={inpHandler} />
        ) : (
          <span className="player-name">{currValue}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editHandler}>{isEdit ? "Save" : "Edit"}</button>
    </li>
  );
}
