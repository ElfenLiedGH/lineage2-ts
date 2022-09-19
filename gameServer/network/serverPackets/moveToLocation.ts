import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

export class MoveToLocation extends BasePacket {
	constructor(positions: any, objectId: number) {
		super(29);
		this.writeC(0x01)
			.writeD(objectId)
			.writeD(positions.target.x)
			.writeD(positions.target.y)
			.writeD(positions.target.z)
			.writeD(positions.origin.x)
			.writeD(positions.origin.y)
			.writeD(positions.origin.z)
	}
}
