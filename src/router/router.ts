import { Route } from "./interfaces/route";
import { ParserInterface } from "../parser/interfaces/parser-interfaces";
import {
  RouterRequestInterface,
  RouterResponseInterface,
} from "../communication/interfaces";
// todo implement singleton or throw error on new if router registered
class Router {
  protected routes: Route[] = [];

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
    /**
     * When user lands first time on the page
     */
    this.onRequest();

    /**
     * Next url changes will be fired with event throught navigate method that's attached to link or called programmatically
     */
    // todo clean up event listener on desctruction
    window.addEventListener("popstate", () => this.onRequest());
  }
  protected onRequest() {
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
}
export { Router };
