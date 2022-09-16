import {BasePacket} from "./basePacket";
import {CharacterTemplates, CharacterTemplate} from '../serverPackets/characterTemplates'
import {Stats} from "../../../dataSets/setting/stats";
import {FirstClassGroup} from "../../../dataSets/generated/categoryData/firstClassGroup";
import {ClassTypes} from "../../../dataSets/generated/manual/classTypes";
import {DefaultClassTypeRaceCorrespondence} from "../../models/defaultClassTypeRaceCorrespondence";
import assert from "assert";
import {CharacterPrototype} from "../../models/characterPrototype";

export class NewCharacter extends BasePacket {

  protected readData() {
    this._data.readC();
  }

  init() {
    const classes = FirstClassGroup.getComposition();
    let characterTemplates: CharacterTemplate[] = [];
    classes.forEach(className => {
      const characterPrototypeName = CharacterPrototype.getPrototypeByClass(className);
      const stats = new Stats(characterPrototypeName).getStats();
      const raceId = DefaultClassTypeRaceCorrespondence.getRaceId(characterPrototypeName);
      assert(raceId !== undefined, `raceId ${raceId} not found ${className}`)
      characterTemplates.push({
        raceId,
        classId: new ClassTypes()[className],
        ...stats,
      })
    })
    this._player.sendPacket(new CharacterTemplates(characterTemplates));
  }
}
