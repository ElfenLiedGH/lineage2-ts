import {BasePacket} from "./basePacket";
import {CreateSay} from "../serverPackets/createSay";
import {SetToLocation} from "@gameServer/network/serverPackets/setToLocation";

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
    if (text.search(/\.loc/) !== -1) {
      console.log('chg location')
      const point = text.replace('.loc ', '').split(' ').map(el => +el)
      if (point.length === 3) {
        console.log('change', point)
        this._player.sendPacket(new SetToLocation(this._player.getObjectId(), 0, {
          x: point[0],
          y: point[1],
          z: point[2]
        }))
      }

    }
    this._player.sendPacket(new CreateSay(this._player.getObjectId(), this._player.getName(), +this.getType(), text));
    this._player.broadcast(new CreateSay(this._player.getObjectId(), this._player.getName(), +this.getType(), this.getText()));
  }
}
