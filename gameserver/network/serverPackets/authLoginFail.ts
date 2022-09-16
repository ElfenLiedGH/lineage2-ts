import {BasePacket} from "./basePacket";

export class AuthLoginFail extends BasePacket {
  constructor(reason: number) {
    super(2);
    this.writeC(0x12)
      .writeC(reason);
  }
}
