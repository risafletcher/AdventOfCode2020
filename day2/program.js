const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.txt');
const data = fs.readFileSync(dataFilePath, 'utf8');
const dataArray = data.split(/\n/);

// part 1
const part1 = dataArray.reduce((total, datum) => {
    const [rangeString, letterString, passwordString] = datum.split(' ');
    const [low, high] = rangeString.split('-');
    const letter = letterString && letterString.slice(0, 1);
    const letterCount = passwordString.split('').reduce((totalCount, currentLetter) => {
        if (letter && currentLetter === letter) {
            totalCount++;
        };
        return totalCount;
    }, 0);
    if (letterCount >= Number(low) && letterCount <= Number(high)) {
        total++;
    };
    return total;
}, 0);
console.log('Part 1: ', part1);

// part 2
const part2 = dataArray.reduce((total, datum) => {
    const [indexesString, letterString, passwordString] = datum.split(' ');
    const letter = letterString && letterString.slice(0, 1);
    const indexes = indexesString.split('-');
    const numMatchesAtIndex = indexes.reduce((numMatches, index) => {
        const zeroBasedIndex = Number(index) - 1;
        if (passwordString[zeroBasedIndex] === letter) {
            numMatches++;
        };
        return numMatches;
    }, 0)
    if (numMatchesAtIndex === 1) {
        total++;
    };
    return total;
}, 0);
console.log('Part 2: ', part2);
