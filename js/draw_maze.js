export const drawGrid = (width, height, ctx) => {
    for (let x = 0; x <= width; x += 50) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    for (let x = 0; x <= height; x += 50) {
      ctx.moveTo(0, x);
      ctx.lineTo(width, x);
    }

    ctx.strokeStyle = "black";
    ctx.stroke();
};

export const getCoordinates = grid => {
  const coords = { x: 0, y: 0 };
  const vertices = [[0, 0]];

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

export const drawMaze = (ctx, vertices) => {
  ctx.moveTo(...(vertices[0]));
  ctx.beginPath();
  vertices.forEach(vertex => ctx.lineTo(...vertex));
  ctx.stroke();
};
