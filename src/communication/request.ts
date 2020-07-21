import { RouterRequestInterface } from "./interfaces";
class RouterRequest implements RouterRequestInterface {
  public getPath(): string {
    return window.location.pathname;
  }
  public onUrlChange(callback: Function) {}
  listerForRequest(callback) {
    window.addEventListener("popstate", callback);
  }
  unlistenForRequest(callback) {
    window.removeEventListener("popstate", callback);
  }
}
export { RouterRequest };
