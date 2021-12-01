// const input = require('./input.txt');
const fs = require('fs');

const part1 = () => {
  const data = fs.readFileSync('C:\\Users\\A0810516\\OneDrive - Aon\\Desktop\\aoc2021\\advent-of-code-2021\\1\\input.txt', 'utf8').split('\n');

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
  const data = fs.readFileSync('C:\\Users\\A0810516\\OneDrive - Aon\\Desktop\\aoc2021\\advent-of-code-2021\\1\\input.txt', 'utf8').split('\n');

  const sanitised = data.map((x) => parseFloat(x));

  let totalIncrease = 0;

  // let total = {
  //   previousSum: 0,
  //   nextSum: 0,
  // }

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