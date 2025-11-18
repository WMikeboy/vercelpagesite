const canvas = document.getElementById('lightCanvas');
const ctx = canvas.getContext('2d');
let w, h;
function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}
window.addEventListener('resize', resize);
resize();

const lights = Array.from({length: 8}, (_, i) => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: 120 + Math.random() * 80,
  color: `hsl(${Math.random()*360},100%,60%)`,
  angle: Math.random() * Math.PI * 2,
  speed: 0.5 + Math.random()
}));

function draw() {
  ctx.clearRect(0, 0, w, h);
  for (const light of lights) {
    light.x += Math.cos(light.angle) * light.speed;
    light.y += Math.sin(light.angle) * light.speed;
    light.angle += (Math.random()-0.5)*0.02;
    if (light.x < 0 || light.x > w) light.angle = Math.PI - light.angle;
    if (light.y < 0 || light.y > h) light.angle = -light.angle;
    const grad = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.r);
    grad.addColorStop(0, light.color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalCompositeOperation = 'lighter';
    ctx.beginPath();
    ctx.arc(light.x, light.y, light.r, 0, Math.PI*2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
  requestAnimationFrame(draw);
}
draw();
