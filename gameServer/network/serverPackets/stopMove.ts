import {BasePacket} from "@gameServer/network/serverPackets/basePacket";
import {Point} from "../../../types/point";

export class StopMove extends BasePacket {
  constructor(objectId: number, location: Point) {
    super(21);
    this.writeC(0x59)
      .writeD(objectId)
      .writeD(location.x)
      .writeD(location.y)
      .writeD(location.z)
      .writeD(0) // heading
  }
}
