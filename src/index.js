const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

const title = 'Sudoku SPA';
const sudokuEndpoint = 'http://localhost:8080/sudoku';

const Board = require('./board');

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

  reload() {
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
