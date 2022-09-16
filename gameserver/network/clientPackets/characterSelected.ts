import {BasePacket} from "./basePacket";

import {Character} from '../../templates/Character'


import {Items} from '../../items'

import {CharacterSelected as CharacterSelectedServer} from '../serverPackets/characterSelected'
import {Player} from "../../models/actor/player";

export class CharacterSelected extends BasePacket {


  protected readData() {
    this._data.readC()
      .readD();

  }

  init() {
    let characterData = this._player.getCharacters()[this.getCharacterSlot()];
    let character = new Character(characterData);
    console.log('character', character)
    this._player.fillData(character);
    this._player.characterSlot = +this.getCharacterSlot();
    this._player.online = true;
    // for test
    const items = Items.getInstance();
    this._player.items.push(items.create(400));
    this._player.items.push(items.create(420));
    this._player.items.push(items.create(2436));
    this._player.items.push(items.create(2460));
    this._player.items.push(items.create(233));
    this._player.items.push(items.create(78));
    this._player.items.push(items.create(2497));

    this._player.items.push(items.create(84));
    this._player.items.push(items.create(439));
    this._player.items.push(items.create(471));
    this._player.items.push(items.create(2430));
    this._player.items.push(items.create(2454));
    this._player.items.push(items.create(618));
    this._player.items.push(items.create(283));
    this._player.items.push(items.create(2392));
    this._player.items.push(items.create(2381));

    this._player.items.push(items.create(2406));
    this._player.items.push(items.create(2397));

    //etc
    this._player.items.push(items.create(57));
    this._player.items.push(items.create(1665));
    this._player.items.push(items.create(1863));
    this._player.items.push(items.create(3875));
    // quest
    this._player.items.push(items.create(3440));
    this._player.items.push(items.create(3444));
    this._player.items.push(items.create(3467));
    //

    // TODO ts
    this._player.sendPacket(new CharacterSelectedServer(character as unknown as Player));
  }

  getCharacterSlot() {
    return this._data.getData()[1];
  }
}
