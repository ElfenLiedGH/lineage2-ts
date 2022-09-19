import {BasePacket} from "@gameServer/network/serverPackets/basePacket";
import {Point} from "../../../types/point";

export class StopMoveWithLocation extends BasePacket {
  constructor(objectId: number, location: Point) {
    super(17);
    this.writeC(0x5f)
      .writeD(objectId)
      .writeD(location.x)
      .writeD(location.y)
      .writeD(location.z)
  }
}
