import {BasePacket} from "./basePacket";
import {Point} from "../../common/point";

export class ChangeWaitType extends BasePacket {
  constructor(objectId: number, waitType: number, location: Point) {
    super(21);
    this.writeC(0x3f)
      .writeD(objectId)
      .writeD(waitType)
      .writeD(location.x)
      .writeD(location.y)
      .writeD(location.z);
  }
}
