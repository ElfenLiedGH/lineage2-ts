import {BasePacket} from "@gameServer/network/serverPackets/basePacket";
import {Player} from "../../models/actor/player";
import {Character} from "@gameServer/models/actor/character";

export class CharacterSelected extends BasePacket {
	constructor(character: Character | Player) {
		super(230 + BasePacket.strlen(character.getName()) + BasePacket.strlen(character.title));
		this.writeC(0x21)
			.writeS(character.getName())
			.writeD(character.getObjectId())
			.writeS(character.title)
			.writeD(0x55555555)
			.writeD(character.getClanId() ?? 0)
			.writeD(0x00)
			.writeD(character.getSex())
			.writeD(character.getRaceId())
			.writeD(character.getClassId())
			.writeD(0x01)
			.writeD(character.getLocation().x)
			.writeD(character.getLocation().y)
			.writeD(character.getLocation().z)
			.writeF(character.getHp())
			.writeF(character.getMp())
			.writeD(character.getSp())
			.writeD(character.getExp())
			.writeD(character.getLvl())
			.writeD(0x0)
			.writeD(0x0)
			.writeD(character.getInt())
			.writeD(character.getStr())
			.writeD(character.getCon())
			.writeD(character.getMen())
			.writeD(character.getDex())
			.writeD(character.getWit());

		for (let i = 0; i < 30; i++) {
			this.writeD(0x00);
		}

		this.writeD(0x00); // in-game time
	}
}
