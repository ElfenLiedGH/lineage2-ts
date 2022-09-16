import {BasePacket} from "./basePacket";

export class QuestList extends BasePacket {
	constructor() {
		super(5);
		this.writeC(0x98)
			.writeH(0x00)
			.writeH(0x00);
	}
}
