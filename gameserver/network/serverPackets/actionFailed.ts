import {BasePacket} from "./basePacket";

export class ActionFailed extends BasePacket {
  constructor() {
    super(1);
    this.writeC(0x35)
  }
}
