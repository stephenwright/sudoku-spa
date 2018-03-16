const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');
const axios = require('axios');

const title = 'Sudoku SPA';
const sudokuEndpoint = 'http://localhost:3000/sudoku';

class Cell extends React.Component {
  render() {
    const clss = `r${this.props.row} c${this.props.col}`;
    return <td className={clss}>{this.props.val}</td>;
  }
}
Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  val: PropTypes.number.isRequired,
};

class Board extends React.Component {
  render() {
    const rows = [];
    const b = this.props.board;
    for (let r = 0; r < b.length; r += 9) {
      let cells = [];
      for (let c = 0; c < 9; ++c) {
        const i = r+c;
        cells.push(<Cell row={r/9} col={c} val={b[i]} key={i}/>);
      }
      const key = 'r' + r;
      rows.push(<tr key={key}>{cells}</tr>);
    }
    return (
      <table className='board'>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}
Board.propTypes = {
  board: PropTypes.array.isRequired,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: []
    };
    this.reload();
  }

  reload() {
    axios.get(sudokuEndpoint + '/board')
      .then(res => {
        this.setState({ board: res.data });
      });
  }

  render() {
    return (
      <div>
        <h1>{title}</h1>
        <div className='options'>
          <input type='button' value='Reload' onClick={this.reload.bind(this)} />
        </div>
        <Board board={this.state.board} />
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

module.hot.accept();
