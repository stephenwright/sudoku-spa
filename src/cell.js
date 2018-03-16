const React = require('react');
const PropTypes = require('prop-types');

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

module.exports = Cell;
