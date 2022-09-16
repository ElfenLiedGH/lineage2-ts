import {BasePacket} from "./basePacket";

export class SetupGauge extends BasePacket {
	constructor(color:number, time:number) {
		super(9);
		this.writeC(0x85)
			.writeD(color)
			.writeD(time);
	}
}
