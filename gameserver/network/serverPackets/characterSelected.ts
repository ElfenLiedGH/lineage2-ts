import {BasePacket} from "./basePacket";
import {Player} from "../../models/actor/player";

export class CharacterSelected extends BasePacket {
	constructor(character: Player) {
		super(230 + BasePacket.strlen(character.name) + BasePacket.strlen(character.title));
		this.writeC(0x21)
			.writeS(character.name)
			.writeD(character.getObjectId())
			.writeS(character.title)
			.writeD(0x55555555)
			.writeD(character.clanId)
			.writeD(0x00)
			.writeD(character.gender)
			.writeD(character.raceId)
			.writeD(character.classId)
			.writeD(0x01)
			.writeD(character.location.x)
			.writeD(character.location.y)
			.writeD(character.location.z)
			.writeF(character.hp)
			.writeF(character.mp)
			.writeD(character.sp)
			.writeD(character.exp)
			.writeD(character.level)
			.writeD(0x0)
			.writeD(0x0)
			.writeD(character.int)
			.writeD(character.str)
			.writeD(character.con)
			.writeD(character.men)
			.writeD(character.dex)
			.writeD(character.wit);

		for (let i = 0; i < 30; i++) {
			this.writeD(0x00);
		}

		this.writeD(0x00); // in-game time
	}
}
