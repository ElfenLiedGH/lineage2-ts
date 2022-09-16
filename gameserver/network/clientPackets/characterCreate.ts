import {base} from '../../../config/config'
import {Character} from '../../templates/Character'
import characterTemplateData from "../../../data/characterTemplates.json";
import {BasePacket} from "./basePacket";
import {CharacterCreateFail} from '../serverPackets/characterCreateFail'
import {CharacterCreateSuccess} from '../serverPackets/characterCreateSuccess'
import {CharacterSelectInfo} from '../serverPackets/characterSelectInfo'
import {Items} from '../../items'

import {IdFactory} from '../../../util/IdFactory'
import {Player} from "../../models/actor/player";

export class CharacterCreate extends BasePacket {

  readData() {
    this._data.readC()
      .readS()
      .readD()
      .readD()
      .readD()
      .readD()
      .readD()
      .readD()
      .readD()
      .readD()
      .readD()
      .readD()
      .readD()
      .readD();
  }



  init() {
    let name = this.getName();
    let characterTemplateTable = this._serialization(characterTemplateData);
    let characterQuantity = this._player.getCharacterQuantity();
    let MAXIMUM_QUANTITY_CHARACTERS = 7;

    if (characterQuantity === MAXIMUM_QUANTITY_CHARACTERS) {
      this._player.sendPacket(new CharacterCreateFail(base.errors.gameserver.REASON_TOO_MANY_CHARACTERS));

      return false;
    }

    if (name.length <= 16 && this._isAlphaNumeric(name)) {
      if (this._checkNameIsExist(name)) {
        // TODO ts
        let character = (new Character((characterTemplateTable as any)[this.getClassId()]) as unknown as Player);
        let charactersData;
        let charactersList = [];

        character.login = this._player.login;
        // TODO ts
        // @ts-ignore
        character._objectId = IdFactory.getInstance().getNextId();
        character.name = this.getName();
        character.maximumHp = character.hp;
        character.maximumMp = character.mp;
        // @ts-ignore
        character.gender = this.getGender();
        // @ts-ignore
        character.hairStyle = this.getHairStyle();
        // @ts-ignore
        character.hairColor = this.getHairColor();
        // @ts-ignore
        character.face = this.getFace();
        character.items = this._createItems(character.items);

        // @ts-ignore
        this._player.addCharacter(character.getData());
        charactersData = this._player.getCharacters();

        for (let i = 0; i < charactersData.length; i++) {
          // TODO ts
          charactersList.push((new Character(charactersData[i]) as unknown as Player));
        }

        this._player.sendPacket(new CharacterCreateSuccess());
        this._player.sendPacket(new CharacterSelectInfo(charactersList, this._player));
      } else {
        this._player.sendPacket(new CharacterCreateFail(base.errors.gameserver.REASON_NAME_ALREADY_EXISTS));
      }
    } else {
      this._player.sendPacket(new CharacterCreateFail(base.errors.gameserver.REASON_16_ENG_CHARS));
    }
  }

  getName(): string {
    return this._data.getData()[1];
  }

  getRace() {
    return this._data.getData()[2];
  }

  getGender() {
    return this._data.getData()[3];
  }

  getClassId(): string {
    return this._data.getData()[4];
  }

  getHairStyle() {
    return this._data.getData()[11];
  }

  getHairColor() {
    return this._data.getData()[12];
  }

  getFace() {
    return this._data.getData()[13];
  }

  _createItems(itemsId: number[]) {
    let data = [];

    for (let i = 0; i < itemsId.length; i++) {
      data.push(Items.getInstance().create(itemsId[i]));
    }

    return data;
  }

  _checkNameIsExist(name: string) {
    let names = this._player.getCharacterNames();

    for (let i = 0; i < names.length; i++) {
      if (names[i].toLowerCase() === name.toLowerCase()) {
        return false;
      }
    }

    return true;
  }

  _isAlphaNumeric(string: string) {
    let charCode;

    for (let i = 0; i < string.length; i++) {
      charCode = string[i].charCodeAt(0);

      if (!(charCode > 47 && charCode < 58) && // numeric (0-9)
        !(charCode > 64 && charCode < 91) && // upper alpha (A-Z)
        !(charCode > 96 && charCode < 123)) { // lower alpha (a-z)
        return false;
      }
    }

    return true;
  }

  _serialization(data: any[]) {
    let result: { [name: number]: any } = {};

    for (let i = 0; i < data.length; i++) {
      result[data[i].classId] = data[i];
    }

    return result;
  }
}
