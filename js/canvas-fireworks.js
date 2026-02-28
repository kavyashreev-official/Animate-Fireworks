const fwCanvas = document.getElementById("fireworks");
const fwCtx = fwCanvas.getContext("2d");

fwCanvas.width = window.innerWidth;
fwCanvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  fwCanvas.width = window.innerWidth;
  fwCanvas.height = window.innerHeight;
});

class Rocket {
  constructor() {
    this.x = Math.random() * fwCanvas.width;
    this.y = fwCanvas.height;
    this.targetY = Math.random() * fwCanvas.height * 0.5 + 100;
    this.speed = 5;
    this.exploded = false;
  }

  update() {
    if (this.y > this.targetY) {
      this.y -= this.speed;
    } else {
      this.exploded = true;
      fireworks.push(new Explosion(this.x, this.y));
    }
  }

  draw(ctx) {
    // Rocket
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();

    // Trail
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(this.x, this.y + 8, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.createParticles();
  }

  createParticles() {
    const colors = ["#ff3c00", "#ffea00", "#00f7ff", "#ff00e6", "#ffffff"];

    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;

      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  update() {
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05; // gravity
      p.alpha -= 0.015;
    });

    this.particles = this.particles.filter((p) => p.alpha > 0);
  }

  draw(ctx) {
    this.particles.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = 15;
      ctx.shadowColor = p.color;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  isDone() {
    return this.particles.length === 0;
  }
}

let rockets = [];
let fireworks = [];

function animate() {
  // Fading background for trail effect
  fwCtx.fillStyle = "rgba(0, 0, 0, 0.2)";
  fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);

  // Random rocket launch
  if (Math.random() < 0.03) {
    rockets.push(new Rocket());
  }

  rockets.forEach((rocket, index) => {
    rocket.update();
    rocket.draw(fwCtx);

    if (rocket.exploded) {
      rockets.splice(index, 1);
    }
  });

  fireworks.forEach((explosion) => {
    explosion.update();
    explosion.draw(fwCtx);
  });

  fireworks = fireworks.filter((fw) => !fw.isDone());

  requestAnimationFrame(animate);
}

animate();