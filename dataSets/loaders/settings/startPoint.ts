import {DefaultLoader} from "../defaultLoader";
import {ClassGenerator} from "../classGenerator";

const filePath = 'Setting/02_initial_start_point.setting'

export class StartPoint extends ClassGenerator<Map<string, number[][]>> {
  private static parse(data: Map<string, string[][]>) {
    let points: number[][] = [];
    let classes: string [] = [];
    const map: Map<string, Map<string, number[][]>> = new Map();
    const classMap: Map<string, number[][]> = new Map()
    data.forEach((pointArray, _) => {
      pointArray.forEach(point => {
        if (point[1] && point[0].search('point') !== -1) {
          points.push(point[1].trim().replace(/[{}]/g, '').split(';').map(el => +el))
        } else if (point[1] && point[0].search('class') !== -1) {
          classes = point[1].trim().replace(/[{}]/g, '').split(';')
          classes.forEach(className => {
            classMap.set(className, points)
          })
        }
      })
      points = [];
    })
    map.set('startPoint', classMap)
    return map;
  }

  protected generateClass(className: string, data: Map<string, number[][]>): string {
    let classStr = `
      import random from 'lodash/random'
      import assert from 'assert'
      export class ${className} {
      `
    for (const [entry, value] of data) {
      classStr += ` private static readonly ${entry} = [${value.map(point=>`[${point.join()}]`).join()}];

      public get ${entry}(){
        return ${className}.${entry}
      }
      `
    }

    classStr += ` 
      public static getValue(className: keyof ${className}): number[][]{
        return this[className]
      }`;

    classStr += ` 
      public static getPoint(className: keyof ${className}): number[]{
        const points =  ${className}.getValue(className)
        assert(points, 'start point not found for className ' + className)
        return points[random(1, points.length - 1)]
      }`;
    classStr += ``;
    classStr += `}`;

    return classStr;
  }

  protected getIterator(): Map<string, Map<string, number[][]>> {
    return StartPoint.parse(
      new DefaultLoader(filePath).parse('', true)
    );
  }
}
