import { Router } from "./core/router";
import { RouterRequest, RouterResponse } from "./communication";
import { Parser } from "./parser";
const routerjs = (): Router =>
  new Router(new RouterRequest(), new RouterResponse(), new Parser());
export { routerjs };
