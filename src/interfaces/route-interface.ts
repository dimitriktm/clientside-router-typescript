interface RouteInterface {
  getName(): string;
  getPath(): string;
  getCallback(): Function;
  equals(path: string): boolean;
  callCallback(path: string);
}

export { RouteInterface };
