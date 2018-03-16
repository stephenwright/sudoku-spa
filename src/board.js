const React = require('react');
const PropTypes = require('prop-types');
const Cell = require('./cell');

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

module.exports = Board;
