// const input = require('./input.txt');
const fs = require('fs');
const path = require('path');

const part1 = () => {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8').split('\n');

  let hashMap = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  }

  data.forEach((binary) => {
    const splitBinary = binary.split('');

    splitBinary.forEach((digit, index) => {
      hashMap = {
        ...hashMap,
        [index + 1]: hashMap[index + 1] + parseFloat(digit)
      }
    })
  });

  // let binary = '';

  const gammaBinary = Object.keys(hashMap).map((key) => {
    if(hashMap[key] > 0) {
      if(hashMap[key] > (data.length / 2)) {
        return 1;
      } else {
        return 0;
      }
    }
  }).join('');

  const epsilonBinary = Object.keys(hashMap).map((key) => {
    if(hashMap[key] > 0) {
      if(hashMap[key] > (data.length / 2)) {
        return 0;
      } else {
        return 1;
      }
    }
  }).join('');

  const gammaRate = parseInt(gammaBinary, 2);
  const epsilonRate = parseInt(epsilonBinary, 2);

  const total = gammaRate * epsilonRate;

  console.log(total)
  
}

part1();

const part2 = () => {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8').split('\n');

  const oxygenElimiationFunction = (array, position) => {
    const numberOfOnes = array.filter((number) => number[position] === '1').length;

    const targetNumber = numberOfOnes >= (array.length / 2) ? '1' : '0';

    const nextArray = array.filter((number) => number[position] === targetNumber)

    return nextArray.length === 1 ? nextArray[0] : oxygenElimiationFunction(nextArray, ++position);
  }

  const co2ElimiationFunction = (array, position) => {
    const numberOfOnes = array.filter((number) => number[position] === '1').length;

    const targetNumber = numberOfOnes < (array.length / 2) ? '1' : '0';

    const nextArray = array.filter((number) => number[position] === targetNumber)

    return nextArray.length === 1 ? nextArray[0] : co2ElimiationFunction(nextArray, ++position);
  }

  const oxygenRatingBin = oxygenElimiationFunction(data, 0);

  const CO2ScrubberRatingBin = co2ElimiationFunction(data, 0);

  const oxygenRating = parseInt(oxygenRatingBin, 2);
  const CO2ScrubberRating = parseInt(CO2ScrubberRatingBin, 2);

  const total = oxygenRating * CO2ScrubberRating;

  console.log(total)
}

part2();