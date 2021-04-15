'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the plusMinus function below.
function checkNumber(num) {
    if(num > 0) {
        return 1;
    } else if(num < 0) {
        return -1;
    } else if(num === 0) {
        return 0;
    } else {
        throw new Error('Not a number');
    }
}
function plusMinus(arr) {
    const counts = arr.reduce((counts, value) => {
        const check = checkNumber(value);
        counts[check]++;
        return counts;         
    },{'0': 0, '1': 0, '-1': 0,});
    const {length} = arr;
    console.log(counts[1]/length);
    console.log(counts['-1']/length);
    console.log(counts[0]/length);
}

function main() {
    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    plusMinus(arr);
}
