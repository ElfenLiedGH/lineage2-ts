import {BasePacket} from "@gameServer/network/serverPackets/basePacket";
import {Point} from "../../../types/point";

export class RadarControl extends BasePacket {
	constructor(showRadar:number, type:number, location:Point) {
		super(21);
		this.writeC(0xbd)
			.writeD(showRadar)
			.writeD(type)
			.writeD(location.x)
			.writeD(location.y)
			.writeD(location.z)
	}
}
