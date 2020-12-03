const fs = require('fs');
const path = require('path');

// part 1
const getCurrentCell = (row, index) => {
    if (index < row.length) {
        // returning index as well since this is circular
        return { value: row[index], index };
    }
    // cycle through the array since the map repeats horizontally
    return getCurrentCell(row, index - row.length);
};

function getCount(offsetRight, offsetDown = 1) {
    const fileData = fs.readFileSync(path.join(__dirname, 'map.txt'), 'utf8');
    // transform map data to 2d matrix
    const mapArray = fileData.split(/\n/).map((fileDatum) => fileDatum.split(''));
    // external counter; upper limit is row.length
    let currentColumnIndex = 0;
    return mapArray.reduce((numberOfTrees, row, rowIndex) => {
        // if there is a down offset, skip the necessary rows
        if (rowIndex % offsetDown !== 0) {
            return numberOfTrees;
        }
        const { value, index } = getCurrentCell(row, currentColumnIndex);
        // if current location is a tree ('#'), increment count
        if (value === '#') {
            numberOfTrees++;
        }

        currentColumnIndex = index + offsetRight;
        // move to next row
        return numberOfTrees;
    }, 0);
}

console.log(`Part 1: ${getCount(3)}`);

// part 2
const part2Product = getCount(1) * getCount(3) * getCount(5) * getCount(7) * getCount(1, 2);
console.log(`Part 2: ${part2Product}`);