import {BasePacket} from "./basePacket";

export class RequestAttack extends BasePacket {

  protected readData() {
    this._data.readC()
      .readD()
      .readD()
      .readD()
      .readD()
      .readC();
  }

  getObjectId() {
    return this._data.getData()[1];
  }

  getX() {
    return this._data.getData()[2];
  }

  getY() {
    return this._data.getData()[3];
  }

  getZ() {
    return this._data.getData()[4];
  }

  getAttackId() {
    return this._data.getData()[5]; // 0 for simple click, 1 for shift click
  }

  init() {
    this._player.startCombat();
  }
}
