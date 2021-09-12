  /**
   * @jest-environment jsdom
   */

  const {
    test,
    expect
  } = require("@jest/globals");
  const {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn,
    showTurns
  } = require("../game");


  beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("/workspace/game_to_test_jest/index.htm", "UTF-8");
    document.open();
    document.write(fileContents);
    document.close();
  });

  describe("game object contains correct keys", () => {
    test("score key exist", () => {
      expect("score" in game).toBe(true);
    });
    test("currentGame key exist", () => {
      expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exist", () => {
      expect("playerMoves" in game).toBe(true);
    });
    test("choices key exist", () => {
      expect("choices" in game).toBe(true);
    });
    test("choices contain correct ids", () => {
      expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
  });

  describe("newGame works correctly", () => {
    beforeAll(() => {
      game.score = 42;
      game.currentGame = ["button1"];
      game.playerMoves = ["button2"];
      document.getElementById("score").innerText = 42;
      newGame();
    });
    test("should set game score to zero", () => {
      expect(game.score).toEqual(0);
    });
    test("should be one move in the computer's game array", () => {
      expect(game.currentGame.length).toBe(1);
    });
    test("should restart playerMoves array", () => {
      expect(game.playerMoves).toEqual([]);
    });
    test("should display zero", () => {
      expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("expect data-listner to be true", () => {
      const elements = document.getElementsByClassName("circle");
      for (let element of elements) {
        expect(element.getAttribute("data-listener")).toEqual("true");
      }
    });
  });

  describe("gameplay works correctly", () => {
    beforeEach(() => {
      game.score = 0;
      game.currentGame = [];
      game.playerMoves = [];
      addTurn();
    });
    afterEach(() => {
      game.score = 0;
      game.currentGame = [];
      game.playerMoves = [];
    });
    test("addTurn adds a new turn to the game", () => {
      addTurn();
      expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
      let button = document.getElementById(game.currentGame[0]);
      lightsOn(game.currentGame[0]);
      expect(button.classList).toContain(game.currentGame[0] + "light");
    });
    test("showTurns should update game.turnNumber", () => {
      game.turnNumber = 42;
      showTurns();
      expect(game.turnNumber).toBe(0);
    });
  });