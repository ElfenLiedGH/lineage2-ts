import {Point} from "../../../types/point";
import {base} from '../../../config/config'
import {World} from '../../world'
import {XOR} from '../../../util/XOR'
import {Timer} from '../../utils/timer'

import debug from 'debug';

const log = debug('game-server:models:actor:player')

import {Character} from './character'
import {Socket} from 'net'
import {BasePacket} from "@gameServer/network/serverPackets/basePacket";
import {SetToLocation} from "@gameServer/network/serverPackets/setToLocation";
import {Attack} from "@gameServer/network/serverPackets/attack";
import {SystemMessage} from "@gameServer/network/serverPackets/systemMessage";
import {AutoAttackStart} from "@gameServer/network/serverPackets/autoAttackStart";
import {UserInfo} from "@gameServer/network/serverPackets/userInfo";
import {AutoAttackStop} from "@gameServer/network/serverPackets/autoAttackStop";
import {CharacterInfo} from "@gameServer/network/serverPackets/characterInfo";
import {TaskList} from "@gameServer/task/TaskList";
import {NpcInfo} from "@gameServer/network/serverPackets/npcInfo";
import {Npc} from "@gameServer/models/npc";

export enum PlayerTask {
  GET_VISIBLE_OBJECTS,
  COMBAT
}

export class Player extends Character {

  public xor = new XOR(base.key.XOR) || null;

  private online: boolean = false;

  public setInCombat(inCombat: boolean) {
    super.setInCombat(inCombat);
    if (inCombat) {
      this.sendPacket(new AutoAttackStart(this.getObjectId()));
      this.broadcast(new AutoAttackStart(this.getObjectId()));
    } else {
      this.sendPacket(new AutoAttackStop(this.getObjectId()));
      this.broadcast(new AutoAttackStart(this.getObjectId()));
    }
  }

  private taskReceiver = (task: PlayerTask) => {
    this[task]();
  }
  private tasks = new TaskList<PlayerTask>()
    .on('task', this.taskReceiver)

  private [PlayerTask.GET_VISIBLE_OBJECTS]() {
    this.getVisibleObjects(npc => {
      this.sendPacket(new NpcInfo(npc));
    })
    this.tasks.createTask(1000, PlayerTask.GET_VISIBLE_OBJECTS.toString())
  }

  private [PlayerTask.COMBAT]() {
    const target = this.getTarget();
    if (!target) {
      this.setInCombat(false);
      return;
    }
    if (!this.getInCombat()) {
      this.setInCombat(true);
    }
    const objectId = target.getObjectId();
    let attacks = {
      soulshot: Math.random() > 0.5,
      critical: Math.random() > 0.5,
      miss: Math.random() < 0.1
    }
    console.log(`Я ${this.getName()} бью ${objectId} ${target.getName()} ${JSON.stringify(attacks)}`)

    // this.sendPacket(new StatusUpdate(objectId, target.hp, target.maximumHp));
    // this.changeCombatStateTask();
    // this.changeFlagTask();
    this.sendPacket(new Attack(this.getObjectId(), objectId, 10, attacks.miss, attacks.critical, attacks.soulshot, this.getLocation()));
    this.sendPacket(new UserInfo(this));
    this.tasks.createTask(3000, PlayerTask.COMBAT.toString())
  }

  public setOnline(online: boolean) {
    this.online = online;
    if (online) {
      this.tasks.createTask(3000, PlayerTask.GET_VISIBLE_OBJECTS.toString())
    } else {
      this.tasks.deleteTasks();
      this.tasks.off('task', this.taskReceiver)
    }
  }

  public getOnline() {
    return this.online
  }

  public onlineTime = 0;

  public heading = 0
  public clanLeader = 0;
  public clanCrestId = 0;
  public allianceId = 0;
  public allianceCrestId = 0;
  public gm = 0; // 0 - false, 1 - true;
  public publicStoreType = 0;

  // states
  public _waitType = 1; // 0 - sit, 1 - stand
  public _moveType = 1; // 0 - walk, 1 - run
  public _inCombat = 0; // 0 - idle, 1 - combat


  public canCraft = 0;

  public privateStoreType = 0;


  public skills: any[] = [];


  public pvp = 0;
  public pk = 0;

  public _flag = {
    status: 0,
    display: 0
  };

  public items: any[] = [];

  // equipment
  public underwear = {objectId: 0, itemId: 0};
  public ear = {
    left: {objectId: 0, itemId: 0},
    right: {objectId: 0, itemId: 0}
  }
  public neck = {objectId: 0, itemId: 0};
  public finger = {
    left: {objectId: 0, itemId: 0},
    right: {objectId: 0, itemId: 0}
  }

  public head = {objectId: 0, itemId: 0};
  public hand = {
    left: {objectId: 0, itemId: 0},
    right: {objectId: 0, itemId: 0},
    leftAndRight: {objectId: 0, itemId: 0}
  }
  public gloves = {objectId: 0, itemId: 0};
  public chest = {objectId: 0, itemId: 0};
  public legs = {objectId: 0, itemId: 0};
  public feet = {objectId: 0, itemId: 0};
  public back = {objectId: 0, itemId: 0};
  public accessLevel = 0;

