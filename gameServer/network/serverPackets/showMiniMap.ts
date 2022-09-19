import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

export class ShowMiniMap extends BasePacket {
	constructor(id:number) {
		super(5);
		this.writeC(0xb6)
			.writeD(id);
	}
}
