const targetNumberEl = document.getElementById("targetNumber");
const messageEl = document.getElementById("message");
const scoreEl = document.getElementById("score");
const tensZone = document.getElementById("tensZone");
const unitsZone = document.getElementById("unitsZone");
const tensCountEl = document.getElementById("tensCount");
const unitsCountEl = document.getElementById("unitsCount");

let score = 0;
let target = 25;
let solved = false;

function generateNumber() {
  target = Math.floor(Math.random() * 100);
  targetNumberEl.textContent = target;
  solved = false;
  clearZones();
}

function setMessage(text, color = "#0d7441") {
  messageEl.textContent = text;
  messageEl.style.color = color;
}

function clearZones() {
  document.querySelectorAll(".dropzone").forEach((zone) => {
    zone.innerHTML = "";
  });

  solved = false;
  updateCounts();
  setMessage("اسحب المكعبات إلى أماكنها الصحيحة");
}

function dragStart(event) {
  event.dataTransfer.setData("value", event.currentTarget.dataset.value);
}

function createPlacedBlock(value) {
  const block = document.createElement("button");
  block.type = "button";
  block.className = value === "1" ? "palette-block cube unit" : "palette-block cube ten small";
  block.dataset.value = value;
  block.title = "انقر لحذف هذا المكعب";
  block.addEventListener("click", () => {
    block.remove();
    solved = false;
    updateCounts();
    checkAnswer();
  });
  return block;
}

function handleDrop(event) {
  event.preventDefault();

  const zone = event.currentTarget;
  zone.classList.remove("drag-over");

  const value = event.dataTransfer.getData("value");
  const zoneType = zone.dataset.type;

  if (value !== zoneType) {
    setMessage("ضع المكعب في المكان الصحيح", "#c75a00");
    return;
  }

  zone.appendChild(createPlacedBlock(value));
  updateCounts();
  checkAnswer();
}

function countChildren(id) {
  return document.getElementById(id).children.length;
}

function updateCounts() {
  const tens = countChildren("tensZone");
  const units = countChildren("unitsZone");

  tensCountEl.textContent = `العشرات: ${tens}`;
  unitsCountEl.textContent = `الوحدات: ${units}`;
}

function checkAnswer() {
  const tens = countChildren("tensZone");
  const units = countChildren("unitsZone");
  const result = tens * 10 + units;

  if (result === target && !solved) {
    solved = true;
    score += 1;
    scoreEl.textContent = score;
    setMessage("ممتاز! العدد صحيح", "#0d7441");

    targetNumberEl.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.12)" },
        { transform: "scale(1)" }
      ],
      { duration: 420, easing: "ease-out" }
    );
  }
}

function addPaletteInteractions() {
  document.querySelectorAll(".cube").forEach((cube) => {
    cube.addEventListener("dragstart", dragStart);

    if (cube.closest(".palette")) {
      cube.addEventListener("click", () => {
        const zone = cube.dataset.value === "10" ? tensZone : unitsZone;
        zone.appendChild(createPlacedBlock(cube.dataset.value));
        updateCounts();
        checkAnswer();
      });
    }
  });
}

function addDropzoneInteractions() {
  document.querySelectorAll(".dropzone").forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("drag-over");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("drag-over");
    });

    zone.addEventListener("drop", handleDrop);
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
    return;
  }

  document.exitFullscreen().catch(() => {});
}

document.getElementById("newBtn").addEventListener("click", generateNumber);
document.getElementById("resetBtn").addEventListener("click", clearZones);
document.getElementById("fullscreenBtn").addEventListener("click", toggleFullscreen);

addPaletteInteractions();
addDropzoneInteractions();
generateNumber();
