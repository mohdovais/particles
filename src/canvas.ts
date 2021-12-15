import { floor } from "./contants";
import type { Particle } from "./particles";

export function resizer(canvas: HTMLCanvasElement) {
  return () => {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    return { width, height };
  };
}

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

const ensureArray = (subject?: any) =>
  subject == null ? [] : Array.isArray(subject) ? subject : [subject];

const getBlock = (
  matrix: Particle[][][],
  row: number,
  column: number
): Particle[] => ensureArray(ensureArray(matrix[row])[column]);

export function draw(
  canvas: HTMLCanvasElement,
  particles: Particle[],
  { distance, strokeStyle, fillStyle, size = 2 }
) {
  const { width, height } = canvas;
  const context = canvas.getContext("2d");
  context.fillStyle = fillStyle || "black";
  context.strokeStyle = strokeStyle || "rgba(0,0,0,0.1)";
  context.clearRect(0, 0, width, height);
  context.beginPath();

  const columns = Math.ceil(width / distance);
  const rows = Math.ceil(height / distance);
  const matrix = createMatrix(particles, distance);

  const distanceSquare = distance * distance;
  const halfSize = size / 2;

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const block: Particle[] = getBlock(matrix, row, column);
      const neighbours = [].concat(
        block,
        getBlock(matrix, row + 1, column),
        getBlock(matrix, row, column + 1),
        getBlock(matrix, row + 1, column + 1)
      );

      block.forEach((particle) => {
        neighbours.forEach((neighbour) => {
          if (particle !== neighbour) {
            const dx = particle.x - neighbour.x;
            const dy = particle.y - neighbour.y;

            if (dx * dx + dy * dy < distanceSquare) {
              context.moveTo(particle.x, particle.y);
              context.lineTo(neighbour.x, neighbour.y);
            }
          }
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
}
