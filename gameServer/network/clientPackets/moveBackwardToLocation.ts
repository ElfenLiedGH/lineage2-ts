import {BasePacket} from "./basePacket";

import {MoveToLocation} from '../serverPackets/moveToLocation'
export class MoveBackwardToLocation extends BasePacket {

	protected readData() {this._data.readC()
		.readD()
		.readD()
		.readD()
		.readD()
		.readD()
		.readD();
	}


	getTargetX() {
		return this._data.getData()[1];
	}
	getTargetY() {
		return this._data.getData()[2];
	}
	getTargetZ() {
		return this._data.getData()[3];
	}
	getOriginX() {
		return this._data.getData()[4];
	}
	getOriginY() {
		return this._data.getData()[5];
	}
	getOriginZ() {
		return this._data.getData()[6];
	}

	init() {
		let positions = {
			target: {
				x: this.getTargetX(),
				y: this.getTargetY(),
				z: this.getTargetZ()
			},
			origin: {
				x: this.getOriginX(),
				y: this.getOriginY(),
				z: this.getOriginZ()
			}
		}

		this._player.sendPacket(new MoveToLocation(positions, this._player.getObjectId()));
		this._player.broadcast(new MoveToLocation(positions, this._player.getObjectId()));

		// TODO ts refactor
		// @ts-ignore
		this._player.location.x = +positions.target.x;
		// @ts-ignore
		this._player.location.y = +positions.target.y;
		// @ts-ignore
		this._player.location.z = +positions.target.z;
	}
}
