class Request {
  static getPath(): string {
    return window.location.pathname;
  }
  static onUrlChange(callback: Function) {}
}

export { Request };
