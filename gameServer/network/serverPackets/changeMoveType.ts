import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

export class ChangeMoveType extends BasePacket {
  constructor(objectId: number, moveType: number) {
    super(9);
    this.writeC(0x3e)
      .writeD(objectId)
      .writeD(moveType);
  }
}
