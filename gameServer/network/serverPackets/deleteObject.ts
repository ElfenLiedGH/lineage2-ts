import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

export class DeleteObject extends BasePacket {
  constructor(objectId: number) {
    super(5);
    this.writeC(0x1e)
      .writeD(objectId);
  }
}
