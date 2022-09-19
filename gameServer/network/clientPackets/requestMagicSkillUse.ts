import {BasePacket} from "./basePacket";
import {MagicSkillUse} from '../serverPackets/magicSkillUse';
import {MagicSkillLaunched} from '../serverPackets/magicSkillLaunched';
import {SetupGauge} from '../serverPackets/setupGauge';

export class RequestMagicSkillUse extends BasePacket {

	protected readData() {
		this._data.readC()
			.readD()
			.readD()
			.readC();
	}

	getSkillId() {
		return this._data.getData()[1];
	}

	init() {
		let skill = this._player.getSkill(+this.getSkillId());
		let gauge = {
			blue: 0,
			red: 1,
			cyan: 2
		}

		this._player.sendPacket(new MagicSkillUse(this._player, skill));
		this._player.sendPacket(new MagicSkillLaunched(this._player, skill));
		this._player.sendPacket(new SetupGauge(gauge.blue, skill.hitTime));
	}
}
