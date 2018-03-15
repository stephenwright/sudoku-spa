const React = require('react');
const ReactDOM = require('react-dom');

const title = 'Sudoku SPA';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

module.hot.accept();
