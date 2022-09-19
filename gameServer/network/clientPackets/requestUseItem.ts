import {BasePacket} from "./basePacket";

import {base} from '../../../config/config'
import {UserInfo} from '../serverPackets/userInfo'
import {ItemList} from '../serverPackets/itemList'
import {SystemMessage} from '../serverPackets/systemMessage'
import {CharacterInfo} from "../serverPackets/characterInfo";
import {ShowMiniMap} from "../serverPackets/showMiniMap";
import {Equipment} from "../../../types/equipment";

let items = require("../../items");



export class RequestUseItem extends BasePacket {

  // TODO ts
  private _usedItem: any;

  protected readData() {
    this._data.readC()
      .readD();
  }

  getObjectId() {
    return this._data.getData()[1];
  }

  init() {
    const _usedItem = this._player.getItem(+this.getObjectId());
    // TODO нужен рефактор
    this._usedItem = _usedItem;

    if (_usedItem.category === "armor" || _usedItem.category === "weapon") {
      switch (_usedItem.bodyPart) {
        case items.types.SLOT_R_EAR:

          break;
        case items.types.SLOT_L_EAR:

          break;
        case items.types.SLOT_NECK:

          break;
        case items.types.SLOT_R_FINGER:

          break;
        case items.types.SLOT_L_FINGER:

          break;
        case items.types.SLOT_HEAD:

          break;
        case items.types.SLOT_R_HAND:
          this._putItem(this._player.hand.right, false);

          break;
        case items.types.SLOT_L_HAND:
          this._putItem(this._player.hand.left, false);

          break;
        case items.types.SLOT_GLOVES:
          this._putItem(this._player.gloves);

          break;
        case items.types.SLOT_CHEST:
          this._putItem(this._player.chest);

          break;
        case items.types.SLOT_LEGS:
          this._putItem(this._player.legs);

          break;
        case items.types.SLOT_FEET:
          this._putItem(this._player.feet);

          break;
        case items.types.SLOT_BACK:
          this._putItem(this._player.back);

          break;
        case items.types.SLOT_LR_HAND:
          this._putItem(this._player.hand.leftAndRight, true);

          break;
        case items.types.SLOT_FULL_ARMOR:
          this._putItem(this._player.chest);

          break;
      }
    }

    if (_usedItem.category === "etc") {
      if (_usedItem.itemId === 1665 || _usedItem.itemId === 1863) { // map: world, elmore
        this._player.sendPacket(new ShowMiniMap(_usedItem.itemId));
      }
    }

    this._player.sendPacket(new UserInfo(this._player));
    this._player.sendPacket(new ItemList(this._player));
    this._player.sendPacket(new SystemMessage(49, [{
      type: base.systemMessageType.ITEM_NAME,
      value: _usedItem.itemId
    }]));
    this._player.broadcast(new CharacterInfo(this._player));
  }

  _putItem(bodyPart: Equipment, twoHandedWeapon?: boolean) {
    if (bodyPart.objectId != 0) {
      let item = this._player.getItem(bodyPart.objectId);

      item.isEquipped = false; // снять если надето
    }

    if (twoHandedWeapon) { // Всегда срабатывает false на обычных предметах
      if (this._player.hand.right.objectId != 0) {
        let item = this._player.getItem(this._player.hand.right.objectId);

        item.isEquipped = false;
        this._player.hand.right.objectId = 0;
        this._player.hand.right.itemId = 0;
      }
      if (this._player.hand.left.objectId != 0) {
        let item = this._player.getItem(this._player.hand.left.objectId);

        item.isEquipped = false;
        this._player.hand.left.objectId = 0;
        this._player.hand.left.itemId = 0;
      }
    } else {
      if (this._player.hand.leftAndRight.objectId != 0) {
        let item = this._player.getItem(this._player.hand.leftAndRight.objectId);

        item.isEquipped = false;
        this._player.hand.leftAndRight.objectId = 0;
        this._player.hand.leftAndRight.itemId = 0;
      }
    }

    this._usedItem.isEquipped = true;
    bodyPart.objectId = this._usedItem.objectId;
    bodyPart.itemId = this._usedItem.itemId;
  }
}
