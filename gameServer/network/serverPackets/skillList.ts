import {BasePacket} from "@gameServer/network/serverPackets/basePacket";
import {Player} from "../../models/actor/player";

export class SkillList extends BasePacket {
	constructor(player:Player) {
		super(5 + (12 * player.skills.length));
		this.writeC(0x6d)
			.writeD(player.skills.length)

		for(let i = 0; i < player.skills.length; i++) {
			this.writeD(player.skills[i].passive)
				.writeD(player.skills[i].level)
				.writeD(player.skills[i].id);
		}
	}
}
