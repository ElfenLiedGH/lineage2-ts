import {BasePacket} from "./basePacket";

export class RequestBypassToServer extends BasePacket {

	protected readData() {
		this._data.readC()
			.readS()
	}

	getCommand() {
		return this._data.getData()[1];
	}

	init() {
		let command = this.getCommand();
	}
}
