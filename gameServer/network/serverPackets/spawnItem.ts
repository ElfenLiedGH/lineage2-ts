import {BasePacket} from "@gameServer/network/serverPackets/basePacket";
import {Point} from "../../../types/point";

export class SpawnItem extends BasePacket {
  constructor(objectId: number, itemId: number, location: Point) {
    super(29);
    this.writeC(0x15)
      .writeD(objectId)
      .writeD(itemId)
      .writeD(location.x)
      .writeD(location.y)
      .writeD(location.z)
      .writeD(0) // is a stackable
      .writeD(1) // item count ?
  }
}
