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
    const isMatches = pathMatchFn(currentPath) !== false;
    return isMatches;
  }
  /**
   * Parser current path for parameters against path template
   */
  parse(path, currentPath) {
    const pathParse = match(path, {
      encode: encodeURI,
      decode: decodeURIComponent,
    });
    /**
     * cast Match<object> to "real" structure that match function returns
     */
    return pathParse(currentPath) as {
      path: string;
      params: { [key: string]: string };
    };
  }
  /**
   * Compiles path template and params to actual path
   * (path: /user/:id; params: {id: 1}) => /user/1
   */
  compile(path: string, params: { [key: string]: string }) {
    const compilePathFn = compile(path, { encode: encodeURIComponent });
    const compiledPath = compilePathFn(params);
    return compiledPath;
  }
}
export { Parser };
