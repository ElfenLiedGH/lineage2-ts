import isNumber from 'lodash/isNumber'
import {DefaultLoader} from "../defaultLoader";
import {ClassGenerator} from "../classGenerator";

const filePath = 'PcParameters/combat_stats.pcparams'

export class CombatStats extends ClassGenerator<Map<string, string>> {

  private static parse(data: Map<string, string[][]>) {
    const dataMap: Map<string, Map<string, string>> = new Map();
    for (const [className, stats] of data.entries()) {
      const map: Map<string, string> = new Map();
      stats.forEach(el => {
        map.set(el[0], el[1])
      })
      dataMap.set(className, map)
    }
    return dataMap;
  }

  protected getIterator(): Map<string, Map<string, string>> {
    const map: Map<string, Map<string, string>> = new Map();
    const dataMap = CombatStats.parse(
      new DefaultLoader(filePath).parse()
    );
    for (const [entry, value] of dataMap) {
      map.set(entry, value);
    }

    const shortsMap: Map<string, string> = new Map()
    const data = dataMap.values().next().value
    for (const [short] of data) {
      shortsMap.set(short, short)
    }
    map.set('Shorts', shortsMap)
    return map;
  }

  protected generateClass(className: string, data: Map<string, string>): string {

    if (className === 'CombatStatsShorts') {
      let classStr = `
      export class ${className} {
      `
      for (const [entry, value] of data) {
        classStr += ` private static readonly ${entry}: keyof ${className} = ${isNumber(value) ? value : `"${value}"`};
      
      public get ${entry}(){
        return ${className}.${entry}
      }      
      `
      }
      classStr += ``;
      classStr += `}`;
      return classStr;
    }

    let classStr = `
      export class ${className} {
      `
    for (const [entry, value] of data) {
      classStr += ` private static readonly ${entry} = ${isNumber(value) ? value : `"${value}"`};
      
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
