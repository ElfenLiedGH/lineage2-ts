import {BasePacket} from "@gameServer/network/serverPackets/basePacket";
import {Point} from "../../../types/point";

export class DropItem extends BasePacket {
  constructor(characterId: number, item: any, location: Point) {
    super(37);
    this.writeC(0x16)
      .writeD(characterId)
      .writeD(item.getObjectId())
      .writeD(item.itemId)
      .writeD(location.x + 20)
      .writeD(location.y + 20)
      .writeD(location.z)
      .writeD(0) // is a stackable
      .writeD(1) // item count ?
      .writeD(1) // unknow
  }
}
