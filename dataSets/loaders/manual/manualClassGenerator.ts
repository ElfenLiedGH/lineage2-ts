import {ClassGenerator} from "../classGenerator";
import path from "path";
import {dataPath} from "../../config";
import {ManualDataLoader, path as manualFilesSubPath} from "./manualDataLoader";
import {getFilesInDirSync} from "../../utils/getFiles";

const manualFilesPath = path.resolve(...[dataPath, ...manualFilesSubPath])

export class ManualClassGenerator extends ClassGenerator<Map<string, number>> {

  protected getIterator(): Map<string, Map<string, number>> {
    const map:Map<string, Map<string, number>> = new Map();
    const files = getFilesInDirSync(manualFilesPath, '.manual')
    for (const file of files) {
      const data = new ManualDataLoader(file).parse();
      map.set(
        file
          .replace(/^\d{2}_/g, '')
          .replace(/\.manual$/, '')
        , data)
    }
    return map;
  }

  protected generateClass(className: string, data: Map<string, number>): string {
    let classStr = `
      export class ${className} {
      `
    for (const [entry, value] of data) {
      classStr += ` private static readonly ${entry} = ${value};
      
      public get ${entry}(){
        return ${className}.${entry}
      }      
      `
    }
    classStr += ``;
    classStr += `}`;
    return classStr;
  }

}
