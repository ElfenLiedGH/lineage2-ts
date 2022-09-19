import {Html} from '../../html';
import {World} from '../../world';
import {TargetSelected} from '../serverPackets/targetSelected'
import {ActionFailed} from '../serverPackets/actionFailed'
import {NpcHtmlMessage} from '../serverPackets/npcHtmlMessage'
import {StatusUpdate} from '../serverPackets/statusUpdate'
import {BasePacket} from "./basePacket";

let Npc = require("./../../Npc");

// 0 for simple click  1 for shift click
enum ActionTypes {
  singleClick,
  shiftClick

}

export class Action extends BasePacket {
  protected readData() {
    this._data.readC()
      .readD()
      .readD()
      .readD()
      .readD()
      .readC();
  }

  getObjectId() {
    return this._data.getData()[1];
  }

  getOriginX() {
    return this._data.getData()[2];
  }

  getOriginY() {
    return this._data.getData()[3];
  }

  getOriginZ() {
    return this._data.getData()[4];
  }

  getActionId(): ActionTypes {
    return +this._data.getData()[5];
  }

  protected init() {
    switch (this.getActionId()) {
      case ActionTypes.singleClick:
        let object = World.getInstance().find(+this.getObjectId());

        //
        if (object) {
          if (this._player.getTarget() && this._player.getTarget()!.getObjectId() === object.getObjectId()) {
            this._player.startCombat();
          } else {
            this._player.setTarget(object);
            this._player.sendPacket(new TargetSelected(object.objectId));
          }

        } else {
          this._player.sendPacket(new ActionFailed());
        }

        if (object instanceof Npc) {
          if (object.type === "npc") {
            this._player.sendPacket(new NpcHtmlMessage(Html.getInstance().get(object.id)!));
          }

          if (object.type === "monster") {
            this._player.sendPacket(new StatusUpdate(object.objectId, object.hp, object.maximumHp));
          }
        }

        break;
      case ActionTypes.shiftClick:

        break;
    }
  }
}
