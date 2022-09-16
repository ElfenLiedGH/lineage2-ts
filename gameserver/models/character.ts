import {Point} from '../common/point'
import {Gender} from '../common/gender'
import {WorldObject} from "./worldObject";
import {IdFactory} from "../../util/IdFactory";

export class Character extends WorldObject {

  public name: string = "";
  public title: string = "";
  public gender: Gender = Gender.male;

  public level: number = 1;
  public exp: number = 0;
  public sp: number = 0;

  public str: number = 0;
  public dex: number = 0;
  public con: number = 0;
  public int: number = 0;
  public wit: number = 0;
  public men: number = 0;
  public hp: number = 0;
  public maximumHp: number = 0;
  public mp: number = 0;
  public maximumMp: number = 0;

  public pAtk: number = 0;
  public pDef: number = 0;
  public mAtk: number = 0;
  public mDef: number = 0;
  public pSpd: number = 0;
  public mSpd: number = 0;

  public accuracy: number = 0;
  public critical: number = 0;
  public evasion: number = 0;
  public runSpeed: number = 0;
  public walkSpeed: number = 0
  public swimSpeed: number = 0;
  public maximumLoad: number = 0;

  public location: Point = new Point();

  // public get x(): number {
  //   return this.location.x
  // }
  //
  // public get y(): number {
  //   return this.location.y
  // }
  //
  // public get z(): number {
  //   return this.location.z
  // }
  //
  // public set x(x: number) {
  //   this.location.x = x
  // }
  //
  // public set y(y: number) {
  //   this.location.y = y
  // }
  //
  // public set z(z: number) {
  //   this.location.z = z
  // }

  public _target: Character | undefined

  public getTarget(): Character | undefined {
    return this._target;
  }

  public setTarget(character?: Character) {
    this._target = character
  }

  constructor() {
    super(IdFactory.getInstance().getNextId())
  }


}
