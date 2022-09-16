import {BasePacket} from "./basePacket";
import {ItemList} from '../serverPackets/itemList';

export class RequestItemList extends BasePacket {

	protected readData() {
		this._data.readC();
	}

	init() {
		this._player.sendPacket(new ItemList(this._player, true));
	}
}
