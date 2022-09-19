import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

export class ShowBoard extends BasePacket {
  constructor(html: string) {
    super(1 + BasePacket.strlen(html) + BasePacket.strlen("") + BasePacket.strlen("") + BasePacket.strlen("") + BasePacket.strlen("") + BasePacket.strlen("") + BasePacket.strlen(""));
    this.writeC(0x86)
      .writeS("") // top
      .writeS("") // up
      .writeS("") // favorite
      .writeS("") // add favorite
      .writeS("") // region
      .writeS("") // clan
      .writeS(html);
  }
}
