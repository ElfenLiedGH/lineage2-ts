import {BasePacket} from "@gameServer/network/serverPackets/basePacket";
import {Npc} from "@gameServer/models/npc";

let startId = 1000000;
export class NpcInfo extends BasePacket {
	constructor(npc: Npc) {
		super(600);
		this.writeC(0x22)
			.writeD(npc.getObjectId())
			.writeD(startId + npc.getId())
			.writeD(npc.getAttacked())
			.writeD(npc.getLocation().x)
			.writeD(npc.getLocation().y)
			.writeD(npc.getLocation().z)
			.writeD(0x00) // getHeading
			.writeD(0x00)
			.writeD(npc.getMSpeed()) // getMagicalSpeed
			.writeD(npc.getPSpeed()) // getPhysicalSpeed
			.writeD(npc.getRunSpeed()) // getRunSpeed
			.writeD(npc.getWalkSpeed()) // getWalkSpeed
			.writeD(50)	// swimspeed
			.writeD(50)	// swimspeed
			.writeD(100) // getFloatingRunSpeed
			.writeD(100) // getFloatingWalkSpeed
			.writeD(100) // getFlyingRunSpeed
			.writeD(100) // getFlyingWalkSpeed

			.writeF(1) // getMovementMultiplier
			.writeF((npc.getPSpeed() / 500) / 0.555) // getAttackSpeedMultiplier
			.writeF(npc.getCollisionRadius() || 8) // getCollisionRadius
			.writeF(npc.getCollisionHeight() || 23) // getCollisionHeight
			.writeD(npc.getRightHand()) // getRightHandItem
			.writeD(0)
			.writeD(npc.getLeftHand()) // getLeftHandItem
			.writeC(1) // name above char 1=true ... ??
			.writeC(0) // walking=0
			.writeC(0) // attacking 1=true
			.writeC(0) // dead 1=true

			.writeC(0) // invisible ?? 0=false  1=true   2=summoned (only works if model has a summon animation)

			.writeS(npc.getName())
			.writeS(npc.getTitle())
			.writeD(0)
			.writeD(0)
			.writeD(0)  // hmm karma ??
	}
}