  public getSocket() {
    return this.socket
  }


  getWaitType() {
    return this._waitType;
  }

  isStanding() {
    return this._waitType === 1;
  }

  sitDown() {
    this._waitType = 0;
  }

  standUp() {
    this._waitType = 1;
  }

  getMoveType() {
    return this._moveType;
  }

  isRunning() {
    return this._moveType === 1;
  }

  walk() {
    this._moveType = 0;
  }

  run() {
    this._moveType = 1;
  }

  setCombatState(value: boolean) {
    this._inCombat = value ? 1 : 0;
  }

  getCombatState() {
    return this._inCombat;
  }

  getFlagDisplay() {
    return this._flag.display;
  }

  getItem(objectId: number) {
    return this.items.filter((item: any) => item.objectId === objectId)[0];
  }

  getLoad() {
    return this.items.reduce(function (weight: number, item: any) {
      return weight + item.weight
    }, 0);
  }

  constructor(private readonly socket: Pick<Socket, 'write'>) {
    super();
    log('new player')
  }

  setToLocation(newLocation: Point) {
    this.sendPacket(new SetToLocation(this.getObjectId(), 0, newLocation))
  }


  startCombat() {
    this.tasks.createTask(0, PlayerTask.COMBAT.toString())
  }

  // broadcast(packet:  Buffer) { // for test
  //     let packetLength =  Buffer.from([0x00, 0x00]);
  //     let players = world.getPlayers();
  //
  //     packetLength.writeInt16LE(packet.length + 2);
  //
  //     for (let i = 0; i < players.length; i++) {
  //         if (players[i].online && players[i].socket !== this.socket && !players[i].bot) {
  //             packet = Buffer.concat([packetLength, packet]);
  //             players[i].socket.write(packet);
  //         }
  //     }
  // }

  sendPacket(packet: BasePacket, encoding = false /* false for test */) {
    let packetLength = Buffer.from([0x00, 0x00]);
    let packetCopy = Buffer.from(packet.getBuffer());

    packetLength.writeInt16LE(packetCopy.length + 2);

    if (encoding) {
      let packetEncrypted = Buffer.from(this.xor.encrypt(packetCopy));

      packetEncrypted = Buffer.concat([packetLength, packetEncrypted]);
      this.socket.write(packetEncrypted);
    } else {
      const buffer = Buffer.concat([packetLength, packetCopy]);
      this.socket.write(buffer);

    }
  }

  broadcast(packet: BasePacket) {
    let packetLength = Buffer.from([0x00, 0x00]);
    let players = World.getInstance().getPlayers();
    const buffer = packet.getBuffer();
    packetLength.writeInt16LE(buffer.length + 2);

    players.forEach(player => {
      if (player.getOnline() && player.getSocket() !== this.getSocket()) {
        const socketBuffer = Buffer.concat([packetLength, buffer]); // for test
        //players[i].socket.write(packetEncrypted);
        player.getSocket().write(socketBuffer); // for test
      }
    })
  }

  private getVisibleObjects(callback: (npc: Npc) => void) {
    let radius = 2000;
    const npcs = World.getInstance().getNpcList();
    const playerLocation = this.getLocation();
    npcs.forEach(npc => {
      const npcLocation = npc.getLocation();
      if (this._checkPointInCircle(playerLocation.x, playerLocation.y, npcLocation.x, npcLocation.y, radius)) {
        callback(npc);
      }
    })
  }

  getSkill(id: number) {
    return this.skills.find((skill: any) => skill.id === id);
  }

  changeCombatStateTask() {
    new Timer().tick([0, 5000], (type: any) => {
      switch (type) {
        case "start":
          this.setCombatState(true);
          this.sendPacket(new AutoAttackStart(this.getObjectId()));
          this.broadcast(new AutoAttackStart(this.getObjectId()));
          this.sendPacket(new SystemMessage(35, [{
            type: base.systemMessageType.NUMBER,
            value: 1000
          }]));

          break;
        case "stop":
          this.setCombatState(false);
          this.sendPacket(new AutoAttackStop(this.getObjectId()));
          this.broadcast(new AutoAttackStop(this.getObjectId()));

          break;
      }

      this.sendPacket(new UserInfo(this));
      this.broadcast(new CharacterInfo(this));
    })
  }

  changeFlagTask() {
    new Timer().tick([0, 5000], (type: any) => {
      switch (type) {
        case "start":
          this._flag.status = 1;
          this._flag.display = 1;
          this.sendPacket(new UserInfo(this));
          this.broadcast(new UserInfo(this));

          break;
        case "stop":
          this._flag.status = 0;
          this._flag.display = 0;
          this.sendPacket(new UserInfo(this));
          this.broadcast(new UserInfo(this));

          break;
      }
    })
  }

  _checkPointInCircle(x1: number, y1: number, x2: number, y2: number, radius: number) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let sqrtDist = dx * dx + dy * dy;
    let sqrtRadius = radius * radius;

    return sqrtDist < sqrtRadius;
  }
}
