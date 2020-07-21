interface ParserInterface {
  match(path: string, currentPath: string): object | boolean;
  compile(path: string, params: {}): string;
}

export { ParserInterface };
