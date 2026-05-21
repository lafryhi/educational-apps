const canvas = document.getElementById("canvas");
const stage = document.getElementById("boardStage");
const ctx = canvas.getContext("2d");

const sizeRange = document.getElementById("sizeRange");
const sizeValue = document.getElementById("sizeValue");
const toolButtons = document.querySelectorAll("[data-tool]");
const colorButtons = document.querySelectorAll(".color-btn");

let tool = "pen";
let drawing = false;
let startX = 0;
let startY = 0;
let color = "#000000";
let size = 4;

function resizeCanvas() {
  const temp = document.createElement("canvas");
  const tempContext = temp.getContext("2d");

  temp.width = canvas.width;
  temp.height = canvas.height;
  tempContext.drawImage(canvas, 0, 0);

  canvas.width = Math.max(1, Math.floor(stage.clientWidth));
  canvas.height = Math.max(1, Math.floor(stage.clientHeight));

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(temp, 0, 0);
}

function setActiveTool(nextTool) {
  tool = nextTool;
  toolButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tool === nextTool);
  });
}

function setActiveColor(button) {
  colorButtons.forEach((item) => item.classList.remove("active-color"));
  button.classList.add("active-color");
  color = button.dataset.color;
}

function getPos(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function startDraw(event) {
  drawing = true;
  const pos = getPos(event);

  startX = pos.x;
  startY = pos.y;

  if (tool === "pen" || tool === "eraser") {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }
}

function draw(event) {
  if (!drawing) {
    return;
  }

  const pos = getPos(event);
  ctx.lineWidth = size;
  ctx.lineCap = "round";

  if (tool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = color;
  }

  if (tool === "pen" || tool === "eraser") {
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }
}

function stopDraw(event) {
  if (!drawing) {
    return;
  }

  drawing = false;

  const pos = getPos(event);

  ctx.globalCompositeOperation = "source-over";
  ctx.strokeStyle = color;
  ctx.lineWidth = size;

  if (tool === "line") {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  if (tool === "rect") {
    ctx.strokeRect(startX, startY, pos.x - startX, pos.y - startY);
  }

  if (tool === "circle") {
    const radius = Math.sqrt(Math.pow(pos.x - startX, 2) + Math.pow(pos.y - startY, 2));
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function clearBoard() {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
    return;
  }

  document.exitFullscreen().catch(() => {});
}

canvas.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  startDraw(event);
});

canvas.addEventListener("pointermove", (event) => {
  event.preventDefault();
  draw(event);
});

["pointerup", "pointerleave", "pointercancel"].forEach((eventName) => {
  canvas.addEventListener(eventName, (event) => {
    event.preventDefault();
    stopDraw(event);
  });
});

toolButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveTool(button.dataset.tool));
});

colorButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveColor(button));
});

document.getElementById("clearBtn").addEventListener("click", clearBoard);
document.getElementById("fullscreenBtn").addEventListener("click", toggleFullscreen);

sizeRange.addEventListener("input", () => {
  size = Number(sizeRange.value);
  sizeValue.textContent = size;
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
clearBoard();
