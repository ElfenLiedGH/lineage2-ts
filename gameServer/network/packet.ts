import {Player} from "../models/actor/player";
import {NullableBuffer} from "../../types/nullableBuffer";
import {NullableNumber} from "../../types/nullableNumber";
import debug from 'debug';
import {ProtocolVersion} from "./clientPackets/protocolVersion";
import {RequestAuthLogin} from "./clientPackets/requestAuthLogin";
import {NewCharacter} from "./clientPackets/newCharacter";
import {Logout} from "./clientPackets/logout";
import {CharacterCreate} from "./clientPackets/characterCreate";
import {CharacterSelected} from "./clientPackets/characterSelected";
import {RequestQuestList} from "./clientPackets/requestQuestList";
import {EnterWorld} from "./clientPackets/enterWorld";
import {MoveBackwardToLocation} from "./clientPackets/moveBackwardToLocation";
import {RequestSocialAction} from "./clientPackets/requestSocialAction";
import {Say2} from "./clientPackets/say2";
import {StopMove} from "./clientPackets/stopMove";
import {RequestActionUse} from "./clientPackets/requestActionUse";
import {Action} from "./clientPackets/action";
import {RequestTargetCancel} from "./clientPackets/requestTargetCancel";
import {RequestItemList} from "./clientPackets/requestItemList";
import {RequestUseItem} from "./clientPackets/requestUseItem";
import {RequestSkillList} from "./clientPackets/requestSkillList";
import {ValidatePosition} from "./clientPackets/validatePosition";
import {RequestBypassToServer} from "./clientPackets/requestBypassToServer";
import {RequestMagicSkillUse} from "./clientPackets/requestMagicSkillUse";
import {RequestAttack} from "./clientPackets/requestAttack";
import {RequestShowBoard} from "./clientPackets/requestShowBoard";

const log = debug('game-server:packet')

export class Packet {
  private _sessionKey1Server: [number, number] = [0x55555555, 0x44444444];
  private _sessionKey2Server: [number, number] = [0x55555555, 0x44444444];
  private _encryption = false;
  private _decrypted: NullableBuffer = null;

  private login: string = '';
  public setLogin(login:string){
    this.login = login;
  }
  public getLogin(){
    return this.login
  }

  constructor(private _player: Player) {
  }

  setEncryption(value: boolean) {
    this._encryption = value;
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
    const _encrypted = Buffer.from(data, "binary").slice(2);
    this._decrypted = Buffer.from(_encrypted);
    const _opcode = this._decrypted![0]!;

    switch (_opcode) {
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
        log('this._encrypted not found', _encrypted, _opcode)
      }
    }


  }

  keyComparison(keyServer: [number, number], keyClient: [string, string]) {
    // return keyServer[0] === parseInt(keyClient[0], 16) && keyServer[1] === parseInt(keyClient[1], 16);
    return keyServer[0] === +keyClient[0] && keyServer[1] === +keyClient[1];
  }

  onClose() {
    log(`Connection to the game server is closed for: ${this._player.getSocket().remoteAddress}:${this._player.getSocket().remotePort}`);
  }

  onError() {
    log(`Client connection lost for: ${this._player.getSocket().remoteAddress}:${this._player.getSocket().remotePort}`);
  }
}
