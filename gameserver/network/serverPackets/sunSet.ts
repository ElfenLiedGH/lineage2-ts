import {BasePacket} from "./basePacket";

export class SunSet extends BasePacket {
	constructor() {
		super(1);
		this.writeC(0x29);
	}
}
