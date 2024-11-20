// code.js 
// Maxie Machado 
// TSP Empirical Analysis 

const fs = require('fs');

function tsp_heldKarp(distance_matrix) {
    const n = distance_matrix.length;
    
    if (n == 0) return 0;
    if (n == 1) return 0;
    
    const memo = Array.from({ length: n }, () => ({}));

    function heldKarp(mask, pos) {
        if (mask == (1 << n) - 1) return 0;

        if (memo[pos][mask] !== undefined) return memo[pos][mask];

        let minCost = Infinity;

        for (let next = 0; next < n; next++) {
            if (mask & (1 << next)) continue;

            const newMask = mask | (1 << next);
            const cost = distance_matrix[pos][next] + heldKarp(newMask, next);

            minCost = Math.min(minCost, cost);
        }

        memo[pos][mask] = minCost;
        return minCost;
    }

    let result = Infinity;

    for (let start = 0; start < n; start++) {
        result = Math.min(result, heldKarp(1 << start, start));
    }
    return result;
}

function tsp_localSearch(distance_matrix) {
    const n = distance_matrix.length;

    function calculateRouteLength(route) {
        let len = 0;

        for (let i = 0; i < route.length - 1; i++) {
            len += distance_matrix[route[i]][route[i + 1]];
        }
        return len;
    }

    function twoOptSwap(route, i, k) {
        const newRoute = route.slice(0, i)
            .concat(route.slice(i, k + 1).reverse())
            .concat(route.slice(k + 1));
        return newRoute;
    }

    let currentRoute = Array.from( { length: n }, (_, i) => i);

    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentRoute[i], currentRoute[j]] = [currentRoute[j], currentRoute[i]];
    }

    let currentLength = calculateRouteLength(currentRoute);
    let improved = true;
    let iterationCount = 0;

    const MAX_ITERATIONS = 10000;
    const NO_IMPROVEMENT_LIMIT = 500;

    let noImprovementCounter = 0; 

    while (improved && iterationCount < MAX_ITERATIONS) {
        improved = false; 

        const i = Math.floor(Math.random() * (n - 1));
        let k = Math.floor(Math.random() * (n - i - 1)) + i + 1;

        const newRoute = twoOptSwap(currentRoute, i, k);
        const newLength = calculateRouteLength(newRoute);

        if (newLength < currentLength) {
            currentRoute = newRoute;
            currentLength = newLength;
            improved = true;
            noImprovementCounter = 0;
        }
        else {
            noImprovementCounter++;
        }
        iterationCount++;

        if (noImprovementCounter >= NO_IMPROVEMENT_LIMIT) {
            break;
        }
    }
    return currentLength;
}

function compare_tsp_methods(distance_matrix) {
    const startTimeHK = Date.now();
    const hkResult = tsp_heldKarp(distance_matrix);
    const endTimeHK = Date.now();

    const startTimeLS = Date.now();
    const lsResult = tsp_localSearch(distance_matrix);
    const endTimeLS = Date.now();

    return {
        HeldKarp: { result: hkResult, time: endTimeHK - startTimeHK },
        LocalSearch: { result: lsResult, time: endTimeLS - startTimeLS },
    };
}
