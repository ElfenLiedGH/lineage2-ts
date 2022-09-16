import fs from 'fs'
import path from 'path'
import {dataPath} from "../config";
import debug from 'debug';

const log = debug('data-sets:loaders:file-loader')

export class FileLoader {
  public static getData(fileName: string | string[]): string {
    let filePath = [dataPath];
    if (Array.isArray(fileName)) {
      filePath = filePath.concat(fileName)
    } else {
      filePath.push(fileName)
    }

    const file = path.resolve(...filePath);
    log(`load: ${file}`)
    return fs.readFileSync(path.resolve(...filePath), 'utf-8');
  }
}
