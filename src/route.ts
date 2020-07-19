import { RouteInterface } from "./interfaces/route-interface";
import { RouteDeclarationInterface } from "./interfaces/route-declaration-interface";
import { trimTrailingSlash } from "./utils";

import { match } from "path-to-regexp";
/**
 * Clean up
 */
class Route implements RouteInterface {
  private path;
  private callback;
  private name;
  private pathPattern;
  constructor(props: RouteDeclarationInterface) {
    this.pathPattern = props.path;
    this.path = match(props.path, {
      encode: encodeURI,
      decode: decodeURIComponent,
    });
    this.callback = props.callback;
    this.name = props.name;
  }
  getName() {
    return this.name;
  }
  getCallback() {
    return this.callback;
  }
  getPath() {
    return this.path;
  }
  getPathPattern() {
    return this.pathPattern;
  }

  equals(currentPath: string): boolean {
    const isEqual = this.path(currentPath);
    return isEqual ? true : false;
  }
  callCallback(currentPath: string) {
    const routeMatch = this.path(currentPath);
    const { params } = routeMatch;
    const routeProps = { params };
    this.callback(routeProps);
  }
}

export { Route };
