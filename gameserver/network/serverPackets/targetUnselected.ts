import {BasePacket} from "./basePacket";
import {Point} from "../../common/point";

export class TargetUnselected extends BasePacket {
	constructor(objectId:number, location:Point) {
		super(21);
		this.writeC(0x3a)
			.writeD(objectId)
			.writeD(location.x)
			.writeD(location.y)
			.writeD(location.z)
			.writeD(objectId);
	}
}
