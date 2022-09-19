import {BasePacket} from "./basePacket";
import {QuestList} from '../serverPackets/questList';

export class RequestQuestList extends BasePacket {

	protected readData() {
		this._data.readC();
	}

	init() {
		this._player.sendPacket(new QuestList(/* database - quests */));
	}
}
