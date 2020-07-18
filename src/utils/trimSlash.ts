import removeTrailingSlash from "remove-trailing-slash";

const trimTrailingSlash = (path: string): string => removeTrailingSlash(path);

export { trimTrailingSlash };
