import {BasePacket} from "@gameServer/network/serverPackets/basePacket";

export interface CharacterTemplate {
	raceId: number;
	classId: number;
	str: number;
	dex: number;
	con: number;
	int: number;
	wit: number;
	men: number;
}

export class CharacterTemplates extends BasePacket {
	constructor(characterTemplates: CharacterTemplate[]) {
		super(85 * characterTemplates.length);
		this.writeC(0x23)
			.writeD(characterTemplates.length)

		for(let i = 0; i < characterTemplates.length; i++) {
			this.writeD(characterTemplates[i].raceId)
				.writeD(characterTemplates[i].classId)
				.writeD(0x46)
				.writeD(characterTemplates[i].str)
				.writeD(0x0a)
				.writeD(0x46)
				.writeD(characterTemplates[i].dex)
				.writeD(0x0a)
				.writeD(0x46)
				.writeD(characterTemplates[i].con)
				.writeD(0x0a)
				.writeD(0x46)
				.writeD(characterTemplates[i].int)
				.writeD(0x0a)
				.writeD(0x46)
				.writeD(characterTemplates[i].wit)
				.writeD(0x0a)
				.writeD(0x46)
				.writeD(characterTemplates[i].men)
				.writeD(0x0a);
		}
	}
}
