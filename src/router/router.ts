import { Route } from "./interfaces/route";
import { ParserInterface } from "../parser/interfaces/parser-interfaces";
import {
  RouterRequestInterface,
  RouterResponseInterface,
} from "../communication/interfaces";
// todo implement singleton or throw error on new if router registered
class Router {
  protected routes: Route[] = [];
  private onRequest = this._onRequest.bind(this);

  constructor(
    protected request: RouterRequestInterface,
    protected response: RouterResponseInterface,
    protected parser: ParserInterface
  ) {}

  public registerRoutes(routes: Route[]) {
    /**
     * This method acts as init method
     */
    this.routes = routes;
    this.onRequest(); //When user lands first time on the page
    this.request.listerForRequest(this.onRequest);
  }
  protected _onRequest() {
    const foundRoute = this.matchPath();
    if (foundRoute) {
      this.invokeCallback(foundRoute);
    }
  }
  protected matchPath() {
    const currentPath = this.request.getPath();
    const foundRoute = this.routes.find((route) =>
      this.parser.match(route.path, currentPath)
    );
    return foundRoute;
  }
  protected invokeCallback(route: Route) {
    const currentPath = this.request.getPath();
    const parsedCurrentPath = this.parser.parse(route.path, currentPath);
    route.invoke(parsedCurrentPath);
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
