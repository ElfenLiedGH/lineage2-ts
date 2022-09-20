import {DefaultLoader} from "../defaultLoader";
import {ClassGenerator} from "../classGenerator";

const filePath = 'PcParameters/pc_collision_box.pcparams'

export class CollisionBox extends ClassGenerator<Map<string, number[]>> {
  private static parse(data: Map<string, string[][]>) {
    let points: number[][] = [];
    const map: Map<string, Map<string, number[]>> = new Map();
    const classMap: Map<string, number[]> = new Map()
    data.forEach((pointArray, _) => {
      pointArray.forEach(point => {
        classMap.set(point[0], point[1].trim().replace(/[{}]/g, '').split(';').map(el => +el))
      })
      points = [];
    })
    map.set('collisionBox', classMap)
    return map;
  }

  protected generateClass(className: string, data: Map<string, number[]>): string {
    let classStr = `
      import assert from 'assert'
      export class ${className} {
      `
    for (const [entry, value] of data) {
      classStr += ` private static readonly ${entry} = [${value}];
      
      public get ${entry}(){
        return ${className}.${entry}
      }      
      `
    }

    classStr += ` 
      public static getValue(className: keyof ${className}): number[]{
        const value = this[className];
        assert(value, 'collision for ' + className + ' not found')
        return value;
      }
      `;

    classStr += ``;
    classStr += `}`;
    return classStr;
  }

  protected getIterator(): Map<string, Map<string, number[]>> {
    return CollisionBox.parse(
      new DefaultLoader(filePath).parse('', true)
    );
  }
}
