function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function getKeyString(x, y) {
  return `${x}x${y}`;
}

const playerColors = ["blue", "red", "orange", "yellow", "green", "purple"];


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

function initGame() {
    new KeyPressListener("ArrowUp", () => handleArrowPress(0, -1));
    new KeyPressListener("ArrowDown", () => handleArrowPress(0, 1));
    new KeyPressListener("ArrowLeft", () => handleArrowPress(-1, 0));
    new KeyPressListener("ArrowRight", () => handleArrowPress(1, 0));

    const allPlayersRef = firebase.database().ref(`players`);
    const allCoinsRef = firebase.database().ref(`coins`);
    allPlayersRef.on("value", (snapshot) => {
      
    })
    allPlayersRef.on("child_added", (snapshot) => {

    })

}

(function (){

   let playerId;
   let playerRef;
   let players = {};
   let playerElements = {};
   let coins = {};
   let coinElements = {};

  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      //You're logged in!
      playerId = user.uid;
      playerRef = firebase.database().ref(`players/${playerId}`);

      const name = createName();
      playerNameInput.value = name;

      const { x, y } = getRandomSafeSpot();

      playerRef.set({
        id: playerId,
        name,
        direction: "right",
        color: randomFromArray(playerColors),
        x,
        y,
        coins: 0,
      });
      playerRef.onDisconnect().remove();

      //Begin the game now that we are signed in
      initGame();
      
    } else {
      //You're logged out.
    }
  });




  firebase
    .auth()
    .signInAnonymously()
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode, errorMessage);
    });


})();