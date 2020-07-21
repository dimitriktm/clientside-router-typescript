class RouterRequest {
  public getPath(): string {
    return window.location.pathname;
  }
  public onUrlChange(callback: Function) {}
}
export { RouterRequest };
