import {BasePacket} from "./basePacket";
import {ShowBoard} from '../serverPackets/showBoard';
import {Html} from '../../html'

export class RequestShowBoard extends BasePacket {

  protected readData() {
    this._data.readC()
      .readD();
  }

  init() {
    this._player.sendPacket(new ShowBoard(Html.getInstance().get("tutorial_001")!));
  }
}
