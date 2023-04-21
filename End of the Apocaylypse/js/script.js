let bg = document.getElementById("gradient");
let achterkant = document.getElementById("achterkant");
let middelkant = document.getElementById("middelkant");
let middelkant2 = document.getElementById("middelkant2");
let voorkant = document.getElementById("voorkant");
let bladerdak = document.getElementById("bladerdak");
let trees2 = document.getElementById("trees2");
let treeCrow = document.getElementById("treeCrow");
let achterkantForest = document.getElementById("achterkantForest");
let middelkantForest = document.getElementById("middelkantForest");
let voorkantForest = document.getElementById("voorkantForest");



window.addEventListener('scroll', function(){
    var value = this.window.scrollX;
    bg.style.left = value * 0.50 + 'px';
    achterkant.style.left = value * 0.20 + 'px';
    middelkant.style.left = -value * 0.15 + 'px';
    middelkant2.style.left = -value * 0.10 + 'px';
    voorkant.style.left = value * 0.2 + 'px';
    bladerdak.style.left = value * 0.2 + 'px';
    trees2.style.left = value * 0.1 + 'px';
    treeCrow.style.left = value * 0.1 + 'px';
    achterkantForest.style.left = -value * 0.15 + 'px';
    middelkantForest.style.left = -value * 0.20 + 'px';
    voorkantForest.style.left = value * 0.2 + 'px';


})




let snowflakesCount = 200; // Snowflake count, can be overwritten by attrs
let baseCss = ``;


// set global attributes
if (typeof SNOWFLAKES_COUNT !== 'undefined') {
  snowflakesCount = SNOWFLAKES_COUNT;
}
if (typeof BASE_CSS !== 'undefined') {
  baseCss = BASE_CSS;
}

let bodyHeightPx = null;
let pageHeightVh = null;

function setHeightVariables() {
  bodyHeightPx = document.body.offsetHeight;
  pageHeightVh = (100 * bodyHeightPx / window.innerHeight);
}

// get params set in snow div
function getSnowAttributes() {
  const snowWrapper = document.getElementById('snow');
  if (snowWrapper) {
    snowflakesCount = Number(
      snowWrapper.attributes?.count?.value || snowflakesCount
    );
  }
}



// Creating snowflakes
function spawnSnow(snowDensity = 200) {
  snowDensity -= 1;

  for (let i = 0; i < snowDensity; i++) {
    let board = document.createElement('div');
    board.className = "snowflake";

    document.getElementById('snow').appendChild(board);
  }
}




// Append style for each snowflake to the head
function addCss(rule) {
  let css = document.createElement('style');
  css.appendChild(document.createTextNode(rule)); // Support for the rest
  document.getElementsByTagName("head")[0].appendChild(css);
}

// Math
function randomInt(value = 100) {
  return Math.floor(Math.random() * value) + 1;
}

function randomIntRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Create style for snowflake
function spawnSnowCSS(snowDensity = 200) {
  let snowflakeName = "snowflake";
  let rule = baseCss;

  for (let i = 1; i < snowDensity; i++) {
    let randomX = Math.random() * 100; // vw
    let randomOffset = Math.random() * 10 // vw;
    let randomXEnd = randomX + randomOffset;
    let randomXEndYoyo = randomX + (randomOffset / 2);
    let randomYoyoTime = getRandomArbitrary(0.3, 0.8);
    let randomYoyoY = randomYoyoTime * pageHeightVh; // vh
    let randomScale = Math.random();
    let fallDuration = randomIntRange(10, pageHeightVh / 10 * 3); // s
    let fallDelay = randomInt(pageHeightVh / 10 * 3) * -1; // s
    let opacity = Math.random();

    rule += `
      .${snowflakeName}:nth-child(${i}) {
        opacity: ${opacity};
        transform: translate(${randomX}vw, -10px) scale(${randomScale});
        animation: fall-${i} ${fallDuration}s ${fallDelay}s linear infinite;
      }
      @keyframes fall-${i} {
        ${randomYoyoTime * 100}% {
          transform: translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale});
        }
        to {
          transform: translate(${randomXEndYoyo}vw, ${pageHeightVh}vh) scale(${randomScale});
        }
      }
    `
  }
  addCss(rule);
}

// Load the rules and execute after the DOM loads
createSnow = function () {
  setHeightVariables();
  getSnowAttributes();
  spawnSnowCSS(snowflakesCount);
  spawnSnow(snowflakesCount);
};


// export createSnow function if using node or CommonJS environment
if (typeof module !== 'undefined') {
  module.exports = {
    createSnow,
    showSnow,
  };
}
else {
  window.onload = createSnow;
}

// TODO add option to easily re-render scenery. For example when window resizes.
// this should be easy as CSS rerenders after display block -> none -> block;
// TODO add progress bar for slower clients




