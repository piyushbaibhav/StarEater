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
      const addedPlayer = snapshot.val();
      const characterElement = document.createElement("div");
      characterElement.classList.add("Character", "grid-cell");
      if (addedPlayer.id === playerId) {
        characterElement.classList.add("you");
      }
       characterElement.innerHTML = `
        <div class="Character_shadow grid-cell"></div>
        <div class="Character_sprite grid-cell"></div>
        <div class="Character_name-container">
          <span class="Character_name"></span>
          <span class="Character_coins">0</span>
        </div>
        <div class="Character_you-arrow"></div>
      `;
      characterElement.querySelector(".Character_name").innerText =
        addedPlayer.name;
      characterElement.querySelector(".Character_coins").innerText =
        addedPlayer.coins;
      characterElement.setAttribute("data-color", addedPlayer.color);
      characterElement.setAttribute("data-direction", addedPlayer.direction);
      const left = 16 * addedPlayer.x + "px";
      const top = 16 * addedPlayer.y - 4 + "px";
      characterElement.style.transform = `translate3d(${left}, ${top}, 0)`;
      gameContainer.appendChild(characterElement);
    })
    allPlayersRef.on("child_removed", (snapshot) => {
      const removedKey = snapshot.val().id;
      gameContainer.removeChild(playerElements[removedKey]);
      delete playerElements[removedKey];
    });

    allCoinsRef.on("value", (snapshot) => {
      coins = snapshot.val() || {};
    });

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