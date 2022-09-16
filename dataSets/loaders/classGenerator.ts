import fs from 'fs';
import path from 'path';
import camelCase from 'lodash/camelCase'

import debug from 'debug';

const log = debug('data-sets:class-generator')

export abstract class ClassGenerator<T> {

  constructor(private rootPath: string) {
  }

  protected capitalize(str: string) {
    return str.replace(/^./, str[0].toUpperCase());
  }

  protected camelCase(str: string) {
    return camelCase(str);
  }

  protected log(str: string) {
    log(`${this.constructor.name}: ${str}`);
  }

  private saveToFile(fileName: string, data: string) {
    const fullPath = path.resolve(this.rootPath, fileName);
    if (!fs.existsSync(this.rootPath)) {
      fs.mkdirSync(this.rootPath, {recursive: true});
    }
    fs.writeFile(path.resolve(this.rootPath, fileName), data, (err) => {
      if (err) {
        this.log(`class ${fileName} can not be saved to file ${fullPath}: ${err.toString()}`);
        return;
      }
      this.log(`class ${fileName} saved to file ${fullPath}`);
    })
  }

  public generateClasses(prefix = '') {
    this.log(`generation started`);
    for (const [className, entries] of this.getIterator()) {
      const adaptiveClassName = this.camelCase(prefix+this.capitalize(className));
      const data = this.generateClass(this.capitalize(adaptiveClassName), entries);
      this.saveToFile(`${adaptiveClassName}.ts`, data)
    }
    this.log(`generation finished`);
  }

  protected abstract getIterator(): Map<string, T>

  protected abstract generateClass(className: string, data: T): string

}
