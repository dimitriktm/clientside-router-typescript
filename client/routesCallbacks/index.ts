function home({ params }) {
  console.log("home page");
  console.log("params", params);
}
function articles({ params }) {
  console.log("articles page");
  console.log("params", params);
}
function article({ params }) {
  console.log("article page");
  console.log("params", params);
}

export { home, articles, article };
