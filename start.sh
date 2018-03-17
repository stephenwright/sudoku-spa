#!/bin/bash

docker build -t sudoku-spa:level-4 .
docker run -i -t --rm -p 80:80 sudoku-spa:level-4
