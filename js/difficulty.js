import Game from './game';

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
    changeDifficulty(25);
  });

  insane.addEventListener("click", () => {
    // changeDifficulty(45);
    changeDifficulty(50);
  });
};

export const changeDifficulty = difficulty => {
  const game = new Game(difficulty);
  game.setUpGame();
};


// some ruby to calc even divisors of each canvas width/height for difficulty levels
// def factors (num)
//  f = []
//  (2..num).each {|n| f << n if num % n == 0 }
//  return f
// end
