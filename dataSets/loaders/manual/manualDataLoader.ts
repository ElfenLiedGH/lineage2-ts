import debug from 'debug';
import {FileLoader} from "../fileLoader";
import {lineEndRegExp} from "../../config";

const log = debug('data-sets:loaders:manual-data-loader')

export const path = ['script', 'Manual'];

export class ManualDataLoader {

  constructor(private fileName: string) {
  }

  public parse(): Map<string, number> {
    log(`load: ${this.fileName}`)
    const data = FileLoader.getData([...path, this.fileName]);
    const map = new Map();
    data
      .split(lineEndRegExp)
      .filter(el => !!el)
      .forEach(el => {
        const [key, value] = el.split(/=/)
        map.set(key.replace(/([\[\]\t])*/g, ''), +(value.replace(/[\s\t]*/g, '')));
      })
    return map;
  }
}
