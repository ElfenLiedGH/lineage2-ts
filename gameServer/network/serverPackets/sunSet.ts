import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

export class SunSet extends BasePacket {
	constructor() {
		super(1);
		this.writeC(0x29);
	}
}
