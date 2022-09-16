import {BasePacket} from "./basePacket";

export class AutoAttackStart extends BasePacket {
  constructor(objectId: number) {
    super(5);
    this.writeC(0x3b)
      .writeD(objectId)
  }
}
