import fs from "fs";
import path from "path";

export function NestedDir(
  dir: string,
  _nestedDir?: string[],
): Array<Array<string>> {
  const rootPath = path.join(dir, _nestedDir?.join("/") ?? "");

  const content = fs.readdirSync(rootPath);
  return content.reduce<Array<Array<string>>>((acc, curr) => {
    const currentPath = path.join(rootPath, curr);

    if (!fs.statSync(currentPath).isDirectory()) {
      acc.push([...(_nestedDir ?? []), curr]);
      return acc;
    }

    return [...acc, ...NestedDir(dir, [...(_nestedDir ?? []), curr])];
  }, []);
}
