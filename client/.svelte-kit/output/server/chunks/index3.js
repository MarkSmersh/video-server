class FunctionEvent {
  callback;
  constructor(callback) {
    this.callback = callback;
  }
  async apply(data) {
    await this.callback(
      data
    );
  }
}
class FunctionEmitter {
  functions = {
    update: []
  };
  add(state2, func) {
    const id = crypto.randomUUID();
    this.functions[state2].push({
      id,
      f: new FunctionEvent(func)
    });
    return { state: state2, id };
  }
  remove(state2, id) {
    this.functions[state2] = this.functions[state2].filter((_v, _i) => _v.id !== id);
  }
  emit(state2, data) {
    this.functions[state2].forEach(async (v, i) => {
      v.f.apply(data);
      this.functions[state2] = this.functions[state2].filter((_v, _i) => _v.id !== v.id);
    });
  }
}
class State {
  state = "idle";
  video = null;
  time = 0;
  isPaused = false;
  setState(s) {
    this.state = s;
    fe.emit("update", "state");
  }
  setVideo(v) {
    this.video = v;
    fe.emit("update", "video");
  }
  setTime(t) {
    this.time = t;
    fe.emit("update", "time");
  }
  setPause(isPaused) {
    this.isPaused = isPaused;
    fe.emit("update", "pause");
  }
  get() {
    return {
      state: this.state,
      video: this.video,
      time: this.time,
      isPaused: this.isPaused
    };
  }
}
const fe = new FunctionEmitter();
const state = new State();
export {
  fe as f,
  state as s
};
