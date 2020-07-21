import { Route } from "./interfaces/route";
import { ParserInterface } from "../parser/interfaces/parser-interfaces";

// todo implement singleton or throw error on new if router registered
class Router {
  protected routes: Route[] = [];

  constructor(
    protected request,
    protected response,
    protected parser: ParserInterface
  ) {}

  public registerRoutes(routes: Route[]) {
    /**
     * This method acts as init method
     */
    this.routes = routes;
    /**
     * When user lands first time on the page
     * Next url changes will be fired with event throught Link component so we can catch path change event
     */
    this.matchPath();

    // todo clean up event listener on desctruction
    window.addEventListener("popstate", () => this.matchPath());
  }

  protected matchPath() {
    const currentPath = this.request.getPath();
    let matchedRoute = null;
    let routeData = null;
    for (let route of this.routes) {
      let matchResult = this.parser.match(route.path, currentPath);
      if (matchResult !== false && matchResult !== null) {
        matchedRoute = route;
        routeData = matchResult;
        break;
      }
    }
    if (matchedRoute !== null) {
      matchedRoute.invoke(routeData);
    } else {
      //todo handle scenario if no route matched
    }
  }
  protected getParams(currentPath: string) {}
  // public go({ name = "", path = "", params = {} }) {
  //   const matchedRoute = this.routes.find((route) => {
  //     if (route.getName() !== "" && name !== "" && route.getName() === name) {
  //       return true;
  //     } else if (route.equals(path)) {
  //       return true;
  //     } else {
  //       //todo handle scnerioa if no route matched
  //     }
  //   });

  //   /**
  //    * create path with supplied params
  //    * */
  //   const routeToPath = compile(matchedRoute.getPathPattern(), {
  //     encode: encodeURIComponent,
  //   });
  //   const compiledPath = routeToPath(params);

  //   this.response.redirect(compiledPath);
  // }
}
export { Router };
