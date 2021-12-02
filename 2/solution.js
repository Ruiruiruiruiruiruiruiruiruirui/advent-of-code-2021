// const input = require('./input.txt');
const fs = require('fs');
const path = require('path');

const part1 = () => {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8').split('\n');

  let subPosition = {
    forward: 0,
    up: 0,
    down: 0,
  }

  data.forEach((x) => {
    const [direction, amount] = x.split(' ');

    subPosition = {
      ...subPosition,
      [direction]: subPosition[direction] + parseFloat(amount)
    }
  });

  const total = subPosition.forward * (subPosition.down - subPosition.up);

  console.log(total)
  
}

part1();

const part2 = () => {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8').split('\n');

  let subPosition = {
    forward: 0,
    aim: 0,
    depth: 0,
  }

  data.forEach((x) => {
    const [direction, amount] = x.split(' ');
    const parsedAmount = parseFloat(amount);

    switch(direction) {
      case 'up': 
        subPosition = {
          ...subPosition,
          aim: subPosition.aim - parsedAmount
        }
      break;

      case 'down': 
        subPosition = {
          ...subPosition,
          aim: subPosition.aim + parsedAmount
        }
      break;

      default: 
        subPosition = {
          ...subPosition,
          forward: subPosition.forward + parsedAmount,
          depth: subPosition.depth + (subPosition.aim * parsedAmount)
        }
      break;
    }
  });

  const total = subPosition.forward * subPosition.depth;

  console.log(total)
}

part2();