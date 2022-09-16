import {BasePacket} from "./basePacket";


import {base} from '../../../config/config'
import {CharacterSelectInfo} from '../serverPackets/characterSelectInfo'
import {AuthLoginFail} from '../serverPackets/authLoginFail';
import {Character} from '../../templates/Character'
import {Player} from "../../models/actor/player";

export class RequestAuthLogin extends BasePacket {

  protected readData() {
    this._data.readC()
      .readS()
      .readD()
      .readD()
      .readD()
      .readD();
  }

  getLogin() {
    return this._data.getData()[1];
  }

  getSessionKey1(): [string, string] {
    let sessionKey1: [string, string] = ['', '']

    // TODO ts
    sessionKey1[0] = (this._data.getData()[4] as unknown as number).toString(16);
    sessionKey1[1] = (this._data.getData()[5] as unknown as number).toString(16);

    return sessionKey1;
  }

  getSessionKey2(): [string, string] {
    let sessionKey2: [string, string] = ['', ''];

    sessionKey2[0] = (this._data.getData()[3] as unknown as number).toString(16);
    sessionKey2[1] = (this._data.getData()[2] as unknown as number).toString(16);

    return sessionKey2;
  }

  init() {
    let sessionKey1Client = this.getSessionKey1();
    let sessionKey2Client = this.getSessionKey2();
    let charactersList = [];
    let charactersData;

    this._player.login = this.getLogin();
    charactersData = this._player.getCharacters();

    for (let i = 0; i < charactersData.length; i++) {
      // TODO ts
      charactersList.push((new Character(charactersData[i]) as unknown as Player));
    }

    if (this._packet.keyComparison(this._packet.getSessionKey1Server(), sessionKey1Client) && this._packet.keyComparison(this._packet.getSessionKey2Server(), sessionKey2Client)) {
      // Загружать из БД список персонажей
      this._player.sendPacket(new CharacterSelectInfo(charactersList, this._player));
    } else {
      this._player.sendPacket(new AuthLoginFail(base.errors.gameserver.REASON_SYSTEM_ERROR));
    }
  }
}
