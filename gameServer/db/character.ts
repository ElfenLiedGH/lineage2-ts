import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import {Point} from "../../types/point";

interface CharacterModel {
  login: string,
  objectId: number,
  name: string,
  classId: number,
  raceId: number,
  sex: number,
  hairColor: number,
  hairStyle: number,
  face: number,
  exp: number,
  sp: number,
  hp: number,
  mp: number,
  location: Point,
}

let database = new FileSync("data/database.json");
const db: any = low(database);

export class CharacterDb {
  public static getCharacters(login: string): CharacterModel[] {
    return db.get("characters").filter({"login": login}).value();
  }

  public static getCharacterNames(): string[] {
    return db.get("characters").map("name").value();
  }

  public static addCharacter(character: CharacterModel) {
    db.get("characters").push(character).write();
  }
}
