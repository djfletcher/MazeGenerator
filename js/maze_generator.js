import { createGrid, carvePassagesFrom } from './algorithm';

const getCoordinates = grid => {
  const coords = { x: 30, y: 30 };
  const vertices = [[30, 20]];

  grid.forEach(row => {
    row.forEach(square => {
      switch(square) {
        case 'n':
          coords.y -= 100;
          vertices.push([coords.x, coords.y]);
        case 's':
          coords.y += 100;
          vertices.push([coords.x, coords.y]);
        case 'w':
          coords.x -= 100;
          vertices.push([coords.x, coords.y]);
        case 'e':
          coords.x += 100;
          vertices.push([coords.x, coords.y]);
      }
    });
  });

  return vertices;
};

const draw = (ctx, vertices) => {
  ctx.moveTo(...(vertices[0]));
  ctx.beginPath();
  vertices.forEach(vertex => ctx.lineTo(...vertex));
  ctx.stroke();
};

document.addEventListener("DOMContentLoaded", () => {
  // window.setup = setup;
  // window.draw = draw;

  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    const grid = createGrid(5, 5);
    carvePassagesFrom(0, 0, grid);
    const coords = getCoordinates(grid);

    draw(ctx, coords);
  }
});
