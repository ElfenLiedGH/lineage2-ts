import {FileLoader} from "./fileLoader";
import {lineEndRegExp} from "../config";

const path = ['script'];

export interface DataLoader<T> {
  parse(): T
}

export class DefaultLoader implements DataLoader<Map<string, string[][]>> {

  constructor(private fileName: string) {
  }

  public parse(removeSuffix = '', addUniqName = false) {
    const data = FileLoader.getData([...path, this.fileName]);
    const dataMap: Map<string, string[][]> = new Map();
    let parameterName = '';
    let dataTable: string[][] = [];
    data
      .split(lineEndRegExp)
      .forEach(line => {
        if (line.search('_begin') !== -1) {
          parameterName = line.replace(/_begin$/, '');
          if (removeSuffix) {
            parameterName = parameterName.replace(removeSuffix, '')
          }
        } else if (line.search('_end') !== -1) {
          dataMap.set(addUniqName ? `${Math.random()}_${parameterName}` : parameterName, dataTable)
          parameterName = '';
          dataTable = [];
        } else if (parameterName) {
          dataTable.push(line.replace(/\s/g, '').split('='))
        }
      })
    return dataMap;
  }
}
