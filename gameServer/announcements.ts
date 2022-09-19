import fs from 'fs'

// TODO make singltone parent extends
export class Announcements {
  private _data: string = '';
  private static announcements: Announcements;

  private constructor() {

  }

  public static getInstance() {
    if (!Announcements.announcements) {
      Announcements.announcements = new Announcements();
    }
    return Announcements.announcements
  }

  addFile(path: string) {
    this._data = JSON.parse(fs.readFileSync(path, "utf-8"));
  }

  each(callback: Function) {
    for (let i = 0; i < this._data.length; i++) {
      callback(this._data[i]);
    }
  }
}
