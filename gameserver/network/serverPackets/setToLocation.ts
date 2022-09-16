import {BasePacket} from "./basePacket";
import {Point} from "../../common/point";

export class SetToLocation extends BasePacket {

  constructor(objectId: number, heading: number, location: Point) {
    super(19);

    this.writeC(0x76)
      .writeD(objectId)
      .writeD(location.x)
      .writeD(location.y)
      .writeD(location.z)
      .writeH(heading) // if this is 01 then 3 more values are transmitted. but it does not seem to have any effect
  }
}
