class RouterResponse {
  public redirect(path: string) {
    history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  }
}
export { RouterResponse };
