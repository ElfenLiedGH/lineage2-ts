import {BasePacket} from "./basePacket";

export class CharacterCreateFail extends BasePacket {
  constructor(reason: number) {
    super(5);
    this.writeC(0x26)
      .writeD(reason);
  }
}
