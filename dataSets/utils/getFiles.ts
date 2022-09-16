import fs from "fs";

export function getFilesInDirSync(filesPath: string, onlyWith?: string): string[] {
  const files: string[] = []
  fs.readdirSync(filesPath).forEach(file => {
    if (!onlyWith || file.search(onlyWith) !== -1) {
      files.push(file);
    }
  });
  return files;
}
