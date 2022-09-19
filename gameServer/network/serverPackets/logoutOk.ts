import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

export class LogoutOk extends BasePacket {
	constructor() {
		super(1);
		this.writeC(0x96);
	}
}
