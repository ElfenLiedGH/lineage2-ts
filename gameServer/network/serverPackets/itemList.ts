import {BasePacket} from "@gameServer/network/serverPackets/basePacket";
import {Player} from "../../models/actor/player";

export class ItemList extends BasePacket {
  constructor(player: Player, showWindow = false) {
    super(5 + (28 * player.items.length));
    this.writeC(0x27);

    if (showWindow) {
      this.writeH(0x01);
    } else {
      this.writeH(0x00);
    }

    this.writeH(player.items.length);

    for (let i = 0; i < player.items.length; i++) {
      this.writeH(player.items[i].type1)
        .writeD(player.items[i].objectId)
        .writeD(player.items[i].itemId)
        .writeD(0x01) // getCount
        .writeH(player.items[i].type2)
        .writeH(0xff);

      if (player.items[i].isEquipped) { // вещь на персонаже или нет
        this.writeH(0x01);
      } else {
        this.writeH(0x00);
      }

      this.writeD(player.items[i].bodyPart)
        .writeH(0x00) // getEnchantLevel
        .writeH(0x00);
    }
  }
}
