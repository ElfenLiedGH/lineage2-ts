import {WorldObject} from "./worldObject";
import {IdFactory} from "../../util/IdFactory";
import {World} from "@gameServer/world";

export abstract class Npc extends WorldObject {

  private attacked: boolean = false

  public getAttacked() {
    return this.attacked ? 1 : 0
  }

  public setAttacked(attacked: boolean) {
    this.attacked = attacked;
  }

  protected hp: number = 0;

  constructor() {
    super(IdFactory.getInstance().getNextId());
  }

  public getHp(): number {
    return this.hp;
  }

  public spawn(){
    World.getInstance().addNpc(this)
  }

  public abstract getId(): number;

  public abstract getMSpeed(): number;

  public abstract getPSpeed(): number;

  public abstract getRunSpeed(): number;

  public abstract getWalkSpeed(): number;

  public abstract getRightHand(): number;

  public abstract getLeftHand(): number;

  public abstract getName(): string;

  public abstract getTitle(): string;

  public abstract getCollisionRadius(): number;

  public abstract getCollisionHeight(): number;
}
