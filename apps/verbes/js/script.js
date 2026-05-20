const VERBS = [
  { fr: "manger", ar: "يأكل" },
  { fr: "boire", ar: "يشرب" },
  { fr: "dormir", ar: "ينام" },
  { fr: "jouer", ar: "يلعب" },
  { fr: "courir", ar: "يجري" },
  { fr: "sauter", ar: "يقفز" },
  { fr: "chanter", ar: "يغني" },
  { fr: "danser", ar: "يرقص" },
  { fr: "lire", ar: "يقرأ" },
  { fr: "écrire", ar: "يكتب" },
  { fr: "écouter", ar: "يستمع" },
  { fr: "parler", ar: "يتحدث" },
  { fr: "regarder", ar: "ينظر" },
  { fr: "marcher", ar: "يمشي" },
  { fr: "travailler", ar: "يشتغل" },
  { fr: "dessiner", ar: "يرسم" },
  { fr: "colorier", ar: "يلون" },
  { fr: "couper", ar: "يقطع" },
  { fr: "coller", ar: "يلصق" },
  { fr: "ouvrir", ar: "يفتح" },
  { fr: "fermer", ar: "يغلق" },
  { fr: "laver", ar: "يغسل" },
  { fr: "ranger", ar: "يرتب" },
  { fr: "nettoyer", ar: "ينظف" },
  { fr: "cuisiner", ar: "يطبخ" },
  { fr: "aider", ar: "يساعد" },
  { fr: "aimer", ar: "يحب" },
  { fr: "donner", ar: "يعطي" },
  { fr: "prendre", ar: "يأخذ" },
  { fr: "porter", ar: "يحمل" },
  { fr: "pousser", ar: "يدفع" },
  { fr: "tirer", ar: "يسحب" },
  { fr: "lancer", ar: "يرمي" },
  { fr: "attraper", ar: "يمسك" },
  { fr: "apprendre", ar: "يتعلم" },
  { fr: "enseigner", ar: "يعلّم" },
  { fr: "compter", ar: "يعد" },
  { fr: "additionner", ar: "يجمع" },
  { fr: "soustraire", ar: "يطرح" },
  { fr: "multiplier", ar: "يضرب" },
  { fr: "partager", ar: "يشارك" },
  { fr: "construire", ar: "يبني" },
  { fr: "casser", ar: "يكسر" },
  { fr: "chercher", ar: "يبحث" },
  { fr: "trouver", ar: "يجد" },
  { fr: "montrer", ar: "يري" },
  { fr: "répondre", ar: "يجيب" },
  { fr: "demander", ar: "يسأل" },
  { fr: "penser", ar: "يفكر" },
  { fr: "rêver", ar: "يحلم" },
  { fr: "sourire", ar: "يبتسم" },
  { fr: "rire", ar: "يضحك" },
  { fr: "pleurer", ar: "يبكي" },
  { fr: "crier", ar: "يصرخ" },
  { fr: "toucher", ar: "يلمس" },
  { fr: "sentir", ar: "يشم" },
  { fr: "goûter", ar: "يتذوق" },
  { fr: "entendre", ar: "يسمع" },
  { fr: "monter", ar: "يصعد" },
  { fr: "descendre", ar: "ينزل" },
  { fr: "entrer", ar: "يدخل" },
  { fr: "sortir", ar: "يخرج" },
  { fr: "tomber", ar: "يسقط" },
  { fr: "gagner", ar: "يفوز" },
  { fr: "perdre", ar: "يخسر" },
  { fr: "commencer", ar: "يبدأ" },
  { fr: "finir", ar: "ينتهي" },
  { fr: "choisir", ar: "يختار" },
  { fr: "acheter", ar: "يشتري" },
  { fr: "vendre", ar: "يبيع" },
  { fr: "appeler", ar: "ينادي" },
  { fr: "attendre", ar: "ينتظر" },
  { fr: "visiter", ar: "يزور" },
  { fr: "voyager", ar: "يسافر" },
  { fr: "conduire", ar: "يسوق" },
  { fr: "nager", ar: "يسبح" },
  { fr: "voler", ar: "يطير" },
  { fr: "planter", ar: "يزرع" },
  { fr: "arroser", ar: "يسقي" },
  { fr: "récolter", ar: "يحصد" },
  { fr: "utiliser", ar: "يستعمل" },
  { fr: "réparer", ar: "يصلح" },
  { fr: "allumer", ar: "يشعل" },
  { fr: "éteindre", ar: "يطفئ" },
  { fr: "taper", ar: "يكتب" },
  { fr: "cliquer", ar: "ينقر" },
  { fr: "envoyer", ar: "يرسل" },
  { fr: "recevoir", ar: "يستقبل" },
  { fr: "observer", ar: "يلاحظ" },
  { fr: "protéger", ar: "يحمي" },
  { fr: "respecter", ar: "يحترم" },
  { fr: "découvrir", ar: "يكتشف" },
  { fr: "imaginer", ar: "يتخيل" },
  { fr: "inventer", ar: "يخترع" },
  { fr: "répéter", ar: "يكرر" },
  { fr: "mémoriser", ar: "يحفظ" },
  { fr: "réciter", ar: "يلقي" },
  { fr: "encourager", ar: "يشجع" },
  { fr: "féliciter", ar: "يهنئ" },
  { fr: "organiser", ar: "ينظم" }
];

