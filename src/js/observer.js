export default class Observer {
  constructor(targetNode, options) {
    this.targetNode = targetNode;
    this.options = options;
    this.observer = null;
  }

  runAndStop(callback) {
    this.observer = new MutationObserver((mutations) => {
      this.start();
      callback(mutations);
      this.stop();
    });
    return this;
  }

  stopAndRun(callback) {
    this.observer = new MutationObserver((mutations) => {
      this.stop();
      callback(mutations);
      this.start();
    });
    return this;
  }

  start() {
    if (this.observer) {
      this.observer.observe(this.targetNode, this.options);
    }
    return this;
  }

  stop() {
    this.observer.disconnect();
    return this;
  }
}
