import {BasePacket} from "./basePacket";
import {Point} from "../../common/point";

const typesHits = {
  soulshot: 16,
  critical: 32,
  miss: 128
}

export class Attack extends BasePacket {

  constructor(attackerId: number, defenderId: number, damage: number, miss: boolean, critical: boolean, soulshot: boolean, location: Point) {
    super(23);
    let hit = 0;
    if (soulshot) {
      hit += typesHits.soulshot;
    }
    if (critical) {
      hit += typesHits.critical;
    }
    if (miss) {
      hit += typesHits.miss;
    }

    this.writeC(0x06)
      .writeD(attackerId)
      .writeD(defenderId)
      .writeD(damage)
      .writeC(hit)
      .writeD(location.x)
      .writeD(location.y)
      .writeD(location.z)
      .writeH(0) // if this is 01 then 3 more values are transmitted. but it does not seem to have any effect
  }
}
