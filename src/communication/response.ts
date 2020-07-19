class RouterResponse {
  static redirect(path: string) {
    history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  }
}
export { RouterResponse };
