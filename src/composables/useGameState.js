import { ref } from "vue";

const gameState = {
  tiles: ref([
    {
      id: 0,
      color: "red",
      isActivated: false,
      src: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    },
    {
      id: 1,
      color: "green",
      isActivated: false,
      src: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    },
    {
      id: 2,
      color: "blue",
      isActivated: false,
      src: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    },
    {
      id: 3,
      color: "yellow",
      isActivated: false,
      src: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
    },
  ]),
  computerSequence: ref([]),
  humanSequence: ref([]),
  level: ref(1),
  msg: ref("Simon Says..."),
  isDisabledBtn: ref(false),
  isDisabledTileContainer: ref(true),

  startGame() {
    this.isDisabledBtn = true;
    this.isDisabledTileContainer = true;
    this.computerPlays();
  },
  async computerPlays() {
    this.msg = "Computer plays...";
    this.saveComputerMove();
    await this.computerPlaysRound();
    await this.delay(1000);
    this.msg = "Your turn...";
    this.isDisabledTileContainer = false;
  },
  saveComputerMove() {
    const tile = this.getRandomTile();
    this.computerSequence.push(tile);
    let colors = [];
    for (let i = 0; i < this.level; i++) {
      colors += "[" + this.computerSequence[i].color + "]";
    }
    console.log("computer: " + colors);
  },
  getRandomTile() {
    const random = this.tiles[Math.floor(Math.random() * this.tiles.length)];
    return random;
  },
  async computerPlaysRound() {
    for (let i = 0; i < this.level; i++) {
      const tile = this.computerSequence[i];
      const sound = new Audio(tile.src);
      await this.delay(400);
      sound.play();
      tile.isActivated = true;
      await this.delay(500);
      tile.isActivated = false;
    }
  },
  async humanPlays(tile) {
    const atIndex = this.saveHumanMove(tile);
    const sound = new Audio(tile.src);
    sound.play();
    tile.isActivated = true;
    await this.delay(300);
    tile.isActivated = false;
    this.evaluateMove(atIndex);
  },
  // return index of saved tile
  saveHumanMove(tile) {
    const length = this.humanSequence.push(tile);
    let colors = [];
    for (let i = 0; i < length; i++) {
      colors += "[" + this.humanSequence[i].color + "]";
    }
    console.log("human: " + colors);
    return length - 1;
  },

  evaluateMove(atIndex) {
    while (this.wrongTile(atIndex)) {
      this.resetGame("You pressed wrong tile, game is over");
      this.isDisabledTileContainer = true;
      return;
    }
    while (this.humanSequenceHasCorrectLength()) {
      this.moveToNextLevel("Congratulations! You passed to the next level: ");
      this.isDisabledTileContainer = true;
      return;
    }
  },
  wrongTile(index) {
    while (this.computerSequence[index] !== this.humanSequence[index]) {
      return true;
    }
  },
  humanSequenceHasCorrectLength() {
    while (this.computerSequence.length === this.humanSequence.length) {
      return true;
    }
  },
  resetGame(text) {
    this.computerSequence = [];
    this.humanSequence = [];
    this.level = 1;
    this.msg = text;
    this.isDisabledBtn = false;
  },

  async moveToNextLevel(text) {
    this.level = ++this.level;
    this.humanSequence = [];
    this.msg = text + this.level;
    await this.delay(2000);
    this.startGame();
  },

  //function for improving of ux
  async delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },
};

export function useGameState() {
  return gameState;
}
