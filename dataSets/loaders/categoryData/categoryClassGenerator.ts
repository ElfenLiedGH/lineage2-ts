import {ClassGenerator} from "../classGenerator";
import {CategoryDataLoader, path as categoryFilesSubPath} from "./categoryDataLoader";
import path from "path";
import {dataPath} from "../../config";
import {getFilesInDirSync} from "../../utils/getFiles";

const categoryFilesPath = path.resolve(...[dataPath, ...categoryFilesSubPath])

export class CategoryClassGenerator extends ClassGenerator<Set<string>> {

  protected getIterator(): Map<string, Set<string>> {
    const map: Map<string, Set<string>> = new Map();
    const files = getFilesInDirSync(categoryFilesPath, '.category')
    for (const file of files) {
      const data = new CategoryDataLoader(file).parse();
      map.set(data.name, data.data)
    }
    return map;
  }

  protected generateClass(className: string, category: Set<string>) {
    if (className === 'SummonNpcGroup') {
      return `
      const entries = new Set([${[...category].map(el => (`"${el}"`)).join()}]); 
      export class ${className}{
        public static getComposition(){
          return entries;
        }
      } 
      `
    }

    return `
      import {ClassTypes} from "../manual/classTypes";
      const entries = new Set([${[...category].map(el => (`"${el}"`)).join()}] as (keyof ClassTypes)[]); 
      export class ${className}{
        public static getComposition(){
          return entries;
        }
      } 
      `
  }

}
