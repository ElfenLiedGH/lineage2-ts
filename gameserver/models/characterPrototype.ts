import debug from "debug";
import {ClassTypes} from "../../dataSets/generated/manual/classTypes";

const log = debug('data-sets:character-prototype')

export enum CharacterPrototypes {
  human_fighter = 'human_fighter',
  human_magician = 'human_magician',
  elf_fighter = 'elf_fighter',
  elf_magician = 'elf_magician',
  darkelf_fighter = 'darkelf_fighter',
  darkelf_magician = 'darkelf_magician',
  orc_fighter = 'orc_fighter',
  orc_shaman = 'orc_shaman',
  dwarf_apprentice = 'dwarf_apprentice',
}

export class CharacterPrototype {

  public static get human_fighter() {
    return CharacterPrototypes.human_fighter
  };

  public static get human_magician() {
    return CharacterPrototypes.human_magician
  };

  public static get elf_fighter() {
    return CharacterPrototypes.elf_fighter
  };

  public static get elf_magician() {
    return CharacterPrototypes.elf_magician
  };

  public static get darkelf_fighter() {
    return CharacterPrototypes.darkelf_fighter
  };

  public static get darkelf_magician() {
    return CharacterPrototypes.darkelf_magician
  };

  public static get orc_fighter() {
    return CharacterPrototypes.orc_fighter
  };

  public static get orc_shaman() {
    return CharacterPrototypes.orc_shaman
  };

  public static get dwarf_apprentice() {
    return CharacterPrototypes.dwarf_apprentice
  };

  public static getPrototypeByClass(className: keyof ClassTypes): CharacterPrototypes {
    if (className === "fighter") {
      return CharacterPrototype.human_fighter;
    }
    if (className === "mage") {
      return CharacterPrototype.human_magician;
    }
    if (className === "elven_fighter") {
      return CharacterPrototype.elf_fighter;
    }
    if (className === "elven_mage") {
      return CharacterPrototype.elf_magician;
    }
    if (className === "dark_fighter") {
      return CharacterPrototype.darkelf_fighter;
    }
    if (className === "dark_mage") {
      return CharacterPrototype.darkelf_magician;
    }
    if (className === "orc_fighter") {
      return CharacterPrototype.orc_fighter;
    }
    if (className === "orc_mage") {
      return CharacterPrototype.orc_shaman;
    }
    if (className === "dwarven_fighter") {
      return CharacterPrototype.dwarf_apprentice;
    }
    log(`prototype for ${className} not found`)
    return ("" as CharacterPrototypes)

  }
}
