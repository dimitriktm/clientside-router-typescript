import { Route } from "./interfaces/route";
import { ParserInterface } from "../parser/interfaces/parser-interfaces";
import {
  RouterRequestInterface,
  RouterResponseInterface,
} from "../communication/interfaces";
// todo implement singleton or throw error on new if router registered
class Router {
  private routes: Route[] = [];
  /**
   * Bind scope, method will passed as callback to event listener in request
   * I didn't used anonymous arrow function because i will not be able to remove event listener with anonymous function when destroy method gets called
   */
  private onRequest = this._onRequest.bind(this);

  constructor(
    private request: RouterRequestInterface,
    private response: RouterResponseInterface,
    private parser: ParserInterface
  ) {}
  private _onRequest() {
    const foundRoute = this.matchPath();
    if (foundRoute) {
      this.invokeCallback(foundRoute);
    }
  }
  private matchPath() {
    const currentPath = this.request.getPath();
    const foundRoute = this.routes.find((route) =>
      this.parser.match(route.path, currentPath)
    );
    return foundRoute;
  }
  private invokeCallback(route: Route) {
    const currentPath = this.request.getPath();
    const parsedCurrentPath = this.parser.parse(route.path, currentPath);
    route.invoke(parsedCurrentPath);
  }

  public registerRoutes(routes: Route[]) {
    /**
     * This method acts as init method
     */
    this.routes = routes;
    this.onRequest(); //When user lands first time on the page
    this.request.listerForRequest(this.onRequest);
  }
  public navigate(
    routeName: string,
    params: { [key: string]: string | number } = {}
  ) {
    const foundRoute = this.routes.find((route) => route.name === routeName);
    if (foundRoute) {
      const compiledPath = this.parser.compile(foundRoute.path, params);
      this.response.redirect(compiledPath);
    }
  }
  public destroy() {
    this.request.unlistenForRequest(this.onRequest);
  }
}
export { Router };
