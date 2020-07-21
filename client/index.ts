import { routerjs } from "../src";
import { home, articles, article } from "./routesCallbacks";
const routes = [
  { name: "home", path: "/", invoke: home },
  { name: "articles", path: "/articles", invoke: articles },
  {
    name: "userArticle",
    path: "/user/:user/article/:slug",
    invoke: article,
  },
];
const router = routerjs();
router.registerRoutes(routes);
window["router"] = router;
