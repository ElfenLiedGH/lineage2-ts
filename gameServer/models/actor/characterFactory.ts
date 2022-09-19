import {Stats} from "../../../dataSets/setting/stats";
import {ClassTypes} from "../../../dataSets/generated/manual/classTypes"
import {HpTablesHpTable} from "../../../dataSets/generated/pcParameters/hpTablesHpTable";
import {MpTablesMpTable} from "../../../dataSets/generated/pcParameters/mpTablesMpTable";
import {Player} from "./player";
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
import {StartPoint} from "../../../dataSets/generated/settings/startPoint";
import {Point} from "../../../types/point";

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
const startPoint = new StartPoint();

/**
 * Получение дефолтных характеристик
 */
export class CharacterFactory {

  private readonly characterPrototype: CharacterPrototypes
  private readonly className: keyof ClassTypes

  constructor(
    private readonly classId: number,
    private readonly lvl: number,
    private readonly sex: Sex,
  ) {
    this.className = ClassTypes.getClassNameById(classId);
    this.characterPrototype = CharacterPrototype.getPrototypeByClass(this.className)
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
    return combatStatsBaseAttackRange[PrototypeShortsCorrespondence.get(this.characterPrototype, this.sex)]
  }

  private getAttackSpeed() {
    return combatStatsBaseAttackSpeed[PrototypeShortsCorrespondence.get(this.characterPrototype, this.sex)]
  }

  private getAttackType() {
    return combatStatsBaseAttackType[PrototypeShortsCorrespondence.get(this.characterPrototype, this.sex)]
  }

  private getCanPenetrate() {
    return combatStatsBaseCanPenetrate[PrototypeShortsCorrespondence.get(this.characterPrototype, this.sex)]
  }

  private getCritical() {
    return combatStatsBaseCritical[PrototypeShortsCorrespondence.get(this.characterPrototype, this.sex)]
  }

  private getDamageRange() {
    return combatStatsBaseDamageRange[PrototypeShortsCorrespondence.get(this.characterPrototype, this.sex)]
  }

  private getDefend() {
    return combatStatsBaseDefend[PrototypeShortsCorrespondence.get(this.characterPrototype, this.sex)]
  }

  private getMagicAttack() {
    return combatStatsBaseMagicAttack[PrototypeShortsCorrespondence.get(this.characterPrototype, this.sex)]
  }

  private getMagicDefend() {
    return combatStatsBaseMagicDefend[PrototypeShortsCorrespondence.get(this.characterPrototype, this.sex)]
  }

  private getPhysicalAttack() {
    return combatStatsBasePhysicalAttack[PrototypeShortsCorrespondence.get(this.characterPrototype, this.sex)]
  }

  private getRandDam() {
    return combatStatsBaseRandDam[PrototypeShortsCorrespondence.get(this.characterPrototype, this.sex)]
  }

  private getStartPoint() {
    return StartPoint.getPoint(this.characterPrototype)
  }

  public getValue() {
    const stats = this.getStats();
    const maxHp = this.getMaxHp();
    const maxMp = this.getMaxMp();
    const critical = +this.getCritical();
    const physicalAttack = +this.getPhysicalAttack();
    const magicAttack = +this.getMagicAttack();

    const startPoint = this.getStartPoint()
    const location: Point = {x: 0, y: 0, z: 0}
    location.x = startPoint[0]
    location.y = startPoint[1]
    location.z = startPoint[2] + 100
    return {
      stats,
      maxHp,
      maxMp,
      critical,
      physicalAttack,
      magicAttack,
      location,
    }
  }
}
