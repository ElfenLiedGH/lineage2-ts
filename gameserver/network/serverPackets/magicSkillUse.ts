import {BasePacket} from "./basePacket";
import {Player} from "../../models/actor/player";

export class MagicSkillUse extends BasePacket {
  constructor(player: Player, skill: any) {
    super(39);
    this.writeC(0x5a)
      .writeD(player.getObjectId())
      .writeD(player.getTarget()!.getObjectId())
      .writeD(skill.id)
      .writeD(skill.level)
      .writeD(skill.hitTime)
      .writeD(skill.reuseDelay)
      .writeD(player.location.x)
      .writeD(player.location.y)
      .writeD(player.location.z)
      .writeH(0x00);
  }
}
