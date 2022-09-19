import {BasePacket} from "@gameServer/network/serverPackets/basePacket";
import {Player} from "../../models/actor/player";

export class MoveToPawn extends BasePacket {
  constructor(player: Player) {
    super(25);
    this.writeC(0x75)
      .writeD(player.objectId)
      .writeD(player.target)
      .writeD(36) // distance
      .writeD(player.x)
      .writeD(player.y)
      .writeD(player.z)
  }
}
