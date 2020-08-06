import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
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

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyAscending: true,
    };
  }

  render() {
    return (
      <button onClick={this.props.onClick}>
        Currently in Ascending List:{' '}
        {this.state.currentlyAscending ? 'true' : 'false'}
      </button>
    );
  }
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
    alert('Clicked!');
  }

  render() {
    const history = this.getHistory();
    const currentBoard = this.getCurrentBoard();
    const winner = calculateWinner(currentBoard.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
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

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentBoard.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>
            <Toggle onClick={this.toggleClicked()} />
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
      return squares[a];
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
