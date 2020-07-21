interface RouterRequestInterface {
  getPath(): string;
  onRequest(callback): void;
}
export { RouterRequestInterface };
