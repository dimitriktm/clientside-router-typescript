import { RouteInterface } from "./interfaces/route-interface";
import { RouteDeclarationInterface } from "./interfaces/route-declaration-interface";
import { trimTrailingSlash } from "./utils";

/**
 * Clean up
 */
class Route implements RouteInterface {
  constructor(private props: RouteDeclarationInterface) {}
  getName() {
    return this.props.name;
  }
  getCallback() {
    return this.props.callback;
  }
  getPath() {
    return this.props.path;
  }
  equals(currentPath: string): boolean {
    const pathComponents = trimTrailingSlash(this.props.path).split("/");
    const currentPathComponents = trimTrailingSlash(currentPath).split("/");

    if (pathComponents.length !== currentPathComponents.length) {
      return false;
    }

    const matchedComponents = pathComponents.filter((component, position) => {
      if (component[0] === ":") {
        return true;
      } else if (component === currentPathComponents[position]) {
        return true;
      } else {
        return false;
      }
    });

    const isComponentsCountMatches =
      matchedComponents.length === currentPathComponents.length;
    return isComponentsCountMatches;
  }
  callCallback(currentPath: string) {
    let currentPathComponents = trimTrailingSlash(currentPath).split("/");
    let pathComponents = trimTrailingSlash(this.props.path).split("/");

    let pathParameters = {};
    pathComponents.map((component, position) => {
      if (component[0] === ":") {
        const noSpecialCharComponent = component.substr(1);
        pathParameters[noSpecialCharComponent] =
          currentPathComponents[position];
      }
    });

    this.props.callback({ params: pathParameters });
  }
}

export { Route };
