import {BasePacket} from "@gameServer/network/serverPackets/basePacket";
import {Player} from "../../models/actor/player";
import {Character} from "@gameServer/models/actor/character";

export class CharacterSelectInfo extends BasePacket {
	constructor(characters: Character[] | undefined) {
		super(characters ? characters.length * 400 : 10);
		this.writeC(0x1f);

		if(characters) {
			this.writeD(characters.length)
			for(let i = 0; i < characters.length; i++) {
				this.writeS(characters[i].getName())
					.writeD(characters[i].getObjectId())
					.writeS(characters[i].getLogin())
					.writeD(0x55555555)	// getSessionId
					.writeD(characters[i].getClanId() ?? 0)

					.writeD(0x00)

					.writeD(characters[i].getSex())
					.writeD(characters[i].getRaceId())
					.writeD(characters[i].getClassId())

					.writeD(0x01)

					.writeD(characters[i].getLocation().x)	// no effect ?
					.writeD(characters[i].getLocation().y)	// no effect ?
					.writeD(characters[i].getLocation().z)	// no effect ?

					.writeF(characters[i].getHp())
					.writeF(characters[i].getMp())

					.writeD(characters[i].getSp())
					.writeD(characters[i].getExp())
					.writeD(characters[i].getLvl())
					.writeD(characters[i].getKarma())

					.writeD(0x00)
					.writeD(0x00)
					.writeD(0x00)
					.writeD(0x00)
					.writeD(0x00)
					.writeD(0x00)
					.writeD(0x00)
					.writeD(0x00)
					.writeD(0x00)

					.writeD(0x00)
					.writeD(0x00) // writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_REAR));
					.writeD(0x00) // writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_LEAR));
					.writeD(0x00) // writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_NECK));
					.writeD(0x00) // writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_RFINGER));
					.writeD(0x00) // writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_LFINGER));

					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_HEAD));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_RHAND));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_LHAND));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_GLOVES));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_CHEST));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_LEGS));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_FEET));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_BACK));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_LRHAND));

					.writeD(0x00)
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_REAR));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_LEAR));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_NECK));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_RFINGER));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_LFINGER));

					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_HEAD));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_RHAND));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_LHAND));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_GLOVES));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_CHEST));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_LEGS));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_FEET));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_BACK));
					.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_LRHAND));

					.writeD(characters[i].getHairStyle())
					.writeD(characters[i].getHairColor())
					.writeD(characters[i].getFace())

					.writeF(characters[i].getMaxHp())
					.writeF(characters[i].getMaxMp())

					.writeD(0x00) //writeD(charInfoPackage.getDeleteTimer());  // days left before delete .. if != 0 then char is inactive
			}
		} else {
			this.writeD(0x00);
		}
	}
}
