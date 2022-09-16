import {BasePacket} from "./basePacket";

export class CreateSay extends BasePacket {
	constructor(objectId: number, name:string, type:number, message: string) {
		super(9 + BasePacket.strlen(name) + BasePacket.strlen(message));
		this.writeC(0x5d)
			.writeD(objectId)
			.writeD(type)
			.writeS(name)
			.writeS(message);
	}
}
