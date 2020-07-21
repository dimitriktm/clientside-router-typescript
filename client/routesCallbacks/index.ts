function home({ params }) {
  console.log("home page");
  console.log("params", params);
}
function articles({ params }) {
  console.log("articles page");
  console.log("params", params);
}
function article({ params, path }) {
  console.log("article page");
  console.log("path", path);
  console.log("params", params);
}

export { home, articles, article };
