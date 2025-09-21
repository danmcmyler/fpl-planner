declare module "*.css" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.json" {
  const value: unknown;
  export default value;
}

declare module "jest-axe" {
  import { AxeResults, RunOptions } from "axe-core";
  export function axe(
    container: Element | DocumentFragment,
    options?: RunOptions
  ): Promise<AxeResults>;
}
