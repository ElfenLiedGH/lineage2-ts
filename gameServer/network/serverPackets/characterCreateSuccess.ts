import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

export class CharacterCreateSuccess extends BasePacket {
  constructor() {
    super(5);
    this.writeC(0x25)
      .writeD(0x01);
  }
}
