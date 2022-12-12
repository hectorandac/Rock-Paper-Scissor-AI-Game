let instance;
let game_started = false;

export class GameStarted {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getStarted() {
    return game_started;
  }

  setStart(v) {
    game_started = v
  }
}