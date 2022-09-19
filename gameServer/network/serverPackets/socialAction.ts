import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

export class SocialAction extends BasePacket {
	constructor(objectId:number, actionId:number) {
		super(9);
		this.writeC(0x3d)
			.writeD(objectId)
			.writeD(actionId);
	}
}
