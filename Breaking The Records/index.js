'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}


// Complete the breakingRecords function below.

function highestScoreCount(scores) {
    return scores.reduce((scoreStat, score) => {
        if (score > scoreStat.maxValue) {
            scoreStat.maxValue = score;
            scoreStat.count++;
        }
        return scoreStat;
    }, {
        maxValue: scores[0],
        count: 0
    });
}

function lowestScoreCount(scores) {
    return scores.reduce((scoreStat, score) => {
        if (score < scoreStat.minValue) {
            scoreStat.minValue = score;
            scoreStat.count++;
        }
        return scoreStat;
    }, {
        minValue: scores[0],
        count: 0
    });
}

function breakingRecords(scores) {
    const {count: maxCount} = highestScoreCount(scores);
    const {count: minCount} = lowestScoreCount(scores);
    return [maxCount, minCount];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const result = breakingRecords(scores);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
