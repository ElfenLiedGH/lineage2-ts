import {BasePacket} from "./basePacket";
import {CreateSay} from "../serverPackets/createSay";

let ALL = 0;
let SHOUT = 1;
let TELL = 2;
let PARTY = 3;
let CLAN = 4;
let PRIVATE_CHAT_PLAYER = 6; // used for petition
let PRIVATE_CHAT_GM = 7; // used for petition
let TRADE = 8;
let GM_MESSAGE = 9;
let ANNOUNCEMENT = 10;

export class Say2 extends BasePacket {

  protected readData() {
    this._data.readC()
      .readS()
      .readD();
  }

  getText() {
    return this._data.getData()[1];
  }

  getType() {
    return this._data.getData()[2];
  }

  getTarget() {
    return this._data.getData()[3];
  }

  init() {
    let text = this.getText();
    if (text === '.test') {
      text = JSON.stringify(this._player.toSaveObject())
    }
    this._player.sendPacket(new CreateSay(this._player.getObjectId(), this._player.getName(), +this.getType(), text));
    this._player.broadcast(new CreateSay(this._player.getObjectId(), this._player.getName(), +this.getType(), this.getText()));
  }
}
