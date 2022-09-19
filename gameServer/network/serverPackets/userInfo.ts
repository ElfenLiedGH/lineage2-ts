import {BasePacket} from "@gameServer/network/serverPackets/basePacket";
import {Player} from "../../models/actor/player";
import {Sex} from "../../../types/sex";

export class UserInfo extends BasePacket {
	constructor(player:Player) {
		super(600 + BasePacket.strlen(player.getName()));

		this.writeC(0x04)
			.writeD(player.getLocation().x)
			.writeD(player.getLocation().y)
			.writeD(player.getLocation().z)
			.writeD(player.heading)
			.writeD(player.getObjectId())
			.writeS(player.getName())
			.writeD(player.getRaceId())
			.writeD(player.getSex())
			.writeD(player.getClassId())
			.writeD(player.getLvl())
			.writeD(player.getExp())
			.writeD(player.getStr())
			.writeD(player.getDex())
			.writeD(player.getCon())
			.writeD(player.getInt())
			.writeD(player.getWit())
			.writeD(player.getMen())
			.writeD(player.getMaxHp())
			.writeD(player.getHp())
			.writeD(player.getMaxMp())
			.writeD(player.getMp())
			.writeD(player.getSp())
			.writeD(player.getLoad())
			.writeD(player.getMaxLoad())

			.writeD(0x28)

			.writeD(player.underwear.objectId)
			.writeD(player.ear.right.objectId)
			.writeD(player.ear.left.objectId)
			.writeD(player.neck.objectId)
			.writeD(player.finger.right.objectId)
			.writeD(player.finger.left.objectId)

			.writeD(player.head.objectId)
			.writeD(player.hand.right.objectId)
			.writeD(player.hand.left.objectId)
			.writeD(player.gloves.objectId)
			.writeD(player.chest.objectId)
			.writeD(player.legs.objectId)
			.writeD(player.feet.objectId)
			.writeD(player.back.objectId)
			.writeD(player.hand.leftAndRight.objectId)

			.writeD(player.underwear.itemId)
			.writeD(player.ear.right.itemId)
			.writeD(player.ear.left.itemId)
			.writeD(player.neck.itemId)
			.writeD(player.finger.right.itemId)
			.writeD(player.finger.left.itemId)

			.writeD(player.head.itemId)
			.writeD(player.hand.right.itemId)
			.writeD(player.hand.left.itemId)
			.writeD(player.gloves.itemId)
			.writeD(player.chest.itemId)
			.writeD(player.legs.itemId)
			.writeD(player.feet.itemId)
			.writeD(player.back.itemId)
			.writeD(player.hand.leftAndRight.itemId)

			.writeD(player.getPAtk())
			.writeD(player.getPSpeed())
			.writeD(player.getPDef())
			.writeD(player.getEvasion())
			.writeD(player.getAccuracy())
			.writeD(player.getCritical())

			.writeD(player.getMAtk())
			.writeD(player.getMSpeed())
			.writeD(player.getPSpeed())
			.writeD(player.getMDef())

			.writeD(player.getFlagDisplay())
			.writeD(player.getKarma())

			.writeD(player.getRunSpeed())
			.writeD(player.getWalkSpeed())
			.writeD(player.getSwimSpeed())
			// TODO ????
			.writeD(player.getSwimSpeed())
			.writeD(player.getRunSpeed()) // getFloatingRunSpeed
			.writeD(player.getWalkSpeed()) // getFloatingWalkSpeed
			.writeD(player.getRunSpeed()) // getFlyingRunSpeed
			.writeD(player.getWalkSpeed()) // getFlyingWalkSpeed

		// male
		if(player.getSex() === Sex.male) {
			this.writeF(player.maleMovementMultiplier)
				.writeF(player.maleAttackSpeedMultiplier)
				.writeF(player.maleCollisionRadius)
				.writeF(player.maleCollisionHeight)
		}

		// female
		if(player.getSex() === Sex.female) {
			this.writeF(player.femaleMovementMultiplier)
				.writeF(player.femaleAttackSpeedMultiplier)
				.writeF(player.femaleCollisionRadius)
				.writeF(player.femaleCollisionHeight)
		}

		this.writeD(player.getHairStyle())
			.writeD(player.getHairColor())
			.writeD(player.getFace())


			// TODO refactoring
			.writeD(player.gm)
			.writeS(player.title)
			.writeD(player.getClanId()!)
			.writeD(player.clanCrestId)
			.writeD(player.allianceId)
			.writeD(player.allianceCrestId)
			.writeD(0x00) // 0x60 ??? // siege-flags
			.writeC(0x00)
			.writeC(player.privateStoreType)
			.writeC(player.canCraft)
			.writeD(player.pk)
			.writeD(player.pvp)
			.writeH(0x00) // cubic count
			//		.writeH(0x01) // 1-yellow 2-orange 3-yellow star 4-violett 5-blue cube
			//		.writeH(0x02) // 1-yellow 2-orange 3-yellollow star 4-violett 5-blue cube  w star  4-violett 5-blue cube
			//		.writeH(0x03) // 1-yellow 2-orange 3-ye
			//		.writeH(0x04) // 1-yellow 2-orange 3-yellow star 4-violett 5-blue cube
			//		.writeH(0x05) // 1-yellow 2-orange 3-yellow star 4-violett 5-blue cube
			.writeC(0x00); // 1-find party members

	}
}
