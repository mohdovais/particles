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
  const distanceSquare = distance * distance;
  const context = canvas.getContext("2d");
  size = size === undefined ? 2 : size;
  context.filter = "blur(100)";
  const halfSize = size / 2;

  context.fillStyle = fillStyle || "black";
  context.strokeStyle = strokeStyle || "rgba(0,0,0,0.1)";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  const count = particles.length;
  let loopCount = 0;

  for (let i = 0; i < count; i++) {
    let particle = particles[i];
    let R = particle.r + distance;

    for (let j = i + 1; j < count; j++) {
      let neighbour = particles[j];
      loopCount++;

      if (neighbour.r < R) {
        const dx = particle.x - neighbour.x;
        const dy = particle.y - neighbour.y;

        if (dx * dx + dy * dy < distanceSquare) {
          context.moveTo(particle.x, particle.y);
          context.lineTo(neighbour.x, neighbour.y);
        }
      }else{
        break;
      }
    }

    context.fillRect(particle.x - halfSize, particle.y - halfSize, size, size);
  }

  //console.log(loopCount)

  context.stroke();
}
