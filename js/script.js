const CONFIG = {
  audioPath: "assets/audio/musica.mp3",
  musicLoopAfterSeconds: 60,
  roseCount: 34,
  petalCount: 58,
  starCount: 70,
  message: `Lívia, se eu tentasse te explicar a diferença que você faz na minha vida, ia faltar palavra. A verdade é que, antes de você chegar, parecia que eu tava caminhando meio sem rumo. Aí você chegou e mudou o cenário todo.

Você tem uma energia que não existe igual. Meu dia pode tá foda, o mundo caindo lá fora, mas basta tu dar um sorriso ou me dar um abraço que tudo clareia. Você é a paz que eu precisava e nem sabia.

Agradeço a Deus todo santo dia por nós se escolhermos. Você acreditou em mim, me deu um gás absurdo e me fez querer ser um cara melhor.

Eu nunca vou conseguir te explicar o tamanho do meu sentimento, só sei que você me transformou por inteiro e me fez nascer de novo. Te amo pra caramba, minha preta.`
};

const intro = document.querySelector("#intro");
const garden = document.querySelector("#garden");
const openButton = document.querySelector("#openButton");
const roseField = document.querySelector("#roseField");
const petalField = document.querySelector("#petalField");
const stars = document.querySelector("#stars");
const parchment = document.querySelector("#parchment");
const messageText = document.querySelector("#messageText");
const music = document.querySelector("#backgroundMusic");
const musicFallback = document.querySelector("#musicFallback");

let hasStarted = false;

messageText.textContent = CONFIG.message;
music.src = CONFIG.audioPath;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createStars() {
  for (let index = 0; index < CONFIG.starCount; index += 1) {
    const star = document.createElement("span");
    star.style.setProperty("--x", `${random(0, 100)}vw`);
    star.style.setProperty("--y", `${random(0, 72)}vh`);
    star.style.setProperty("--size", `${random(1, 4)}px`);
    star.style.setProperty("--delay", `${random(0, 5)}s`);
    star.style.setProperty("--duration", `${random(3, 7)}s`);
    stars.appendChild(star);
  }
}

function createRose(index) {
  const rose = document.createElement("div");
  const depth = index / CONFIG.roseCount;
  const scale = random(0.58, 1.55) + depth * 0.75;
  const left = random(-4, 101);
  const bottom = random(-12, 20) + depth * 7;
  const tone = Math.floor(random(1, 4));

  rose.className = `rose rose-tone-${tone}`;
  rose.style.setProperty("--left", `${left}%`);
  rose.style.setProperty("--bottom", `${bottom}%`);
  rose.style.setProperty("--scale", scale.toFixed(2));
  rose.style.setProperty("--delay", `${random(0, 3.8)}s`);
  rose.style.setProperty("--sway", `${random(-26, 26)}px`);
  rose.style.setProperty("--z", `${Math.round(random(-120, 180))}px`);

  rose.innerHTML = `
    <span class="rose-bloom">
      <i class="petal-layer outer petal-a"></i>
      <i class="petal-layer outer petal-b"></i>
      <i class="petal-layer outer petal-c"></i>
      <i class="petal-layer middle petal-d"></i>
      <i class="petal-layer middle petal-e"></i>
      <i class="petal-layer middle petal-f"></i>
      <i class="petal-layer inner petal-g"></i>
      <i class="petal-layer inner petal-h"></i>
      <i class="rose-core"></i>
    </span>
    <span class="rose-stem"></span>
    <span class="rose-leaf rose-leaf-left"></span>
    <span class="rose-leaf rose-leaf-right"></span>
  `;

  return rose;
}

function createPetal() {
  const petal = document.createElement("img");
  const size = random(18, 58);
  const sideDrift = random(-36, 36);

  petal.className = "petal";
  petal.src = "assets/images/petal.svg";
  petal.alt = "";
  petal.style.setProperty("--start-x", `${random(-8, 105)}vw`);
  petal.style.setProperty("--start-y", `${random(-18, 104)}vh`);
  petal.style.setProperty("--size", `${size}px`);
  petal.style.setProperty("--drift", `${sideDrift}vw`);
  petal.style.setProperty("--depth", `${random(-220, 260)}px`);
  petal.style.setProperty("--spin", `${random(-220, 220)}deg`);
  petal.style.setProperty("--duration", `${random(8, 18)}s`);
  petal.style.setProperty("--delay", `${random(-16, 0)}s`);

  return petal;
}

function buildGarden() {
  if (roseField.children.length || petalField.children.length) return;

  createStars();

  for (let index = 0; index < CONFIG.roseCount; index += 1) {
    roseField.appendChild(createRose(index));
  }

  for (let index = 0; index < CONFIG.petalCount; index += 1) {
    petalField.appendChild(createPetal());
  }
}

function showMusicFallback() {
  musicFallback.hidden = false;
  musicFallback.classList.add("is-visible");
}

async function playMusic() {
  music.currentTime = 0;

  try {
    await music.play();
    musicFallback.hidden = true;
  } catch (error) {
    showMusicFallback();
  }
}

function enforceAudioLoopWindow() {
  if (music.currentTime >= CONFIG.musicLoopAfterSeconds) {
    music.currentTime = 0;
    music.play().catch(showMusicFallback);
  }

  requestAnimationFrame(enforceAudioLoopWindow);
}

function startExperience() {
  if (hasStarted) return;

  hasStarted = true;
  buildGarden();
  intro.classList.add("is-closing");
  garden.removeAttribute("aria-hidden");
  garden.classList.add("is-active");

  window.setTimeout(() => {
    intro.hidden = true;
    parchment.classList.add("is-visible");
  }, 850);

  playMusic();
  enforceAudioLoopWindow();
}

openButton.addEventListener("click", startExperience);
musicFallback.addEventListener("click", playMusic);
