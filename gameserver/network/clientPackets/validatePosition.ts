import {BasePacket} from "./basePacket";

export class ValidatePosition extends BasePacket {

	protected readData() {
		this._data.readC()
			.readD()
			.readD()
			.readD()
			.readD()
			.readD();
	}

	getX() {
		return this._data.getData()[1];
	}

	getY() {
		return this._data.getData()[2];
	}

	getZ() {
		return this._data.getData()[3];
	}

	getHeading() {
		return this._data.getData()[4];
	}

	init() {
		this._player.location.x = +this.getX();
		this._player.location.y = +this.getY();
		this._player.location.z = +this.getZ();
		this._player.heading = +this.getHeading();
	}
}
