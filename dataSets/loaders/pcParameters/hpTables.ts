import {DefaultLoader} from "../defaultLoader";
import {ClassGenerator} from "../classGenerator";

export class HpTables extends ClassGenerator<Map<string, number[]>> {

  constructor(
    rootPath: string,
    protected filePath: string,
  ) {
    super(rootPath);
  }

  protected static parse(data: Map<string, string[][]>) {
    const dataMap: Map<string, number[]> = new Map();
    for (const [className, stats] of data.entries()) {
      dataMap.set(className, stats
        .map(el => +[el[1]]))
    }
    return dataMap;
  }

  /**
   * Почему то названия отличаются
   * @param className
   * @private
   */
  private modifyClassName(className: string) {
    if (className === 'plain_walker') {
      return 'plains_walker'
    }
    if (className === 'assasin') {
      return 'assassin'
    }

    return className;
  }

  protected generateClass(className: string, data: Map<string, number[]>): string {
    let classStr = `
      export class ${className} {
      `
    for (const [entry, value] of data) {
      const modifiedEntry = this.modifyClassName(entry)
      classStr += ` private static readonly ${modifiedEntry} = [${value.join()}];

      public get ${modifiedEntry}(){
        return ${className}.${modifiedEntry}
      }
      `
    }
    classStr += ` 
      public static getValue(className: keyof ${className}, lvl:number): number{
        return this[className][lvl]
      }
      `;
    classStr += ``;
    classStr += `}`;
    return classStr;
  }

  protected getIterator(): Map<string, Map<string, number[]>> {
    return new Map([['hpTable', HpTables.parse(
      new DefaultLoader(this.filePath).parse('_hp_table')
    )]]);
  }
}
