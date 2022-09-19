import {BasePacket} from "./basePacket";
import {SocialAction} from '../serverPackets/socialAction';

export class RequestSocialAction extends BasePacket {

	protected readData() {
		this._data.readC()
			.readD();
	}

	getActionId() {
		return this._data.getData()[1];
	}

	init() {
		let actionId = +this.getActionId();

		this._player.sendPacket(new SocialAction(this._player.getObjectId(), actionId));
		this._player.broadcast(new SocialAction(this._player.getObjectId(), actionId));
	}

}
