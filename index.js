const ctx = canvas.getContext('2d');

function draw(progress) {
  const rows = 2, cols = 4;
  const width = 120 * cols;
  const height = 120 * rows;
  let x = (canvas.width - width) / 2;
  let y = (canvas.height - height) / 2;

  let cur = progress * (2 ** 16);
  ctx.fillStyle = `hsl(${progress * 360}, 50%, 75%)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let e = 1 << 16;
  for (r = 0; r < rows; r++) {
    for (c = 0; c < cols; c++) {
      e = e >> 1;
      ctx.fillStyle = `hsl(0, 0%, 25%, ${cur & e ? 80 : 20}%)`;
      ctx.fillRect(x + c * 120, y + r * 120, 100, 100);
    }
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas, false);

var progress = 0;

function animation_callback(timestamp) {
  if (!this.first_timestamp) this.first_timestamp = timestamp;

  progress = (timestamp - this.first_timestamp) / (this.seconds * 1000);

  draw(progress % 1);
  this.request();
};

const animation = {
  begin(seconds) {
    this.seconds = seconds;
    this.first_timestamp = null;
    this.request();
  },
  request() {
    this.request_id = requestAnimationFrame(animation_callback.bind(this));
  },
}

animation.begin(64);
