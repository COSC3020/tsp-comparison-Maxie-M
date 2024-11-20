# Traveling Salesperson Problem -- Empirical Analysis

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.

## Answer, Maxie M. 
### Setup 
- **TSP Held-Karp:**
  - dynamic programming approach
  - **exponential time complexity:** $O(n^2 \times 2^n)$
    - makes computationally expensive for larger problem sizes 
- **TSP Local Search:**
  - heuristic approach
    - using 2-opt swaps
    - this is to improve the initial solution by iterating through possible improvements
  - runtime can vary depending on the problem size
    - overall generally faster than **Held-Karp*
    - may not always find the optimal solution
### Input Size and Test Cases 
1. **Empty Matrix:** []
2. **Single City Matrix:** [[0]]
3. **Two Cities Matrix:** [[0, 1], [1, 0]]
4. **Three Cities Matrix:** [[0, 1, 2], [1, 0, 2], [2, 2, 0]]
5. **Five Cities Matix:** [[0, 3, 4, 2, 7], [3, 0, 4, 6, 3], [4, 4, 0, 5, 8], [2, 6, 5, 0, 6], [7, 3, 8, 6, 0]]
6. **Randomly Generated $10\times10$ distance matrix**
### Results 
| Test Case | Held-Karp Time (ms) | Local Search Time (ms) | Result (Path Cost): Held-Karp | Result (Path Cost): Local Search |
|-----------|---------------------|------------------------|-------------------------------|----------------------------------|
|     1     |           0         |            0           |              0                |                  0               |
|     2     |           0         |            0           |              0                |                  0               |
|     3     |           0         |            0           |              1                |                  1               |
|     4     |           0         |            0           |              3                |                  3               |
|     5     |           1         |            0           |              13               |                  25              |
|     6     |           23        |            1           |              75               |                  345             |
- **Held-Karp:** consistently returns the optimal solution for all tests
  - **optimal solution:** minimum tour length
  - the runtime increases significantly as the problem size grows
- **Local Search:** often returns valid solution but doesn't always find the optimal solution
  - this is shown by the higher tour lengths in some test cases
  - it runs faster, with much shorter runtimes compared to Held-Karp
    - esoecially when the size increases
### Time Complexity 
- **Held-Karp:**
  - has exponential growth in runtime
  - **smaller inputs:** time is relatively fast
  - **larger inputs:** the runtime becomes prohibitive 
- **Local Search:**
  - more moderate growthrate
  - **smaller and larger inputs:** runtime remains much smaller compared to *Held-Karp*
### Why is Held-Karp Better?
- *Held-Karp* guarantees optimal solution is used
  - this causes tour length to be less than or equal to the Local Searh solution
  - however, the exponential time complexity makes it impractical for larger inputs
- While *Local Search* is faster, it may not always find the optimal solution
  - this may lead to suboptimal results for large problem sizes 
### Plagiarism Statement: 
I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.
### Resources:
- https://www.researchgate.net/publication/262341381_On_the_empirical_scaling_of_run-time_for_finding_optimal_solutions_to_the_travelling_salesman_problem
