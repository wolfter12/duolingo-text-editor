export default class Observer {
  constructor(targetNode, options, callback) {
    this.targetNode = targetNode;
    this.options = options;
    this.callback = callback;
    this.observer = new MutationObserver((mutations) => {
      if (this.callback) {
        this.stop();
        this.callback(mutations);
        this.start();
      }
    });
  }

  start() {
    if (this.observer) {
      this.observer.observe(this.targetNode, this.options);
    } else {
      return new Error("Observer is empty");
    }
    return this;
  }

  stop() {
    this.observer.disconnect();
    return this;
  }
}
