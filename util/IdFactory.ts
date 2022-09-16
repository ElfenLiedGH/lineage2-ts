import fs from 'fs'
import assert from "assert";

const FIRST_OID: number = 0x10000000;

export class IdFactory {
  private _path: string | undefined;
  private currentId: number = FIRST_OID;
  private static instance: IdFactory;

  protected constructor() {
  }

  public static getInstance(): IdFactory {
    if (!IdFactory.instance) {
      IdFactory.instance = new IdFactory();
    }
    return IdFactory.instance;
  }

  public addFile(path: string) {
    this._path = path;
    this._load();
  }

  public getNextId() {
    let id = this.currentId;

    this.currentId++;
    this._save();

    return id;
  }

  private _save() {
    assert(this._path)
    fs.writeFileSync(this._path, this.currentId.toString());
  }

  private _load() {
    assert(this._path)
    let data = fs.readFileSync(this._path, "utf-8");

    if (data.length === 0) {
      this.currentId = FIRST_OID;
      this._save();
    }
  }
}
