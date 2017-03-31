# Maze Generator

## Background

Maze generation is the act of designing the layout of passages and walls within a maze. There are many different strategies for designing algorithms that build mazes -- random traversal, recursive backtracking, Prim’s algorithm, Kruskal's algorithm, and countless others.

In this project, I will utilize recursive backtracking to generate a random maze that builds itself while the user watches in real time. Then once it is finished being built it becomes playable and the user can try to solve the maze.

## Functionality and MVP

With this maze generator users will be able to:

+ Choose the difficulty of the maze they would like to solve
+ Watch the maze being randomly built using a recursive backtracking algorithm
+ Use the keyboard to travel through the maze and try to solve it

In addition this project will include:

+ A simple user interface that requires no instructions
+ An aesthetically pleasing layout and color scheme
+ A production README

## Wireframes

This app will consist of a single page displaying maze, game controls, and nav links to the site's Github repository, my LinkedIn, and my email. Game controls will simply be the arrow keys to move through the maze. A maze will automatically begin building itself upon loading the page. Once they solve it, there will be buttons to generate another easy, medium, or hard maze, and upon clicking those buttons a new maze will start building itself on the page.

![wireframe](./wireframes/maze_generator.png)

## Architecture and Technologies

+ Vanilla Javascript (ES6) to fulfill the overall logic for maze generation and for the interactive game.
+ Keymaster.js to allow users to interact with the game using arrows on the keyboard.
+ Easel.js with HTML5 Canvas for DOM manipulation and rendering
+ Webpack to bundle and serve up the various scripts.

In addition to webpack, there will be two scripts involved in this project:

+ `generator.js`: this script will handle the logic for generating a random maze of the appropriate difficulty, using a recursive backtracking algorithm.
+ `game.js`: this script will handle the logic for the interactive game where the user uses keyboard inputs to solve the maze.

## Implementation Timeline

**Day 1:** Setup all necessary Node modules, including getting webpack, Easel.js, and Keymaster.js installed. Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of both scripts outlined above. Learn the basics of Easel.js and Keymaster.js.

**Day 2:** Write the recursive backtracking algorithm to generate random mazes. Have the algorithm take parameters of maze width and height to determine size (complexity) of maze. Integrate it with Easel.js so that a basic outline of the generated maze renders on the page.

**Day 3:** Write the logic for the interactive game, using Keymaster.js to map keyboard inputs to movements in the maze. Create buttons for user to generate a new maze and to choose difficulty.

**Day 4:** Final styling and bonus features if time.

## Bonus Features

There are many directions this maze generator could eventually take, including:

+ Once the user solves the maze, it unravels into a <a href="https://bl.ocks.org/mbostock/061b3929ba0f3964d335" target="_blank">tidy tree layout</a>.
+ After the user watched the maze being built the page goes dark and then they have them solve it using echolocation.
