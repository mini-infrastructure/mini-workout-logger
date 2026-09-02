export const cssVar = <T = string>(name: string): T =>
    `var(${name})` as unknown as T;
