'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the birthday function below.

function arrSumFromTo(arr, from, to) {
    let sum = 0;
    for (let i = from; i < to; i++) {
        sum+=arr[i];
    }
    return sum;
}

function birthday(s, d, m) {
    let count = 0;
    let sum = arrSumFromTo(s, 0, m);
    if (sum === d) {
        count++;
    }
    for (let i = m; i < s.length; i++) {
        sum += s[i];
        sum -= s[i - m];
        if (sum === d) {
            count++;
        }
    }
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const dm = readLine().replace(/\s+$/g, '').split(' ');

    const d = parseInt(dm[0], 10);

    const m = parseInt(dm[1], 10);

    const result = birthday(s, d, m);

    ws.write(result + '\n');

    ws.end();
}
