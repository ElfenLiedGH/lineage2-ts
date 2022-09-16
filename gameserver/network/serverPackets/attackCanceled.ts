import {BasePacket} from "./basePacket";

export class AttackCanceled extends BasePacket {

  constructor(objectId: number) {
    super(5);
    this.writeC(0x0a)
    this.writeD(objectId)
  }
}

module.exports = AttackCanceled;
