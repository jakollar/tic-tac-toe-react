import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className={`square ${props.winner ? 'winner' : ''}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const isWinningSquare = this.checkWinningSquare(i);

    return (
      <Square
        value={this.props.squares[i]}
        winner={isWinningSquare}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  checkWinningSquare(squareLocation) {
    if (this.props.winningSquares.length === 3) {
      for (let j = 0; j < this.props.winningSquares.length; j++) {
        if (this.props.winningSquares[j] === squareLocation) {
          return true;
        }
      }
    }
  }

  render() {
    let numSquares = 0;
    let board = [];

    for (let row = 0; row < 3; row++) {
      let currentRow = [];
      for (let col = 0; col < 3; col++) {
        currentRow.push(
          <span key={numSquares}>{this.renderSquare(numSquares)}</span>
        );
        numSquares++;
      }
      board.push(
        <div key={row} className="board-row">
          {currentRow}
        </div>
      );
    }

    return <div>{board}</div>;
  }
}

function Toggle(props) {
  return (
    <button onClick={props.onClick}>
      Change to
      {props.currentlyAscending ? ' Descending' : ' Ascending'}
    </button>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      history: [
        {
          squares: Array(9).fill(null),
          location: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      currentlyAscending: true,
    };
  }

  handleClick(i) {
    if (!this.state.started) {
      this.startGame();
    }
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentBoard = history[history.length - 1];
    const squares = currentBoard.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
          location: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  startGame() {
    this.setState({
      started: true,
    });
  }

  getHistory() {
    return this.state.history;
  }

  getBoard(step) {
    return this.state.history[step];
  }

  getCurrentBoard() {
    return this.state.history[this.state.stepNumber];
  }

  getCoordinate(step) {
    const currentBoard = this.getBoard(step);
    const location = currentBoard.location;
    const coordinate = calculateCoordinate(location);
    return coordinate;
  }

  toggleClicked() {
    this.setState({
      currentlyAscending: !this.state.currentlyAscending,
    });
  }

  render() {
    const history = this.getHistory();
    const currentBoard = this.getCurrentBoard();
    const winner = calculateWinner(currentBoard.squares);

    let status;
    let winningSquares = [];
    if (winner) {
      status = 'Winner: ' + winner[0];
      for (let i = 1; i < winner.length; i++) {
        winningSquares.push(winner[i]);
      }
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const coordinate = this.getCoordinate(move);
      const desc = move
        ? 'Go to move #' + move + ': at ' + coordinate
        : 'Go to game start';
      return (
        <li key={move}>
          <button
            className={`${this.state.stepNumber === move ? 'currentStep' : ''}`}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    const isCurrentlyAscending = this.state.currentlyAscending;

    if (!isCurrentlyAscending) {
      moves.reverse();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentBoard.squares}
            winningSquares={winningSquares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>
            <Toggle
              currentlyAscending={isCurrentlyAscending}
              onClick={() => this.toggleClicked()}
            />
          </div>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const winnerStats = [squares[a], a, b, c];
      return winnerStats;
    }
  }
  return null;
}

function calculateCoordinate(location) {
  const board = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const col = location % 3;
  let row = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i].includes(location)) {
      row = i;
    }
  }

  return `(${col}, ${row})`;
}
