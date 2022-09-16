import {ClientPacket} from "./clientPacket";
import {Packet} from "../../packet";
import {Player} from "../../models/actor/player";
import debug from 'debug';
const log = debug('game-server:network:client-packets')

export abstract class BasePacket {

  protected _data: ClientPacket;

  constructor(
    protected _packet: Packet,
    protected _player: Player) {
    this._data = new ClientPacket(this._packet);
    this.readData();
    this.init();
    log(`init: ${this.constructor.name} ${this._player.name}`)
  }

  protected abstract readData(): void

  protected abstract init(): void
}
