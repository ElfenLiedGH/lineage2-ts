import {DefaultLoader} from "../defaultLoader";
import {ClassGenerator} from "../classGenerator";

export class MovingSpeed extends ClassGenerator<Map<string, number[]>> {

  constructor(
    rootPath: string,
    protected filePath: string,
  ) {
    super(rootPath);
  }

  protected static parse(data: Map<string, string[][]>) {
    const dataMap: Map<string, number[]> = new Map();
    for (const [_, statsArray] of data.entries()) {
      statsArray.forEach(([className, stats])=>{
        dataMap.set(className, stats.replace(/[{}]/g, '')
          .split(';')
          .map(el => +el))
      })
    }
    return dataMap;
  }

  protected generateClass(className: string, data: Map<string, number[]>): string {
    let classStr = `
    
      export enum MovingType {
        walk,
        run,
        walkSwim,
        runSwim
      }
      export class ${className} {
      `
    for (const [entry, value] of data) {
      classStr += ` private static readonly ${entry} = [${value.join()}];

      public get ${entry}(){
        return ${className}.${entry}
      }
      `
    }
    classStr += ` 
      public static getValue(className: keyof ${className}, movingType:MovingType): number{
        return this[className][movingType]
      }
      `;
    classStr += ``;
    classStr += `}`;
    return classStr;
  }

  protected getIterator(): Map<string, Map<string, number[]>> {
    return new Map([['movingSpeed', MovingSpeed.parse(
      new DefaultLoader(this.filePath).parse()
    )]]);
  }
}