const QUESTION_TIME = 10;

const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const screenElement = document.getElementById("screen");
const skipButton = document.getElementById("skipButton");
const answerButton = document.getElementById("answerButton");
const restartButton = document.getElementById("restartButton");

const arabicFrequency = VERBS.reduce((map, item) => {
  map[item.ar] = (map[item.ar] || 0) + 1;
  return map;
}, {});

const state = {
  score: 0,
  index: 0,
  timeLeft: QUESTION_TIME,
  timerId: null,
  nextQuestionId: null,
  questions: [],
  currentAnswer: "",
  isPlaying: false,
  isLocked: false
};

function shuffle(list) {
  const copy = [...list];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function updateScoreboard() {
  timerElement.textContent = String(state.timeLeft);
  scoreElement.textContent = String(state.score);
}

function setControlsState() {
  const disableGameControls = !state.isPlaying || state.isLocked;
  skipButton.disabled = disableGameControls;
  answerButton.disabled = disableGameControls;
  restartButton.disabled = false;
}

function clearTimer() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function clearScheduledNextQuestion() {
  if (state.nextQuestionId) {
    window.clearTimeout(state.nextQuestionId);
    state.nextQuestionId = null;
  }
}

function scheduleNextQuestion(delay = 1100) {
  clearScheduledNextQuestion();

  state.nextQuestionId = window.setTimeout(() => {
    state.nextQuestionId = null;
    state.index += 1;
    loadQuestion();
  }, delay);
}

function buildPrimaryButton(label, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "primary-action";
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function renderStartScreen() {
  state.isPlaying = false;
  state.isLocked = false;
  state.timeLeft = QUESTION_TIME;
  updateScoreboard();
  setControlsState();

  const panel = document.createElement("section");
  panel.className = "welcome-panel";

  const title = document.createElement("h2");
  title.textContent = "Le Verbe Mystère";

  const description = document.createElement("p");
  description.textContent =
    "اختبر سرعة المطابقة بين الأفعال الفرنسية ومعانيها بالعربية في نشاط مناسب للهاتف والحاسوب.";

  panel.append(title, description, buildPrimaryButton("ابدأ التقويم", startGame));
  screenElement.replaceChildren(panel);
}

function renderResultScreen() {
  state.isPlaying = false;
  state.isLocked = false;
  state.timeLeft = 0;
  updateScoreboard();
  setControlsState();

  const percentage = Math.round((state.score / VERBS.length) * 100);
  const panel = document.createElement("section");
  panel.className = "result-panel";

  const title = document.createElement("h2");
  title.textContent = "انتهى التقويم";

  const score = document.createElement("p");
  score.className = "result-score";
  score.textContent = `النتيجة: ${state.score} / ${VERBS.length}`;

  const ratio = document.createElement("p");
  ratio.textContent = `نسبة النجاح: ${percentage}%`;

  panel.append(title, score, ratio, buildPrimaryButton("إعادة التقويم", startGame));
  screenElement.replaceChildren(panel);
}

function revealCorrectChoice() {
  const buttons = screenElement.querySelectorAll(".choice-button");

  buttons.forEach((button) => {
    button.disabled = true;

    if (button.textContent === state.currentAnswer) {
      button.classList.add("correct");
    }
  });
}

function startTimer() {
  clearTimer();
  clearScheduledNextQuestion();
  state.timeLeft = QUESTION_TIME;
  updateScoreboard();

  state.timerId = window.setInterval(() => {
    state.timeLeft -= 1;
    updateScoreboard();

    if (state.timeLeft <= 0) {
      clearTimer();
      scheduleNextQuestion(250);
    }
  }, 1000);
}

function checkAnswer(button, answer) {
  if (!state.isPlaying || state.isLocked) {
    return;
  }

  state.isLocked = true;
  clearTimer();
  revealCorrectChoice();

  if (answer === state.currentAnswer) {
    button.classList.add("correct");
    state.score += 1;
    updateScoreboard();
  } else {
    button.classList.add("wrong");
  }

  setControlsState();
  scheduleNextQuestion();
}

function buildQuestionCard(label, value, questionClass) {
  const card = document.createElement("article");
  card.className = "question-card";

  const questionLabel = document.createElement("span");
  questionLabel.className = "question-label";
  questionLabel.textContent = label;

  const questionValue = document.createElement("p");
  questionValue.className = `question-value ${questionClass}`;
  questionValue.textContent = value;

  card.append(questionLabel, questionValue);
  return card;
}

function buildChoicesCard(choices) {
  const card = document.createElement("article");
  card.className = "choices-card";

  const grid = document.createElement("div");
  grid.className = "choices-grid";

  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = choice;
    button.addEventListener("click", () => checkAnswer(button, choice));
    grid.append(button);
  });

  card.append(grid);
  return card;
}

