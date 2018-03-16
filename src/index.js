const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

const title = 'Sudoku SPA';
const sudokuEndpoint = 'http://localhost:3000/sudoku';

class Cell extends React.Component {
  render() {
    const clss = `r${this.props.row} c${this.props.col}`;
    return <td className={clss}>{this.props.val}</td>;
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {board: []};
    this.getBoard();
  }

  render() {
    const rows = [];
    const b = this.state.board;
    for (let r = 0; r < b.length; r += 9) {
      let cells = [];
      for (let c = 0; c < 9; ++c) {
        const i = r+c;
        cells.push(<Cell row={r/9} col={c} val={b[i]} key={i}/>);
      }
      const key = 'r' + r;
      rows.push(<tr key={key}>{cells}</tr>);
    }
    return <table className='board'><tbody>{rows}</tbody></table>;
  }

  getBoard(){
    axios.get(sudokuEndpoint + '/board')
      .then(res => {
        this.setState({ board: res.data });
      });
  }

  reload(){
    this.getBoard();
  }
}

class App extends React.Component {
  render() {
    return <div>
      <h1>{title}</h1>
      <div className='options'>
        <input type='button' value='Reload' />
      </div>
      <Board />
    </div>;
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

module.hot.accept();
