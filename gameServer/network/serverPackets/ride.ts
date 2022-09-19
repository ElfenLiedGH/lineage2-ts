import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

export class Ride extends BasePacket {
	constructor(objectId:number) {
		super(17);
		this.writeC(0x9f)
			.writeD(objectId)
			.writeD(1) // 1 for mount ; 2 for dismount
			.writeD(2) // 1 for Strider ; 2 for wyvern
			.writeD(12621 + 1000000) // npcID
	}
}
