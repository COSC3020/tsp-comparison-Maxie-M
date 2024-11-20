// code.test.js 
// Maxie Machado 
// TSP Comparison 

const fs = require('fs');
const assert = require('assert');
eval(fs.readFileSync('code.js') + '');

function runTests() {
    const testCases = [
        [[]],
        [[0]],
        [[0, 1], [1, 0]],
        [[0, 1, 2], [1, 0, 2], [2, 2, 0]],
        [[0, 3, 4, 2, 7], [3, 0, 4, 6, 3], [4, 4, 0, 5, 8], [2, 6, 5, 0, 6], [7, 3, 8, 6, 0]],
        Array.from({ length: 10 }, () => Array.from( { length: 10 }, () => Math.floor(Math.random() * 100))),
    ];

    console.log("TSP Empirical Analysis");
    console.log("------------------------");

    testCases.forEach((dm, i) => {
        console.log('Test Case #${i + 1}');

        const results = compare_tsp_methods(dm);

        console.log(results);
        console.log();
    });
}

runTests();
