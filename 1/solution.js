// const input = require('./input.txt');
const fs = require('fs');
const path = require('path');

const part1 = () => {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8').split('\n');

  const sanitised = data.map((x) => parseFloat(x));

  let totalIncrease = 0;

  for(let i = 1; i <= sanitised.length; i++) {
    if(sanitised[i] > sanitised[i-1]) {
      totalIncrease++;
    }
  }

  console.log(totalIncrease)
}

part1();

const part2 = () => {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8').split('\n');

  const sanitised = data.map((x) => parseFloat(x));

  let totalIncrease = 0;

  let previousSum = 0;

  for(let i = 0; i <= sanitised.length; i++) {
    const currentSum = sanitised[i] + sanitised[i+1] + sanitised[i + 2];

    if(previousSum > 0 && currentSum > previousSum) {
      totalIncrease++;
    }

    previousSum = currentSum;
  }

  console.log(totalIncrease)
}

part2();