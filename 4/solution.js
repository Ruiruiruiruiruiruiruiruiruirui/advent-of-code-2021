// const input = require('./input.txt');
const fs = require('fs');
const path = require('path');

const part1 = () => {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8').split('\n');

  let bingoBoards = [];
  let numbersToBeCalled = data.shift().split(',').map((x) => x.replace(/(\r\n|\n|\r)/gm, ""));
  let currentlyFormingBoard = [];
  let winningBoard = null;
  let possibleWinningCombis = {};
  let numbersCalled = null;

  data.shift(); // remove the first /r
  data.push('\r');

  data.forEach((item) => {
    if(item === '\r') {
      bingoBoards.push(currentlyFormingBoard);
      currentlyFormingBoard = [];
    } else {
      const bingoRow = item.split(' ').filter(Boolean).map((x) => x.replace(/(\r\n|\n|\r)/gm, ""));
      currentlyFormingBoard.push(bingoRow);
    }
  })

  bingoBoards.forEach((board, index) => {
    // console.log(board[1][1])
    possibleWinningCombis = {
      ...possibleWinningCombis,
      [index]: [
        ...board,
        [board[0][0], board[1][0], board[2][0], board[3][0], board[4][0]],
        [board[0][1], board[1][1], board[2][1], board[3][1], board[4][1]],
        [board[0][2], board[1][2], board[2][2], board[3][2], board[4][2]],
        [board[0][3], board[1][3], board[2][3], board[3][3], board[4][3]],
        [board[0][4], board[1][4], board[2][4], board[3][4], board[4][4]],
      ]
    }
  })

  let i = 5;

  while(i <= numbersToBeCalled.length && !winningBoard) {
    let winningNumbersArr = numbersToBeCalled.slice(0, i);

    Object.keys(possibleWinningCombis).forEach((key) => {
      possibleWinningCombis[key].forEach((possibleCombi) => {

        const result = possibleCombi.every((val) => winningNumbersArr.includes(val));

        if(result) {
          // console.log('******************************************************************** winner', key)
          winningBoard = key;
          numbersCalled = winningNumbersArr;
        }
      })
    });

    i++;
  }

  const winningNumber = numbersCalled[numbersCalled.length - 1];

  const sumOfUnmarkedNumbers = bingoBoards[winningBoard].reduce((sum, row) => {
    const sumOfUnmarkedNumbersOnRow = row.reduce((sum, number) => {
      if(!numbersCalled.includes(number)) {
        return sum + parseFloat(number);
      } else {
        return sum;
      }
    }, 0);

    return sum + sumOfUnmarkedNumbersOnRow;
  }, 0);

  console.log(sumOfUnmarkedNumbers * winningNumber);

}

// part1();

const part2 = () => {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8').split('\n');
  
  let bingoBoards = [];
  let numbersToBeCalled = data.shift().split(',').map((x) => x.replace(/(\r\n|\n|\r)/gm, ""));
  let currentlyFormingBoard = [];
  let lastWinningBoard = null;
  let possibleWinningCombis = {};
  let numbersCalled = null;
  let boardsAlreadyWon = [];

  data.shift(); // remove the first /r
  data.push('\r');

  data.forEach((item) => {
    if(item === '\r') {
      bingoBoards.push(currentlyFormingBoard);
      currentlyFormingBoard = [];
    } else {
      const bingoRow = item.split(' ').filter(Boolean).map((x) => x.replace(/(\r\n|\n|\r)/gm, ""));
      currentlyFormingBoard.push(bingoRow);
    }
  })

  bingoBoards.forEach((board, index) => {
    possibleWinningCombis = {
      ...possibleWinningCombis,
      [index]: [
        ...board,
        [board[0][0], board[1][0], board[2][0], board[3][0], board[4][0]],
        [board[0][1], board[1][1], board[2][1], board[3][1], board[4][1]],
        [board[0][2], board[1][2], board[2][2], board[3][2], board[4][2]],
        [board[0][3], board[1][3], board[2][3], board[3][3], board[4][3]],
        [board[0][4], board[1][4], board[2][4], board[3][4], board[4][4]],
      ]
    }
  })

  let i = 5;

  while(i <= numbersToBeCalled.length) {
    let winningNumbersArr = numbersToBeCalled.slice(0, i);

    Object.keys(possibleWinningCombis).forEach((key) => {
      if(!boardsAlreadyWon.includes(key)){
        possibleWinningCombis[key].forEach((possibleCombi) => {

          const result = possibleCombi.every((val) => winningNumbersArr.includes(val));

          if(result) {
            numbersCalled = winningNumbersArr;
            lastWinningBoard = key;
            boardsAlreadyWon.push(key);
          }
        })
      }
    });

    i++;
  }

  console.log(bingoBoards.length)
  console.log(boardsAlreadyWon.length);
  console.log(lastWinningBoard);

  const winningNumber = numbersCalled[numbersCalled.length - 1];

  // console.log(winningNumber);

  const sumOfUnmarkedNumbers = bingoBoards[lastWinningBoard].reduce((sum, row) => {
    const sumOfUnmarkedNumbersOnRow = row.reduce((sum, number) => {
      if(!numbersCalled.includes(number)) {
        return sum + parseFloat(number);
      } else {
        return sum;
      }
    }, 0);

    return sum + sumOfUnmarkedNumbersOnRow;
  }, 0);

  console.log(bingoBoards[lastWinningBoard]);
  console.log(numbersCalled);

  console.log(sumOfUnmarkedNumbers * winningNumber);
}

part2();