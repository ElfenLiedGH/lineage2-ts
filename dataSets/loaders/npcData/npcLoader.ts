import {FileLoader} from "../fileLoader";
import {lineEndRegExp} from "../../config";

const path = ['script/NpcData'];

export interface NpcObject {
  id: number,
  type: string,
  name: string,
  template: Map<string, string>
}

export class NpcLoader {
  constructor(protected fileName: string) {
  }

  public parse(): NpcObject {
    const npcObject: NpcObject = {
      id: 0,
      type: '',
      name: '',
      template: new Map()
    }
    FileLoader.getData([...path, this.fileName])
      .split(lineEndRegExp)
      .forEach((line, lineNumber) => {
          if (lineNumber === 0) {
            return;
          } else if (lineNumber === 1) {
            npcObject.type = line
          } else if (lineNumber === 2) {
            npcObject.id = +line
          } else if (lineNumber === 3) {
            npcObject.name = line.replace(/[\[\]]/g, '')
          } else if (line.search('npc_end') == -1) {
            const data = line.split('=');
            npcObject.template.set(data[0], data[1])
          }
        }
      )
    return npcObject;
  }
}
