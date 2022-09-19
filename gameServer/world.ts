import {Player} from "./models/actor/player";
import {Bot} from "./Bot";

export class World {

  private _objects: any[] = []
  private _players: Player[] = []
  private _bots: Bot[] = []
  private _npcList: any[] = []

  private static world: World;

  private constructor() {
  }

  public static getInstance(){
    if(!World.world){
      World.world = new World();
    }
    return World.world;
  }

  addPlayer(player: Player) {
    this._objects.push(player);
    this._players.push(player);
  }

  getPlayers(): Player[] {
    return this._players
  }

  addBot(bot: Bot) {
    this._objects.push(bot);
    this._bots.push(bot);
  }

  getBots(): Bot[] {
    return this._bots;
  }

  addNpc(npc: any) {
    this._objects.push(npc);
    this._npcList.push(npc);
  }

  getNpcList(): any[] {
    return this._npcList;
  }

  find(objectId: number) {
    return this._objects.find(object => object.objectId === objectId);
  }
}
