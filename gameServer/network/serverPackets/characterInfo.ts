import {BasePacket} from "@gameServer/network/serverPackets/basePacket";
import {Player} from "../../models/actor/player";
import {Sex} from "../../../types/sex";

// TODO убрать зависимость Player через доп класс фабрику
export class CharacterInfo extends BasePacket {
  constructor(player: Player) {
    super(600);
    this.writeC(0x03)
      .writeD(player.getLocation().x)
      .writeD(player.getLocation().y)
      .writeD(player.getLocation().z)
      .writeD(player.heading)
      .writeD(player.getObjectId())
      .writeS(player.getName())
      .writeD(player.getRaceId())
      .writeD(player.getSex())
      .writeD(player.getClanId()!)

      .writeD(0x00)

      .writeD(player.head.itemId)
      .writeD(player.hand.right.itemId)
      .writeD(player.hand.left.itemId)
      .writeD(player.gloves.itemId)
      .writeD(player.chest.itemId)
      .writeD(player.legs.itemId)
      .writeD(player.feet.itemId)
      .writeD(player.back.itemId)
      .writeD(player.hand.leftAndRight.itemId)
      .writeD(player.underwear.itemId)

      .writeD(0x00)
      .writeD(player.getMSpeed())
      .writeD(player.getPSpeed())

      .writeD(player.getFlagDisplay())
      .writeD(player.getKarma())

      .writeD(player.getRunSpeed())
      .writeD(player.getWalkSpeed())
      .writeD(player.getSwimSpeed())
      .writeD(player.getSwimSpeed())
      .writeD(player.getRunSpeed()) // getFloatingRunSpeed
      .writeD(player.getWalkSpeed()) // getFloatingWalkSpeed
      .writeD(player.getRunSpeed()) // getFlyingRunSpeed
      .writeD(player.getWalkSpeed()) // getFlyingWalkSpeed

    // male
    if (player.getSex() === Sex.male) {
      this.writeF(player.maleMovementMultiplier)
        .writeF((player.getPSpeed() / 500) / 0.555)
        .writeF(player.maleCollisionRadius)
        .writeF(player.maleCollisionHeight)
    }

    // female
    if (player.getStr() === Sex.female) {
      this.writeF(player.femaleMovementMultiplier)
        .writeF((player.getPSpeed() / 500) / 0.555)
        .writeF(player.femaleCollisionRadius)
        .writeF(player.femaleCollisionHeight)
    }

    this.writeD(player.getHairStyle())
      .writeD(player.getHairColor())
      .writeD(player.getFace())

      .writeS(player.title)
      .writeD(player.getClanId()!) // pledge id
      .writeD(player.clanCrestId) // pledge crest id
      .writeD(0x10)

      .writeD(0x00)  // getAllyId new in rev 417
      .writeD(0x00)  // new in rev 417   siege-flags

      .writeC(player.getWaitType())
      .writeC(player.getMoveType())

      .writeC(player.getCombatState())
      .writeC(0x00) // isDead dead = 1  alive = 0

      .writeC(0x00)  // invisible = 1  visible =0
      .writeC(0x00)  // 1 on strider   2 on wyfern   0 no mount
      .writeC(0x00)   // 1 - sellshop

      .writeH(0x00)  // cubic count
      //		writeH(0x00);  // cubic
      .writeC(0x00)	// find party members
  }
}
