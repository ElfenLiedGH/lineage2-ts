import {BasePacket} from "./basePacket";


import {base} from '../../../config/config';
import {CryptInit} from '../serverPackets/cryptInit'
import debug from 'debug';

const log = debug('game-server:network:client-packets')

export class ProtocolVersion extends BasePacket {

  protected readData() {
    this._data.readC()
      .readD();
  }

  getVersion(): string {
    return this._data.getData()[1];
  }

  init() {
    if (this.getVersion() === base.PROTOCOL_VERSION.CLIENT.toString()) {
      this._player.sendPacket(new CryptInit(base.key.XOR), false);
      this._packet.setEncryption(true); // The first packet is not encrypted
    } else {
      log(`init: client version: ${this.getVersion()}, server version: ${base.PROTOCOL_VERSION.CLIENT.toString()}`)
    }
  }
}
