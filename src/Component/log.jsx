export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.column}`}>
          {turn.player} Selected {turn.square.row},{turn.square.column}
        </li>
      ))}
    </ol>
  );
}
