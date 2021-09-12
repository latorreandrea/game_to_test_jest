  /**
   * @jest-environment jsdom
   */

  const {
    test,
    expect
  } = require("@jest/globals");
  const {
    game
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