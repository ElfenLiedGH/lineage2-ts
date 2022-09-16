import {BasePacket} from "./basePacket";

import {base} from '../../../config/config'
import {Announcements} from '../../announcements'
import {World} from '../../world'
import {CreateSay} from '../serverPackets/createSay'
import {SunRise} from '../serverPackets/sunRise'
import {UserInfo} from '../serverPackets/userInfo'
import {ItemList} from '../serverPackets/itemList'
import {CharacterInfo} from '../serverPackets/characterInfo'
import {NpcInfo} from '../serverPackets/npcInfo'
import {Player} from "../../models/actor/player";

export class EnterWorld extends BasePacket {

  protected readData() {
    this._data.readC()
  }

  init() {
    Announcements.getInstance().each((announcement: string) => {
      this._player.sendPacket(new CreateSay(this._player.getObjectId(), this._player.name, base.MESSAGE_TYPE.ANNOUNCEMENT, announcement));
    })

    this._player.sendPacket(new SunRise());
    this._player.sendPacket(new UserInfo(this._player));
    this._player.sendPacket(new ItemList(this._player));
    //this._player.sendPacket(new serverPackets.RadarControl(0, 2, -71311, 257303, -3115));

    //this._player.sendPacket(new serverPackets.SpawnItem(items.create(78), -70880, 257360, -3080));

    //this._player.sendPacket(new serverPackets.TutorialShowHtml(html.get("tutorial_001"))); // fix
    //this._player.sendPacket(new serverPackets.Ride(this._player));
    this._player.broadcast(new CharacterInfo(this._player)); // Оповестить всех, что персонаж зашел в мир

    this._player.getVisibleObjects(World.getInstance().getNpcList(), (npc: Player) => {
      this._player.sendPacket(new NpcInfo(npc));
    })

    this._player.getVisiblePlayers(World.getInstance().getPlayers(), (player: Player) => {
      this._player.sendPacket(new CharacterInfo(player));
    });

    this._player.getVisiblePlayers(World.getInstance().getBots(), (bot: Player) => {
      this._player.sendPacket(new CharacterInfo(bot));
    });
  }
}
