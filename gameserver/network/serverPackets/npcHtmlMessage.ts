import {BasePacket} from "./basePacket";

export class NpcHtmlMessage extends BasePacket {
	constructor(html: string) {
		super(5 + BasePacket.strlen(html));
		this.writeC(0x1b)
			.writeD(1) // message id
			.writeS(html);
	}
}
