import {BasePacket} from "./basePacket";

export class AutoAttackStop extends BasePacket {
  constructor(objectId: number) {
    super(5);
    this.writeC(0x3c)
      .writeD(objectId)

  }

}
