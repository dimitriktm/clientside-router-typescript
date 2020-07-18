import { RouteInterface } from "./interfaces/route-interface";
import { RouteDeclarationInterface } from "./interfaces/route-declaration-interface";

import { Request } from "./communication";
import { Route } from "./route";

// todo implement singleton or throw error on new if router registered
class Router {
  protected routes: RouteInterface[] = [];
  protected request = Request;

  public registerRoutes(routes: RouteDeclarationInterface[]) {
    // todo see how we implement match
    // should order of the routes be case
    // trim last slash
    const routesClasses = routes.map(
      (routeDeclaration) => new Route(routeDeclaration)
    );
    this.routes = routesClasses;
    /**
     * When user lands first time on the page
     * Next url changes will be fired with event throught Link component so we can catch path change event
     */
    this.findRoute();
  }

  protected findRoute() {
    let currentPath = this.request.getPath();
    for (let route of this.routes) {
      if (route.equals(currentPath)) {
        route.callCallback(currentPath);
      }
    }
  }
}

export { Router };
