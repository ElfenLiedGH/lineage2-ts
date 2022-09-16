import {Races} from "@dataSets/generated/manual/races";
import debug from "debug";
import {CharacterPrototype} from "./characterPrototype";

const log = debug('data-sets:default-class-type-race-correspondence')

/**\
 * Соответствие прототипа и расы
 */
export class DefaultClassTypeRaceCorrespondence {
  public static getRaceId(characterPrototypeName: string) {
    const races = new Races();
    if (characterPrototypeName === CharacterPrototype.human_fighter || characterPrototypeName === CharacterPrototype.human_magician) {
      return races.race_human;
    }
    if (characterPrototypeName === CharacterPrototype.elf_fighter || characterPrototypeName === CharacterPrototype.elf_magician) {
      return races.race_elf;
    }
    if (characterPrototypeName === CharacterPrototype.darkelf_fighter || characterPrototypeName === CharacterPrototype.darkelf_magician) {
      return races.race_dark_elf;
    }
    if (characterPrototypeName === CharacterPrototype.orc_fighter || characterPrototypeName === CharacterPrototype.orc_shaman) {
      return races.race_orc;
    }
    if (characterPrototypeName === CharacterPrototype.dwarf_apprentice) {
      return races.race_dwarf;
    }
    log(`prototype ${characterPrototypeName} not found`)
  }

}
