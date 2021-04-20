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

// MY CODE

function inRangeCreator(a,b) {
    return (num) => {
        if (num >= a && num <= b) {
            return true;
        } else {
            return false;
        }
    };
}
function addToAllArrElements(arr, num) {
    return arr.map((el) => el+num);
}
function countApplesAndOranges(s, t, a, b, apples, oranges) {
    const inRange = inRangeCreator(s,t);
    
    const applesCoords = addToAllArrElements(apples, a);
    const orangesCoords = addToAllArrElements(oranges, b);
    
    const orangesInRange = orangesCoords.filter(inRange);
    const applesInRange = applesCoords.filter(inRange);
    
    console.log(applesInRange.length);
    console.log(orangesInRange.length);
}

// END OF MY CODE

function main() {
    const st = readLine().split(' ');

    const s = parseInt(st[0], 10);

    const t = parseInt(st[1], 10);

    const ab = readLine().split(' ');

    const a = parseInt(ab[0], 10);

    const b = parseInt(ab[1], 10);

    const mn = readLine().split(' ');

    const m = parseInt(mn[0], 10);

    const n = parseInt(mn[1], 10);

    const apples = readLine().split(' ').map(applesTemp => parseInt(applesTemp, 10));

    const oranges = readLine().split(' ').map(orangesTemp => parseInt(orangesTemp, 10));

    countApplesAndOranges(s, t, a, b, apples, oranges);
}
