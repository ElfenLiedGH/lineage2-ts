import {BasePacket} from "./basePacket";
import {Player} from "../../models/actor/player";

export class MagicSkillLaunched extends BasePacket {
  constructor(player: Player, skill: any) {
    super(21);
    this.writeC(0x8e)
      .writeD(player.getObjectId())
      .writeD(skill.id)
      .writeD(skill.level)
      .writeD(1) // 1 - ok, 0 - fail
      .writeD(player.getTarget()!.getObjectId())
  }
}
