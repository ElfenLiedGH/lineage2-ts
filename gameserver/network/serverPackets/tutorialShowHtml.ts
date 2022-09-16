import {BasePacket} from "./basePacket";

export class TutorialShowHtml extends BasePacket {
  constructor(html: string) {
    super(1 + BasePacket.strlen(html));
    this.writeC(0xb9)
      .writeS(html);
  }
}
