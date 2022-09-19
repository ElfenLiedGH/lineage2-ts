import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

export class ActionFailed extends BasePacket {
  constructor() {
    super(1);
    this.writeC(0x35)
  }
}
