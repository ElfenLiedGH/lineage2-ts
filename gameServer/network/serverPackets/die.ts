import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

export class Die extends BasePacket {
  constructor(
    objectId: number
  ) {
    super(29);
    this.writeC(0x0b)
      .writeD(objectId)
      .writeD(1)
      .writeD(1)
      .writeD(1)
      .writeD(1)
      .writeD(0)
      .writeD(1)
  }
}
