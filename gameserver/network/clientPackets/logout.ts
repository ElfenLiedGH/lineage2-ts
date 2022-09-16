import {BasePacket} from "./basePacket";

import {LogoutOk} from '../serverPackets/logoutOk'
import {DeleteObject} from '../serverPackets/deleteObject'
let XOR = require("./../../../util/XOR");
import {base} from '../../../config/config'
export class Logout extends BasePacket {

	protected readData() {
		this._data.readC();
	}

	init() {
		this._player.xor = new XOR(base.key.XOR);
		this._packet.setEncryption(false);
		this._player.sendPacket(new LogoutOk());
		this._player.broadcast(new DeleteObject(this._player.getObjectId()));
	}
}
