const ctx = canvas.getContext('2d');

const total_seconds = 24 * 60 * 60;

function draw_hex(x, y, time) {
  let e = 1 << 16;
  for (r = 0; r < 2; r++) {
    for (c = 0; c < 4; c++) {
      e = e >> 1;
      ctx.fillStyle = `hsl(0, 0%, 25%, ${time & e ? 80 : 20}%)`;
      ctx.fillRect(x + c * size * 1.2, y + r * size * 1.2, size, size);
    }
  }
}

function get_box(rows, cols) {
  const width = size * (1.2 * cols - 0.2);
  const height = size * (1.2 * rows - 0.2);
  return [width, height];
}

function draw(progress) {
  const [width, height] = get_box(2, 4);
  let x = (canvas.width - width) / 2;
  let y = (canvas.height - height) / 2;

  let cur = progress * (2 ** 16);
  ctx.fillStyle = `hsl(${progress * 360}, 50%, 75%)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  draw_hex(x, y, cur);

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

const size = 100;

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
