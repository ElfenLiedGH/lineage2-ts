import path from "path";
import fs from "fs";
import debug from "debug";
import {NpcLoader, NpcObject} from "./npcLoader";
import isNaN from "lodash/isNaN";
import camelCase from 'lodash/camelCase'
import omit from 'lodash/omit'
import {getFilesInDirSync} from "../../utils/getFiles";
import {dataPath} from "../../config";

const root = './dataSets/generated'

const log = debug('data-sets:npc-class-generator')

const pathNpcData = 'script/NpcData';

export class NpcClassGenerator {

  public static generateAll() {
    const folders = getFilesInDirSync(path.resolve(dataPath, pathNpcData))
    const npcMap: Map<number, any> = new Map()

    let count = 0;

    for (const folder of folders) {
      if (!fs.statSync(path.resolve(dataPath, pathNpcData, folder)).isFile()) {
        const files = getFilesInDirSync(path.resolve(dataPath, pathNpcData, folder))
        for (const file of files) {
          if (fs.statSync(path.resolve(dataPath, pathNpcData, folder, file)).isFile()) {

            if (folder === 'warriors' && count < 10) {
              const npc = new NpcClassGenerator(`${folder}/${file}`).generate()
              npcMap.set(npc.id, npc.name)
              count++;
            }
          } else {
            // TODO добавить рекурсивный обход
            console.log('NO!!!!', path.resolve(dataPath, pathNpcData, folder, file))
          }
        }

      } else {
        console.log('file!!!!', folder)
      }
    }
    // TODO добавить ссылки на классы
    console.log('npc total', npcMap.size, npcMap.get(1))
  }

  private rootPath = path.resolve(root, 'npcData')

  constructor(private fileName: string) {
  }

  private log(str: string) {
    log(`${this.constructor.name}: ${str}`);
  }

  protected capitalize(str: string) {
    return str.replace(/^./, str[0].toUpperCase());
  }

  protected camelCase(str: string) {
    return camelCase(str);
  }

  private getClassStr(data: NpcObject): string {

    const className = this.capitalize(this.camelCase(data.name));
    let classStr = `
    import {Npc} from "@gameServer/models/npc";
      export class ${className} extends Npc{
      
        constructor(){
          super()
          this.hp = this.getOrgHp();
        }
      
      `

    classStr += ``;
    classStr += `public static getId(){ return ${data.id} }`;
    classStr += ``;
    classStr += `public static getType(){ return "${data.type}" }`;
    classStr += ``;
    classStr += `public static getName(){ return "${data.name}" }`

    classStr += ``;

    classStr += ``;
    classStr += `public getId(){ return ${data.id} }`;
    classStr += ``;
    classStr += `public getName(){ return "${data.name}" }`

    classStr += `public getTitle(){ return "title empty" }`
    classStr += `public getMSpeed(){ return 1 }`
    classStr += `public getPSpeed(){ return 1 }`
    classStr += `public getRunSpeed(){ return 100 }`
    classStr += `public getWalkSpeed(){ return 100 }`
    classStr += `public getRightHand(){ return 1 }`
    classStr += `public getLeftHand(){ return 1 }`

    for (const [entry, value] of data.template) {
      if (!entry) {
        continue;
      }
      classStr += `
      
      public get${this.capitalize(this.camelCase(entry))}(){
        return ${!isNaN(+value) ? +value : `"${value}"`}
      }      
      `
    }

    classStr += ``;
    classStr += `}`;

    return classStr;
  }

  public generate(): Omit<NpcObject, 'template'> {
    const data = new NpcLoader(this.fileName).parse();
    const classStr = this.getClassStr(data)
    this.saveToFile(this.camelCase(this.fileName.split('/')[0]), `${this.camelCase(data.name)}.ts`, classStr)
    return omit(data, 'template')
  }

  private saveToFile(fileDir: string, fileName: string, data: string) {
    if (!fs.existsSync(path.resolve(this.rootPath, fileDir))) {
      fs.mkdirSync(path.resolve(this.rootPath, fileDir), {recursive: true});
    }
    const fullPath = path.resolve(this.rootPath, fileDir, fileName);
    fs.writeFile(fullPath, data, (err) => {
      if (err) {
        this.log(`class ${fileName} can not be saved to file ${fullPath}: ${err.toString()}`);
        return;
      }
      this.log(`class ${fileName} saved to file ${fullPath}`);
    })
  }
}
