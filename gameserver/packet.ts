import {Player} from "./models/actor/player";
import {NullableBuffer} from "../types/nullableBuffer";
import {NullableNumber} from "../types/nullableNumber";
import {log} from "../util/log";
import {ProtocolVersion} from "./network/clientPackets/protocolVersion";
import {RequestAuthLogin} from "./network/clientPackets/requestAuthLogin";
import {NewCharacter} from "./network/clientPackets/newCharacter";
import {Logout} from "./network/clientPackets/logout";
import {CharacterCreate} from "./network/clientPackets/characterCreate";
import {CharacterSelected} from "./network/clientPackets/characterSelected";
import {RequestQuestList} from "./network/clientPackets/requestQuestList";
import {EnterWorld} from "./network/clientPackets/enterWorld";
import {MoveBackwardToLocation} from "./network/clientPackets/moveBackwardToLocation";
import {RequestSocialAction} from "./network/clientPackets/requestSocialAction";
import {Say2} from "./network/clientPackets/say2";
import {StopMove} from "./network/clientPackets/stopMove";
import {RequestActionUse} from "./network/clientPackets/requestActionUse";
import {Action} from "./network/clientPackets/action";
import {RequestTargetCancel} from "./network/clientPackets/requestTargetCancel";
import {RequestItemList} from "./network/clientPackets/requestItemList";
import {RequestUseItem} from "./network/clientPackets/requestUseItem";
import {RequestSkillList} from "./network/clientPackets/requestSkillList";
import {ValidatePosition} from "./network/clientPackets/validatePosition";
import {RequestBypassToServer} from "./network/clientPackets/requestBypassToServer";
import {RequestMagicSkillUse} from "./network/clientPackets/requestMagicSkillUse";
import {RequestAttack} from "./network/clientPackets/requestAttack";
import {RequestShowBoard} from "./network/clientPackets/requestShowBoard";

export class Packet {
  private _sessionKey1Server: [number, number] = [0x55555555, 0x44444444];
  private _sessionKey2Server: [number, number] = [0x55555555, 0x44444444];
  private _encryption = false;
  private _encrypted: NullableBuffer = null;
  private _decrypted: NullableBuffer = null;
  private _opcode: NullableNumber = null;

  constructor(private _player: Player) {
  }

  setEncryption(value: boolean) {
    this._encryption = value;
  }

  getEncryption() {
    return this._encryption;
  }

  getBuffer() {
    return this._decrypted;
  }

  getSessionKey1Server() {
    return this._sessionKey1Server;
  }

  getSessionKey2Server() {
    return this._sessionKey2Server;
  }

  onData(data: string) {
    // this._encrypted = new Buffer.from(data, "binary").slice(2) // slice(2) - without first two byte responsible for packet size
    this._encrypted = Buffer.from(data, "binary").slice(2);
    //this._decrypted = new Buffer.from(this.getEncryption() ? this._player.xor.decrypt(this._encrypted) : this._encrypted);
    this._decrypted = Buffer.from(this._encrypted!);
    // log(this._encrypted); // for test
    this._opcode = this._decrypted![0]!;

    switch (this._opcode) {
      case 0x00:
        new ProtocolVersion(this, this._player);

        break;
      case 0x08:
        new RequestAuthLogin(this, this._player);

        break;
      case 0x0e:
        new NewCharacter(this, this._player);

        break;
      case 0x09:
        new Logout(this, this._player);

        break;
      case 0x0b:
        new CharacterCreate(this, this._player);

        break;
      case 0x0d:
        new CharacterSelected(this, this._player);

        break;
      case 0x63:
        new RequestQuestList(this, this._player);

        break;
      case 0x03:
        new EnterWorld(this, this._player);

        break;
      case 0x01:
        new MoveBackwardToLocation(this, this._player);

        break;
      case 0x1b:
        new RequestSocialAction(this, this._player);

        break;
      case 0x38:
        new Say2(this, this._player);

        break;
      case 0x36:
        new StopMove(this, this._player);

        break;
      case 0x45:
        new RequestActionUse(this, this._player);

        break;
      case 0x04:
        new Action(this, this._player);

        break;
      case 0x37:
        new RequestTargetCancel(this, this._player);

        break;
      case 0x0f:
        new RequestItemList(this, this._player);

        break;
      case 0x14:
        new RequestUseItem(this, this._player);

        break;
      case 0x48:
        new ValidatePosition(this, this._player);

        break;
      case 0x3f:
        new RequestSkillList(this, this._player);

        break;
      case 0x2f:
        new RequestMagicSkillUse(this, this._player);

        break;
      case 0x0a:
        new RequestAttack(this, this._player);

        break;
      case 0x57:
        new RequestShowBoard(this, this._player);

        break;
      case 0x21:
        new RequestBypassToServer(this, this._player);

        break;
      default: {
        console.log('this._encrypted not found', this._encrypted, this._opcode)
      }
    }


  }

  keyComparison(keyServer: [number, number], keyClient: [string, string]) {
    // return keyServer[0] === parseInt(keyClient[0], 16) && keyServer[1] === parseInt(keyClient[1], 16);
    return keyServer[0] === +keyClient[0] && keyServer[1] === +keyClient[1];
  }

  onClose() {
    log(`Connection to the game server is closed for: ${this._player.socket.remoteAddress}:${this._player.socket.remotePort}`);
  }

  onError() {
    log(`Client connection lost for: ${this._player.socket.remoteAddress}:${this._player.socket.remotePort}`);
  }
}
