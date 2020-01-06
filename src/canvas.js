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
export function draw(
  canvas,
  particles,
  { distance, strokeStyle, fillStyle, size }
) {
  const threshold = 0;
  const { width, height } = canvas;
  const distanceSquare = distance * distance;
  const context = canvas.getContext("2d");
  size = size || 2;
  const halfSize = size / 2;

  context.save();
  context.fillStyle = fillStyle || "black";
  context.strokeStyle = strokeStyle || "rgba(0,0,0,0.1)";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  const x1 = 0 - threshold;
  const y1 = 0 - threshold;
  const x2 = width + threshold;
  const y2 = height + threshold;
  const count = particles.length;

  for (let i = 0; i < count; i++) {
    let particle = particles[i];

    for (let j = 0; j < count; j++) {
      if (i !== j) {
        let neighbour = particles[j];
        const dx = particle.x - neighbour.x;
        const dy = particle.y - neighbour.y;
        if (dx * dx + dy * dy < distanceSquare && j > i) {
          context.moveTo(particle.x, particle.y);
          context.lineTo(neighbour.x, neighbour.y);
        }
      }
    }
  }

  context.stroke();

  for (let i = 0; i < count; i++) {
    let particle = particles[i];

    context.fillRect(particle.x - halfSize, particle.y - halfSize, size, size);

    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < x1 || particle.x > x2) {
      particle.vx = -particle.vx;
    }

    if (particle.y < y1 || particle.y > y2) {
      particle.vy = -particle.vy;
    }
  }

  context.restore();
}
