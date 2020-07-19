import { RouterJs } from "../src";
import { home, articles, article } from "./routesCallbacks";
const routes = [
  { name: "home", path: "/", callback: home },
  { name: "articles", path: "/articles", callback: articles },
  {
    name: "userArticle",
    path: "/user/:user/article/:slug",
    callback: article,
  },
];
const router = new RouterJs();
router.registerRoutes(routes);
window["router"] = router;
