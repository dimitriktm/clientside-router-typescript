interface ParserInterface {
  match(path: string, currentPath: string): boolean;
  parse(
    path: string,
    currentPath: string
  ): { path: string; params: { [key: string]: string } };
  compile(path: string, params: {}): string;
}

export { ParserInterface };
