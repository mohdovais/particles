import { floor } from "./contants";
import type { Particle } from "./particles";

function resizer(canvas: HTMLCanvasElement) {
  return () => {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    return { width, height };
  };
}

const ensureArray = (subject?: any) =>
  subject == null ? [] : Array.isArray(subject) ? subject : [subject];

// devide & rule
function createMatrix(particles: Particle[], distance: number) {
  const matrix: Particle[][][] = new Array();

  particles.forEach((particle) => {
    const row = floor(particle.y / distance);
    const col = floor(particle.x / distance);

    if (matrix[row] == null) {
      matrix[row] = [];
    }
    if (matrix[row][col] == null) {
      matrix[row][col] = [] as Particle[];
    }
    matrix[row][col].push(particle);
  });

  return matrix;
}

const getBlock = (
  matrix: Particle[][][],
  row: number,
  column: number
): Particle[] => ensureArray(ensureArray(matrix[row])[column]);

function draw(
  canvas: HTMLCanvasElement,
  particles: Particle[],
  { distance, strokeStyle, fillStyle, size }
) {
  const { width, height } = canvas;
  const context = canvas.getContext("2d");
  const columns = Math.ceil(width / distance);
  const rows = Math.ceil(height / distance);
  const matrix = createMatrix(particles, distance);
  const distanceSquare = distance * distance;
  const halfSize = size / 2;

  const drawLine = (a: Particle, b: Particle) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    if (dx * dx + dy * dy < distanceSquare) {
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
    }
  };

  context.beginPath();
  context.clearRect(0, 0, width, height);
  context.fillStyle = fillStyle;
  context.strokeStyle = strokeStyle;

  // run loop for Row-x-Column matrix
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const block: Particle[] = getBlock(matrix, row, column);
      const neighbours = [].concat(
        getBlock(matrix, row, column + 1),
        getBlock(matrix, row + 1, column),
        getBlock(matrix, row + 1, column + 1)
      );

      const processed = new Set();

      block.forEach((particle) => {
        processed.add(particle);

        // run for neighbour points within block
        block.forEach((neighbour) => {
          if (!processed.has(neighbour)) {
            drawLine(particle, neighbour);
          }
        });

        // run for neighbour points in adjacent blocks
        neighbours.forEach((neighbour) => {
          drawLine(particle, neighbour);
        });

        context.fillRect(
          particle.x - halfSize,
          particle.y - halfSize,
          size,
          size
        );
      });
    }
  }

  context.stroke();
  context.restore();
}

export { resizer, draw };