function resolveMode(item) {
  const hasUniqueArabicMeaning = arabicFrequency[item.ar] === 1;

  if (!hasUniqueArabicMeaning) {
    return "fr-ar";
  }

  return Math.random() < 0.5 ? "fr-ar" : "ar-fr";
}

function loadQuestion() {
  clearTimer();
  clearScheduledNextQuestion();

  if (state.index >= state.questions.length) {
    renderResultScreen();
    return;
  }

  state.isPlaying = true;
  state.isLocked = false;

  const item = state.questions[state.index];
  const mode = resolveMode(item);
  const askInFrench = mode === "fr-ar";
  const questionValue = askInFrench ? item.fr : item.ar;
  const questionClass = askInFrench ? "question-fr" : "question-ar";
  const questionLabel = askInFrench ? "ما معنى هذا الفعل بالعربية؟" : "ما الفعل الفرنسي المناسب؟";
  const correctAnswer = askInFrench ? item.ar : item.fr;
  const choicePool = askInFrench
    ? VERBS.map((verb) => verb.ar).filter((value, index, list) => list.indexOf(value) === index)
    : VERBS.map((verb) => verb.fr);
  const wrongChoices = shuffle(choicePool.filter((choice) => choice !== correctAnswer)).slice(0, 3);
  const choices = shuffle([correctAnswer, ...wrongChoices]);

  state.currentAnswer = correctAnswer;
  updateScoreboard();
  setControlsState();

  const layout = document.createElement("section");
  layout.className = "question-layout";
  layout.append(buildQuestionCard(questionLabel, questionValue, questionClass), buildChoicesCard(choices));
  screenElement.replaceChildren(layout);

  startTimer();
}

function startGame() {
  clearTimer();
  clearScheduledNextQuestion();
  state.score = 0;
  state.index = 0;
  state.questions = shuffle(VERBS);
  state.currentAnswer = "";
  updateScoreboard();
  loadQuestion();
}

function showAnswer() {
  if (!state.isPlaying || state.isLocked) {
    return;
  }

  state.isLocked = true;
  clearTimer();
  revealCorrectChoice();
  setControlsState();
  scheduleNextQuestion();
}

function skipQuestion() {
  if (!state.isPlaying || state.isLocked) {
    return;
  }

  state.isLocked = true;
  clearTimer();
  setControlsState();
  scheduleNextQuestion(150);
}

function restartGame() {
  clearTimer();
  clearScheduledNextQuestion();
  startGame();
}

skipButton.addEventListener("click", skipQuestion);
answerButton.addEventListener("click", showAnswer);
restartButton.addEventListener("click", restartGame);

renderStartScreen();
