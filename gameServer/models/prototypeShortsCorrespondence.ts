//FFighter: 인간 여자 전사
//MFighter: 인간 남자 전사
//Fmagic: 인간 여자 마법사
//MMagic: 인간 남자 마법사
//FElfFighter: 엘프 여자 전사
//MElfFighter: 엘프 남자 전사
//FElfMagic: 엘프 여자 마법사
//MElfMagic: 엘프 남자 마법사
//FDarkelfFighter: 다크엘프 여자 전사
//MDarkelfFighter: 다크엘프 남자 전사
//FDarkelfMagic: 다크엘프 여자 마법사
//MDarkelfMagic: 다크엘프 남자 마법사
//FOrcFighter: 오크 여자 전사
//MOrcFighter: 오크 남자 전사
//FShaman: 오크 여자 마법사
//MShaman: 오크 남자 마법사
//FDwarfFighter: 드워프 여자 전사
//MDwarfFighter: 드워프 남자 전사

import {CharacterPrototypes} from "./characterPrototype";
import {Sex} from "../../types/sex";
import {CombatStatsShorts} from "../../dataSets/generated/pcParameters/combatStatsShorts";
import debug from "debug";

const combatStatsShorts = new CombatStatsShorts()

const log = debug('data-sets:prototype-shorts-correspondence')

/**
 * Соответствие между прототопом+полом и краткой записью справочников
 */
export class PrototypeShortsCorrespondence {
  static get(characterPrototype: CharacterPrototypes, sex: Sex): keyof CombatStatsShorts {
    if (characterPrototype === CharacterPrototypes.human_fighter) {
      return sex === Sex.male ? combatStatsShorts.MFighter : combatStatsShorts.FFighter;
    }
    if (characterPrototype === CharacterPrototypes.human_magician) {
      return sex === Sex.male ? combatStatsShorts.MMagic : combatStatsShorts.FMagic;
    }
    if (characterPrototype === CharacterPrototypes.elf_fighter) {
      return sex === Sex.male ? combatStatsShorts.MElfFighter : combatStatsShorts.FElfFighter;
    }
    if (characterPrototype === CharacterPrototypes.elf_magician) {
      return sex === Sex.male ? combatStatsShorts.MElfMagic : combatStatsShorts.FElfMagic;
    }
    if (characterPrototype === CharacterPrototypes.darkelf_fighter) {
      return sex === Sex.male ? combatStatsShorts.MDarkelfFighter : combatStatsShorts.FDarkelfFighter;
    }
    if (characterPrototype === CharacterPrototypes.darkelf_magician) {
      return sex === Sex.male ? combatStatsShorts.MDarkelfMagic : combatStatsShorts.FDarkelfMagic;
    }
    if (characterPrototype === CharacterPrototypes.orc_fighter) {
      return sex === Sex.male ? combatStatsShorts.MOrcFighter : combatStatsShorts.FOrcFighter;
    }
    if (characterPrototype === CharacterPrototypes.orc_shaman) {
      return sex === Sex.male ? combatStatsShorts.MShaman : combatStatsShorts.FShaman;
    }
    if (characterPrototype === CharacterPrototypes.dwarf_apprentice) {
      return sex === Sex.male ? combatStatsShorts.MDwarfFighter : combatStatsShorts.FDwarfFighter;
    }

    log(`shorts for characterPrototype ${characterPrototype}  sex ${sex} not found`)
    throw new Error(`shorts for characterPrototype ${characterPrototype}  sex ${sex} not found`)
  }

}

// 'fighter',
//   'mage',
//   'elven_fighter',
//   'elven_mage',
//   'dark_fighter',
//   'dark_mage',
//   'orc_fighter',
//   'orc_mage',
//   'dwarven_fighter'
