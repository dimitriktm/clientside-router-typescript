import { RouterRequestInterface } from "./interfaces";
class RouterRequest implements RouterRequestInterface {
  public getPath(): string {
    return window.location.pathname;
  }
  public onUrlChange(callback: Function) {}
}
export { RouterRequest };
