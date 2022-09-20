import {Point} from '../../../types/point'
import {WorldObject} from "../worldObject";
import {IdFactory} from "../../../util/IdFactory";
import {Sex} from "../../../types/sex";
import {CharacterFactory} from "./characterFactory";
import {ClassTypes} from "@dataSets/generated/manual/classTypes";
import {CharacterDb} from "@gameServer/db/character";
import assert from "assert";

export class Character extends WorldObject {

  public title: string = "My Title :)";
  private sex: Sex = 0;

  public getSex(): Sex {
    return this.sex;
  }

  private hairStyle: number = 0;

  public getHairStyle(): number {
    return this.hairStyle
  }

  public setHairStyle(hairStyle: number) {
    this.hairStyle = hairStyle;
  }

  private hairColor: number = 0;

  public getHairColor() {
    return this.hairStyle;
  }

  public setHairColor(hairColor: number) {
    this.hairColor = hairColor;
  }

  private face: number = 0;

  public setFace(face: number) {
    this.face = face;
  }

  public getFace(): number {
    return this.face
  }

  private level: number = 1;

  public getLvl() {
    return this.level
  }

  private karma: number = 0;

  public getKarma() {
    return this.karma
  }

  private exp: number = 0;

  public getExp() {
    return this.exp
  }

  private sp: number = 0;

  public getSp() {
    return this.sp;
  }

  private str: number = 0;

  public getStr() {
    return this.str
  }

  private dex: number = 0;

  public getDex() {
    return this.dex
  }

  private con: number = 0;

  public getCon() {
    return this.con
  }

  private int: number = 0;

  public getInt() {
    return this.int
  }

  private wit: number = 0;

  public getWit() {
    return this.wit
  }

  private men: number = 0;

  public getMen() {
    return this.men
  }

  private hp: number = 0;

  public getHp() {
    return this.hp;
  }

  private maxHp: number = 0;

  public getMaxHp() {
    return this.maxHp;
  }

  private mp: number = 0;

  public getMp() {
    return this.mp;
  }

  private maxMp: number = 0;

  public getMaxMp() {
    return this.maxMp
  }

  private pAtk: number = 0;

  public getPAtk() {
    return this.pAtk;
  }

  private pDef: number = 0;

  public getPDef() {
    return this.pDef
  }

  private mAtk: number = 0;

  public getMAtk() {
    return this.mAtk;
  }

  private mDef: number = 0;

  public getMDef() {
    return this.mDef
  }

  private pSpd: number = 0;

  public getPSpeed() {
    return this.pSpd;
  }

  private mSpd: number = 0;

  public getMSpeed() {
    return this.mSpd;
  }

  private accuracy: number = 0;

  public getAccuracy() {
    return this.accuracy;
  }

  private critical: number = 0;

  public getCritical() {
    return this.critical;
  }

  private evasion: number = 0;

  public getEvasion() {
    return this.evasion
  }

  private runSpeed: number = 100;

  public getRunSpeed() {
    return this.runSpeed;
  }

  private walkSpeed: number = 100

  public getWalkSpeed() {
    return this.walkSpeed;
  }

  private swimSpeed: number = 0;

  public getSwimSpeed() {
    return this.swimSpeed;
  }

  private maxLoad: number = 0;

  public getMaxLoad() {
    return this.maxLoad;
  }

  private _target: Character | undefined

  public getTarget(): Character | undefined {
    return this._target;
  }

  public setTarget(character?: Character) {
    this._target = character
  }

  public getName() {
    return this.name;
  }


  private classId: number = 0

  private login: string = ''

  private name: string = ''

  public getClassId() {
    return this.classId
  }

  private clanId: number | undefined;

  public getClanId() {
    return this.clanId
  }


  private raceId = 0;

  public getRaceId() {
    return this.raceId;
  }

  public getLogin() {
    return this.login;
  }

  private collisionRadius: number = 0;

  public getCollisionRadius() {
    return this.collisionRadius;
  }

  private collisionHeight: number = 0;

  public getCollisionHeight() {
    return this.collisionHeight
  }

  private movementMultiplier: number = 20;

  public getMovementMultiplier() {
    return this.movementMultiplier;
  }

  private attackSpeedMultiplier: number = 1;

  public getAttackSpeedMultiplier() {
    return this.attackSpeedMultiplier;
  }

  public fillDefaultData(login: string, slot: number) {
    const character = CharacterDb.getCharacters(login)[slot];
    console.log('characters', CharacterDb.getCharacters(login))
    assert(character, `slot ${slot} for login ${login} not found ${CharacterDb.getCharacters(login)}`)
    this.classId = character.classId
    this.name = character.name
    this.login = character.login
    this.sex = character.sex
    this.hairStyle = character.hairStyle
    this.face = character.face
    this.raceId = character.raceId

    const characterFactory = new CharacterFactory(character.classId, this.level, this.sex)
    const defaultValues = characterFactory.getValue();

    this.str = defaultValues.stats.str;
    this.dex = defaultValues.stats.dex;
    this.con = defaultValues.stats.con;
    this.int = defaultValues.stats.int;
    this.wit = defaultValues.stats.wit;
    this.men = defaultValues.stats.men;

    this.maxHp = defaultValues.maxHp;
    this.maxMp = defaultValues.maxMp;

    this.hp = this.maxHp;
    this.mp = this.maxMp;

    this.critical = defaultValues.critical;
    this.pAtk = defaultValues.physicalAttack;
    this.mAtk = defaultValues.magicAttack;

    this.walkSpeed = defaultValues.walkSpeed
    this.runSpeed = defaultValues.runSpeed

    this.location = defaultValues.location;

    this.collisionRadius = defaultValues.collision[0]
    this.collisionHeight = defaultValues.collision[1]

  }

  constructor() {
    super(IdFactory.getInstance().getNextId())
  }

  public toSaveObject() {
    return {
      login: this.getLogin(),
      objectId: this.getObjectId(),
      raceId: this.getRaceId(),
      name: this.name,
      classId: this.classId,
      sex: this.sex,
      hairColor: this.hairColor,
      hairStyle: this.hairStyle,
      face: this.face,
      exp: this.exp,
      sp: this.sp,
      hp: this.hp,
      mp: this.mp,
      location: this.location,
    }
  }


}
