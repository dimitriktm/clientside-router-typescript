interface RouterRequestInterface {
  getPath(): string;
  listerForRequest(callback): void;
  unlistenForRequest(callback): void;
}
export { RouterRequestInterface };
