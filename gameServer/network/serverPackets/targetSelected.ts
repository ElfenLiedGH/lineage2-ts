import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

export class TargetSelected extends BasePacket {
	constructor(objectId:number, color=0) {
		super(1);
		this.writeC(0xbf)
			.writeD(objectId)
			.writeH(color);
	}
}
