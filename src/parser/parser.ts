import { ParserInterface } from "./interfaces/parser-interfaces";
import { match, compile } from "path-to-regexp";
class Parser implements ParserInterface {
  /**
   *
   * Matches path with path template
   * /user/1 == /user/:id
   */
  match(path: string, currentPath: string) {
    const pathMatchFn = match(path, {
      encode: encodeURI,
      decode: decodeURIComponent,
    });
    const matchResults = pathMatchFn(currentPath) as object;
    return matchResults;
  }
  /**
   * Compiles path template and params to actual path
   * (path: /user/:id; params: {id: 1}) => /user/1
   */
  compile(path: string, params: {}) {
    return "";
  }
}
export { Parser };
