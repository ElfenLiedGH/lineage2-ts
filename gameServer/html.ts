import fs from 'fs'

export class Html {
  private _data: Map<string, string> = new Map()
  private static html: Html;

  private constructor() {
  }

  public static getInstance() {
    if (!Html.html) {
      Html.html = new Html();
    }
    return Html.html
  }

  public addFiles(directory: string) {
    fs.readdir(directory, (err, fileNames) => {
      fileNames.forEach(fileName => {
        fs.readFile(`${directory}/${fileName}`, 'utf-8', (err, content) => {
          this._add(fileName, content);
        })
      })
    })
  }

  public get(fileName: string) {
    return this._data.get(fileName);
  }

  private _add(fileName: string, content: string) {
    this._data.set(fileName.substring(0, fileName.indexOf('.')), content);
  }
}
