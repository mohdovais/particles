import { nearestParticles, moveWithinCanvas } from "./particles.js";

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
export function resizer(canvas) {
  return () => {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    return { width, height };
  };
}

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {Array} particles
 * @param {Number} distance
 */
export function draw(canvas, particles, distance) {
  const threshold = 0;
  const { width, height } = canvas;
  const distanceSquare = distance * distance;
  const context = canvas.getContext("2d");
  context.fillStyle = "black";
  context.strokeStyle = "rgba(0,0,0,0.1)";

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  particles.forEach(function nearest(particle) {
    const neighbourhood = nearestParticles(particle, particles, distanceSquare);
    const length = neighbourhood.length;
    for (let i = 0; i < length; i++) {
      let neighbour = neighbourhood[i];
      context.moveTo(particle.x, particle.y);
      context.lineTo(neighbour.x, neighbour.y);
    }
  });

  context.stroke();

  particles.forEach(particle => context.fillRect(particle.x, particle.y, 2, 2));

  const x1 = -threshold;
  const y1 = -threshold;
  const x2 = width + threshold;
  const y2 = height + threshold;

  particles.forEach(particle =>
    moveWithinCanvas(particle, {
      x1,
      x2,
      y1,
      y2
    })
  );
}
