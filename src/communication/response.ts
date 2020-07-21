import { RouterResponseInterface } from "./interfaces";
class RouterResponse implements RouterResponseInterface {
  public redirect(path: string) {
    history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  }
}
export { RouterResponse };
