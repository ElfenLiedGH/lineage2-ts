import {BasePacket} from "./basePacket";
import {TargetUnselected} from '../serverPackets/targetUnselected';

export class RequestTargetCancel extends BasePacket {

  protected readData() {
    this._data.readC();
  }

  init() {
    this._player.setTarget();
    this._player.sendPacket(new TargetUnselected(this._player.getObjectId(), this._player.location));
  }
}
