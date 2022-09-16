import assert from "assert";
import {DefaultLoader} from "../loaders/defaultLoader";
import {ClassTypes} from "../generated/manual/classTypes";

export enum StatTypes {
  INT,
  STR,
  CON,
  MEN,
  DEX,
  WIT
}

export class Stats {
  private static parse(data: string[][]) {
    const dataMap: Map<string, number[]> = new Map();
    data.forEach(([className, stats]) => {
      dataMap.set(className, stats
        .replace(/[{}]/g, '')
        .split(';')
        .map(el => +el))
    })
    return dataMap;
  }

  private static statsMap = Stats.parse(
    new DefaultLoader('Setting/04_stats.setting').parse().get('recommended_stat')!
  );
  private readonly stats: number[];

  constructor(private characterPrototypeName: string) {
    const stats = Stats.statsMap.get(characterPrototypeName);
    assert(stats, `characterPrototypeName ${characterPrototypeName} not found`);
    this.stats = stats;
  }

  public getStats() {
    return {
      int: this.stats[StatTypes.INT],
      str: this.stats[StatTypes.STR],
      con: this.stats[StatTypes.CON],
      men: this.stats[StatTypes.MEN],
      dex: this.stats[StatTypes.DEX],
      wit: this.stats[StatTypes.WIT],
    }
  }
}
