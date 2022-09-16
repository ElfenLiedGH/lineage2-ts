import {Stats} from "@dataSets/setting/stats";
import {ClassTypes} from "@dataSets/generated/manual/classTypes"
import {HpTablesHpTable} from "@dataSets/generated/pcParameters/hpTableshpTable";
import {MpTablesMpTable} from "@dataSets/generated/pcParameters/mpTablesmpTable";
import {Player} from "./actor/player";
import {CombatStatsBaseAttackRange} from "@dataSets/generated/pcParameters/combatStatsBaseAttackRange";
import {CombatStatsBaseAttackSpeed} from "@dataSets/generated/pcParameters/combatStatsBaseAttackSpeed";
import {CombatStatsBaseAttackType} from "@dataSets/generated/pcParameters/combatStatsbaseAttackType";
import {CombatStatsBaseCanPenetrate} from "@dataSets/generated/pcParameters/combatStatsbaseCanPenetrate";
import {CombatStatsBaseCritical} from "@dataSets/generated/pcParameters/combatStatsbaseCritical";
import {CombatStatsBaseDamageRange} from "@dataSets/generated/pcParameters/combatStatsbaseDamageRange";
import {CombatStatsBaseDefend} from "@dataSets/generated/pcParameters/combatStatsbaseDefend";
import {CombatStatsBaseMagicAttack} from "@dataSets/generated/pcParameters/combatStatsbaseMagicAttack";
import {CombatStatsBaseMagicDefend} from "@dataSets/generated/pcParameters/combatStatsbaseMagicDefend";
import {CombatStatsBasePhysicalAttack} from "@dataSets/generated/pcParameters/combatStatsbasePhysicalAttack";
import {CombatStatsBaseRandDam} from "@dataSets/generated/pcParameters/combatStatsbaseRandDam";
import {CharacterPrototypes} from "./characterPrototype";
import {PrototypeShortsCorrespondence} from "./prototypeShortsCorrespondence";
import {Sex} from "../../types/sex";

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

  constructor(
    private readonly className: keyof ClassTypes,
    private readonly lvl: number,
    private readonly sex: Sex,
    private readonly characterPrototype: CharacterPrototypes,
  ) {
  }

  private getStats() {
    return new Stats(this.className).getStats();
  }

  private getMaxHp() {
    return new HpTablesHpTable()[this.className][this.lvl]
  }

  private getMaxMp() {
    return new MpTablesMpTable()[this.className][this.lvl]
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

  public getValue(){
    const stats = this.getStats();
    const maxHp = this.getMaxHp();
    const maxMp = this.getMaxMp();
    const critical = this.getCritical();
    const physicalAttack = this.getPhysicalAttack();
    const magicAttack = this.getMagicAttack();
  }
}
