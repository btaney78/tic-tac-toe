// notice properties takeTurn and id are being passed in
const Square = ({ takeTurn, id, newState }) => {
  const [color, setColor] = React.useState("green");
  const [status, setStatus] = React.useState(null);
  const XorO = ["O", "X"];

  const palet = ["blue", "red", "green"];
  const getRandomColor = () => palet[Math.floor(Math.random()*3)];
  // id is the square's number
  // We call takeTurn to tell Parent we have clicked in this square

  
  return (
    <button
      onClick={(e) => {
        let col = getRandomColor() // needed to use below
        setColor(col);
        let nextplayer = newState(id);
        //e.preventDefault();
        setStatus(nextplayer);
        e.target.style.background = col;
      }}
    ><h1>{XorO[status]}</h1></button> 
  );
};

const Board = () => {
  // 1st player is 1
  // State keeps track of next player
  const [player, setPlayer] = React.useState(0);
  const [state, setState] = React.useState(Array(9).fill(null));

  // check for winner (see superset.js)
  let status = `Player ${player}`;
  let winner = checkWinner(state);
  if (winner!=null) {
    status=`Player ${winner} wins!`;
  }
  //console.log(`Status Player ${status}`);

  //Define newState function
  const newState = (idOfSquare) => {
    let thePlayer = player;
    state[idOfSquare] = player;  //player is present player
    setState(state); //state is array of 0 or 1 or null
    let nextplayer = (player + 1) %2;
    setPlayer(nextplayer);
    return thePlayer; // need to return present player
  };

  // Note that Child (Square Component) calls this function
  // However the function has access to the player held here
  const takeTurn = (id) => {
    setPlayer((player + 1) % 2); // get next player
    return player;
  };
  function renderSquare(i, color) {
    // use properties to pass callback function takeTurn to Child
    return <Square takeTurn={takeTurn} id={i} newState={newState}></Square>;
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1>{status}</h1>
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};

function checkWinner(state) {
  //state is an array of 0 and 1 and null

  const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
  ];

  for (let i=0; i<win.length; i++) {
    const [a,b,c] = win[i];
    if(state[a]==state[b] && state[a]==state[c] && state[a])
      return state[a];
  }

  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
