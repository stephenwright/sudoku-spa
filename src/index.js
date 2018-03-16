const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');
const axios = require('axios');

const title = 'Sudoku SPA';
const sudokuEndpoint = 'http://localhost:8080/sudoku';

class Cell extends React.Component {
  select(e) {
    e.preventDefault();
    const cell = this.props.row * 9 + this.props.col;
    this.props.onSelect(cell, this.props.val);
  }

  render() {
    let clss = `r${this.props.row} c${this.props.col}`;
    const cell = this.props.row * 9 + this.props.col;
    if (this.props.activeCell === cell)
      clss += ' active';
    return (
      <td className={clss} onClick={this.select.bind(this)}>
        {this.props.val}
      </td>
    );
  }
}
Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  val: PropTypes.number.isRequired,
  onSelect: PropTypes.func,
  activeCell: PropTypes.number,
};

class Board extends React.Component {
  select(cell,val) {
    this.props.onSelect(cell,val);
  }

  render() {
    const rows = [];
    const b = this.props.board;
    for (let r = 0; r < b.length; r += 9) {
      let cells = [];
      for (let c = 0; c < 9; ++c) {
        const i = r + c;
        cells.push(
          <Cell row={r/9} col={c} val={b[i]} key={i}
            onSelect={this.select.bind(this)}
            activeCell={this.props.activeCell} />
        );
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
  onSelect: PropTypes.func,
  activeCell: PropTypes.number,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      activeCell: null,
      selectedCell: null,
      selectedValue: null,
    };
    this.reload();
  }

  select(cell,val) {
    this.setState({
      activeCell: cell,
      selectedCell: cell,
      selectedValue: val,
    });
  }

  clear() {
    this.setState({
      activeCell: null,
      selectedCell: null,
      selectedValue: null,
    });
  }

  reload(cell,value) {
    let query = [];
    if (this.state.selectedCell != null && this.state.selectedValue!= null) {
      query.push(`cell=${this.state.selectedCell}`);
      query.push(`value=${this.state.selectedValue}`);
    }
    axios.get(`${sudokuEndpoint}/board?${query.join('&')}`)
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
          <input type='button' value='Clear Selection' onClick={this.clear.bind(this)} />
        </div>
        <Board board={this.state.board}
          activeCell={this.state.activeCell}
          onSelect={this.select.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

module.hot.accept();
