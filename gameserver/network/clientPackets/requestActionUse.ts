import {BasePacket} from "./basePacket";
import {ChangeWaitType} from '../serverPackets/changeWaitType'
import {ChangeMoveType} from '../serverPackets/changeMoveType'

export class RequestActionUse extends BasePacket {

  protected readData() {
    this._data.readC()
      .readD()
      .readD()
      .readC()
  }

  getActionId(): number {
    return +this._data.getData()[1];
  }

  getCtrlStatus() {
    return this._data.getData()[2];
  }

  getShiftStatus() {
    return this._data.getData()[3];
  }

  init() {
    switch (this.getActionId()) {
      case 0:
        if (this._player.isStanding()) {
          this._player.sitDown();
        } else {
          this._player.standUp();
        }

        this._player.sendPacket(new ChangeWaitType(this._player.getObjectId(), this._player.getWaitType(), this._player.location));
        this._player.broadcast(new ChangeWaitType(this._player.getObjectId(), this._player.getWaitType(), this._player.location));

        break;
      case 1:
        if (this._player.isRunning()) {
          this._player.walk();
        } else {
          this._player.run();
        }

        this._player.sendPacket(new ChangeMoveType(this._player.getObjectId(), this._player.getMoveType()));
        this._player.broadcast(new ChangeMoveType(this._player.getObjectId(), this._player.getMoveType()));
    }
  }
}
