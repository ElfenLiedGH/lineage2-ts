import {DefaultLoader} from "../defaultLoader";
import {HpTables} from "./hpTables";

export class MpTables extends HpTables {

  protected getIterator(): Map<string, Map<string, number[]>> {
    return new Map([['mpTable', HpTables.parse(
      new DefaultLoader(this.filePath).parse('_mp_table')
    )]]);
  }
}
