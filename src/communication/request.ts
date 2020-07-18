class Request {
  static getUrl(): string {
    return window.location.href;
  }
  static getPath(): string {
    return window.location.pathname;
  }
}

export { Request };
