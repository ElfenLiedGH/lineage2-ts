import {Stats} from "../../../dataSets/setting/stats";
import {ClassTypes} from "../../../dataSets/generated/manual/classTypes"
import {HpTablesHpTable} from "../../../dataSets/generated/pcParameters/hpTablesHpTable";
import {MpTablesMpTable} from "../../../dataSets/generated/pcParameters/mpTablesMpTable";
import {CombatStatsBaseAttackRange} from "../../../dataSets/generated/pcParameters/combatStatsBaseAttackRange";
import {CombatStatsBaseAttackSpeed} from "../../../dataSets/generated/pcParameters/combatStatsBaseAttackSpeed";
import {CombatStatsBaseAttackType} from "../../../dataSets/generated/pcParameters/combatStatsBaseAttackType";
import {CombatStatsBaseCanPenetrate} from "../../../dataSets/generated/pcParameters/combatStatsBaseCanPenetrate";
import {CombatStatsBaseCritical} from "../../../dataSets/generated/pcParameters/combatStatsBaseCritical";
import {CombatStatsBaseDamageRange} from "../../../dataSets/generated/pcParameters/combatStatsBaseDamageRange";
import {CombatStatsBaseDefend} from "../../../dataSets/generated/pcParameters/combatStatsBaseDefend";
import {CombatStatsBaseMagicAttack} from "../../../dataSets/generated/pcParameters/combatStatsBaseMagicAttack";
import {CombatStatsBaseMagicDefend} from "../../../dataSets/generated/pcParameters/combatStatsBaseMagicDefend";
import {CombatStatsBasePhysicalAttack} from "../../../dataSets/generated/pcParameters/combatStatsBasePhysicalAttack";
import {CombatStatsBaseRandDam} from "../../../dataSets/generated/pcParameters/combatStatsBaseRandDam";
import {CharacterPrototype, CharacterPrototypes} from "../characterPrototype";
import {PrototypeShortsCorrespondence} from "../prototypeShortsCorrespondence";
import {Sex} from "../../../types/sex";
import {StartPoint} from "@dataSets/generated/settings/startPoint";
import {Point} from "../../../types/point";
import {MovingSpeed} from "@dataSets/generated/pcParameters/movingSpeed";
import {MovingType} from "@dataSets/generated/pcParameters/movingSpeed";
import {CollisionBox} from "@dataSets/generated/pcParameters/collisionBox";
import {CombatStatsShorts} from "@dataSets/generated/pcParameters/combatStatsShorts";

const combatStatsBaseAttackRange = new CombatStatsBaseAttackRange();
const combatStatsBaseAttackSpeed = new CombatStatsBaseAttackSpeed();
const combatStatsBaseAttackType = new CombatStatsBaseAttackType();
const combatStatsBaseCanPenetrate = new CombatStatsBaseCanPenetrate();
const combatStatsBaseCritical = new CombatStatsBaseCritical();
const combatStatsBaseDamageRange = new CombatStatsBaseDamageRange();
const combatStatsBaseDefend = new CombatStatsBaseDefend();
const combatStatsBaseMagicAttack = new CombatStatsBaseMagicAttack();
const combatStatsBaseMagicDefend = new CombatStatsBaseMagicDefend();
const combatStatsBasePhysicalAttack = new CombatStatsBasePhysicalAttack();
const combatStatsBaseRandDam = new CombatStatsBaseRandDam();

/**
 * Получение дефолтных характеристик
 */
export class CharacterFactory {

  private readonly characterPrototype: CharacterPrototypes
  private readonly className: keyof ClassTypes
  private readonly prototypeShortsCorrespondence: keyof CombatStatsShorts
  constructor(
    private readonly classId: number,
    private readonly lvl: number,
    private readonly sex: Sex,
  ) {
    this.className = ClassTypes.getClassNameById(classId);
    this.characterPrototype = CharacterPrototype.getPrototypeByClass(this.className)
    this.prototypeShortsCorrespondence = PrototypeShortsCorrespondence.get(this.characterPrototype, this.sex)
  }

  private getStats() {
    return new Stats(this.characterPrototype).getStats();
  }

  private getMaxHp() {
    return new HpTablesHpTable()[this.className][this.lvl - 1]
  }

  private getMaxMp() {
    return new MpTablesMpTable()[this.className][this.lvl - 1]
  }

  private getAttackRange() {
    return combatStatsBaseAttackRange[this.prototypeShortsCorrespondence]
  }

  private getAttackSpeed() {
    return combatStatsBaseAttackSpeed[this.prototypeShortsCorrespondence]
  }

  private getAttackType() {
    return combatStatsBaseAttackType[this.prototypeShortsCorrespondence]
  }

  private getCanPenetrate() {
    return combatStatsBaseCanPenetrate[this.prototypeShortsCorrespondence]
  }

  private getCritical() {
    return combatStatsBaseCritical[this.prototypeShortsCorrespondence]
  }

  private getDamageRange() {
    return combatStatsBaseDamageRange[this.prototypeShortsCorrespondence]
  }

  private getDefend() {
    return combatStatsBaseDefend[this.prototypeShortsCorrespondence]
  }

  private getMagicAttack() {
    return combatStatsBaseMagicAttack[this.prototypeShortsCorrespondence]
  }

  private getMagicDefend() {
    return combatStatsBaseMagicDefend[this.prototypeShortsCorrespondence]
  }

  private getPhysicalAttack() {
    return combatStatsBasePhysicalAttack[this.prototypeShortsCorrespondence]
  }

  private getRandDam() {
    return combatStatsBaseRandDam[this.prototypeShortsCorrespondence]
  }

  private getStartPoint() {
    return StartPoint.getPoint(this.characterPrototype)
  }

  private getMovingSpeed() {
    return {
      [MovingType.walk]:
        MovingSpeed.getValue(this.prototypeShortsCorrespondence, MovingType.walk),
      [MovingType.run]:
        MovingSpeed.getValue(this.prototypeShortsCorrespondence, MovingType.run)
    }
  }

  private getCollision() {
    return CollisionBox.getValue(this.prototypeShortsCorrespondence)
  }

  public getValue() {
    const stats = this.getStats();
    const maxHp = this.getMaxHp();
    const maxMp = this.getMaxMp();
    const critical = +this.getCritical();
    const physicalAttack = +this.getPhysicalAttack();
    const magicAttack = +this.getMagicAttack();
    const attackSpeed = +this.getAttackSpeed();

    const startPoint = this.getStartPoint()
    const location: Point = {x: 0, y: 0, z: 0}
    location.x = startPoint[0]
    location.y = startPoint[1]
    location.z = startPoint[2]

    const movingSpeed = this.getMovingSpeed();

    const collision = this.getCollision();

    return {
      stats,
      maxHp,
      maxMp,
      critical,
      physicalAttack,
      attackSpeed,
      magicAttack,
      location,
      walkSpeed: movingSpeed[MovingType.walk],
      runSpeed: movingSpeed[MovingType.run],
      collision,
    }
  }
}
