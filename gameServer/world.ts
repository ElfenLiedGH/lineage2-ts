import {Player} from "./models/actor/player";
import {Npc} from "@gameServer/models/npc";
import {WorldObject} from "@gameServer/models/worldObject";

export class World {

  private objects: Map<number, WorldObject> = new Map();
  private players: Map<number, Player> = new Map();
  private npcList: Map<number, Npc> = new Map();

  private static world: World;

  private constructor() {
  }

  public static getInstance() {
    if (!World.world) {
      World.world = new World();
    }
    return World.world;
  }

  addPlayer(player: Player) {
    this.objects.set(player.getObjectId(), player);
    this.players.set(player.getObjectId(), player);
  }

  getPlayers(): Map<number, Player> {
    return this.players
  }

  addNpc(npc: Npc) {
    this.objects.set(npc.getObjectId(), npc);
    this.npcList.set(npc.getObjectId(), npc);
  }

  getNpcList(): Map<number, Npc> {
    return this.npcList;
  }

  find(objectId: number): WorldObject | undefined {
    return this.objects.get(objectId);
  }
}
