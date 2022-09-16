import debug from 'debug';
import {FileLoader} from "../fileLoader";
import {lineEndRegExp} from "../../config";

const log = debug('data-sets:loaders:manual-data-loader')

export const path = ['script', 'CategoryData'];

interface CategoryData {
  name: string,
  data: Set<string>
}

export class CategoryDataLoader {

  constructor(private fileName: string) {
  }

  public parse() {
    log(`load: ${this.fileName}`)
    const data = FileLoader.getData([...path, this.fileName]);
    const categoryMap: Map<string, Set<string>> = new Map();
    let started = true;
    let categoryName = '';
    let category = ''
    data
      .split(lineEndRegExp)
      .forEach(line => {
        if (line.search('category_define_begin') !== -1) {
          started = true;
        } else if (started && line.search('name=') !== -1) {
          categoryName = line
            .replace(/\s/g, '')
            .split('=')[1]
            .replace(/[\[\]]/g, '')
        } else if (line.search('category_define_end') !== -1) {
          started = false;
          categoryMap.set(categoryName, new Set(category.split(';').map(el => el.replace(/^@/, ''))));
        } else if (line.search('category=') !== -1) {
          category = line
            .replace(/\s/g, '')
            .split('=')[1]
            .replace(/[{}]/g, '')
        } else if (started && category) {
          category += line
            .replace(/\s/g, '')
            .replace(/[{}]/g, '')
        }
      })
    return {name: categoryName, data: categoryMap.get(categoryName)!};
  }
}
