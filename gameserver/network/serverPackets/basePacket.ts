// writeC - 1 byte
// writeH - 2 byte
// writeD - 4 byte
// writeF - 8 byte
// writeS - string
import debug from 'debug';

const log = debug('game-server:network:server-packets')

export class BasePacket {

  private _offset = 0;
  private readonly _buffer: Buffer;

  constructor(private size: number) {
    this._buffer = Buffer.alloc(size + 4 + (size + 4) % 8); // (size + 4) % 8 - checksum. the packet is a multiple of 8.
    log(`init: ${this.constructor.name}`)
  }

  writeC(value: number) {
    this._buffer.writeUInt8(value, this._offset);
    this._offset++;

    return this;
  }

  writeH(value: number) {
    this._buffer.writeUInt16LE(value, this._offset);
    this._offset += 2;

    return this;
  }

  writeD(value: number) {
    this._buffer.writeInt32LE(value, this._offset);
    this._offset += 4;

    return this;
  }

  writeF(value: number) {
    this._buffer.writeDoubleLE(value, this._offset);
    this._offset += 8;

    return this;
  }

  writeS(string: string) {
    this._buffer.write(string, this._offset, "ucs2");
    this._offset += Buffer.byteLength(string, "ucs2") + 2;
    this._buffer.writeInt16LE(0, this._offset - 2);

    return this;
  }

  getBuffer() {
    return this._buffer;
  }

  static strlen(str: string): number {
    return Buffer.byteLength(str, "ucs2") + 2;
  }
}
