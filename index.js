const ctx = canvas.getContext('2d');

const total_seconds = 24 * 60 * 60;

function draw(progress) {
  const rows = 2, cols = 4;
  const size = 100;
  const width = size * 1.2 * cols;
  const height = size * 1.2 * rows;
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
      ctx.fillRect(x + c * size * 1.2, y + r * size * 1.2, size, size);
    }
  }

  const standard = progress * total_seconds;
  const value = ((standard / 3600) | 0) * 100 + (standard / 60 % 60) | 0;
  const text = (10000 + value).toString().replace(/1(..)(..)/, '$1:$2');

  ctx.fillStyle = `hsl(0, 0%, 25%, 80%)`;
  ctx.font = '48px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'hanging';

  ctx.fillText(text, canvas.width / 2, y + height + 40);
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
