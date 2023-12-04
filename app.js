const mapData = {
  minX: 1,
  maxX: 14,
  minY: 4,
  maxY: 12,
  blockedSpaces: {
    "7x4": true,
    "1x11": true,
    "12x10": true,
    "4x7": true,
    "5x7": true,
    "6x7": true,
    "8x6": true,
    "9x6": true,
    "10x6": true,
    "7x9": true,
    "8x9": true,
    "9x9": true,
  },
};


const playerColors = ["blue", "red", "orange", "yellow", "green", "purple"];


function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function getKeyString(x, y) {
  return `${x}x${y}`;
}

function createName() {
  const prefix = randomFromArray([
    "POOKIE",
    "SUPER",
    "BADA",
    "TERA",
    "MERA",
    "BIG",
    "GOOD",
    "SMALL",
    "MY",
    "YOUR",
    "GAY",
    "CHUTKI KI",
    "LONG",
    "DARK",
    "SOFT",
    "TAMBI",
  ]);
  const animal = randomFromArray([
    "BEAR",
    "DICK",
    "CHUT",
    "LUND",
    "BETA",
    "MUTH",
    "BAAP",
    "GAND",
    "JHAT",
    "BOOBS",
    "TITS",
    "BHEEM",
    "KUTTA",
    "CHAD",
    "FISHU",
  ]);
  return `${prefix} ${animal}`;
}