import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

let types = {
  TEXT: 0,
  NUMBER: 1,
  NPC_NAME: 2,
  ITEM_NAME: 3,
  SKILL_NAME: 4
}

export class SystemMessage extends BasePacket {
  constructor(messageId: number, messages: any[]) {
    super(9 + (8 * messages.length));
    this.writeC(0x7a)
      .writeD(messageId)
      .writeD(messages.length)

    for (let i = 0; i < messages.length; i++) {
      let type = messages[i].type;

      this.writeD(type);

      switch (type) {
        case types.TEXT:
          this.writeS(messages[i].value);

          break;
        case types.NUMBER:
        case types.NPC_NAME:
        case types.ITEM_NAME:
          this.writeD(messages[i].value);

          break;
        case types.SKILL_NAME:
          this.writeD(messages[i].value)
            .writeD(0x01); //

          break;
      }
    }
  }
}
