import { RouterJs } from "../src";
import { home, articles, article } from "./routesCallbacks";
const routes = [
  { path: "/", callback: home },
  { path: "/articles", callback: articles },
  { path: "/user/:user/article/:slug", callback: article },
];
const router = new RouterJs();

router.registerRoutes(routes);
window["router"] = router;
