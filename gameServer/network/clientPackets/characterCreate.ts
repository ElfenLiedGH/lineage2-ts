import {base} from '../../../config/config'
import {Character} from '@gameServer/models/actor/character'
import {BasePacket} from "./basePacket";
import {CharacterCreateFail} from '../serverPackets/characterCreateFail'
import {CharacterCreateSuccess} from '../serverPackets/characterCreateSuccess'
import {CharacterSelectInfo} from '../serverPackets/characterSelectInfo'
import {Items} from '../../items'
import {CharacterDb} from "@gameServer/db/character";

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
    let characterQuantity = CharacterDb.getCharacters(this._player.getLogin()).length;
    let MAXIMUM_QUANTITY_CHARACTERS = 7;

    if (characterQuantity === MAXIMUM_QUANTITY_CHARACTERS) {
      this._player.sendPacket(new CharacterCreateFail(base.errors.gameserver.REASON_TOO_MANY_CHARACTERS));

      return false;
    }

    if (name.length <= 16 && this._isAlphaNumeric(name)) {
      if (this._checkNameIsExist(name)) {

        // TODO ts
        // @ts-ignore

        // character.items = this._createItems(character.items || []);

        CharacterDb.addCharacter({
          login: this._packet.getLogin(),
          classId: +this.getClassId(),
          name: this.getName(),
          hairStyle: +this.getHairStyle(),
          hairColor: +this.getHairColor(),
          face: +this.getFace(),
          raceId: +this.getRace(),
          sex:+ this.getSex()
        });
        const charactersData = CharacterDb.getCharacters(this._packet.getLogin()).map((el, slot) => {
          const accountCharacter = new Character();
          accountCharacter.fillDefaultData(this._packet.getLogin(), slot)
          return accountCharacter;
        });

        this._player.sendPacket(new CharacterCreateSuccess());
        this._player.sendPacket(new CharacterSelectInfo(charactersData));
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

  getSex() {
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
    let names = CharacterDb.getCharacterNames();

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
