import { createAndDrawMaze } from './maze_generator';

export const buttonsListening = () => {
  const easy = document.getElementById("easy");
  const medium = document.getElementById("medium");
  const hard = document.getElementById("hard");
  const insane = document.getElementById("insane");

  easy.addEventListener("click", () => {
    changeDifficulty(5);
  });

  medium.addEventListener("click", () => {
    changeDifficulty(10);
  });

  hard.addEventListener("click", () => {
    changeDifficulty(30);
  });

  insane.addEventListener("click", () => {
    changeDifficulty(50);
  });
};

const changeDifficulty = difficulty => {
  createAndDrawMaze(difficulty);
};
