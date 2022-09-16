import {BasePacket} from "./basePacket";

import {SkillList} from '../serverPackets/skillList';

export class RequestSkillList extends BasePacket {

	protected readData() {
		this._data.readC();
	}

	init() {
		this._player.sendPacket(new SkillList(this._player));
	}
}
