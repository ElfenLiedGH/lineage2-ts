import path from 'path'

import {StartPoint} from "./settings/startPoint";
import {CategoryClassGenerator} from "./categoryData/categoryClassGenerator";
import {ManualClassGenerator} from "./manual/manualClassGenerator";
import {CombatStats} from "./pcParameters/combatStats";
import {HpTables} from "./pcParameters/hpTables";
import {MpTables} from "./pcParameters/mpTables";

const root = './dataSets/generated'

new StartPoint(path.resolve(root, 'settings')).generateClasses()

new CategoryClassGenerator(path.resolve(root, 'categoryData')).generateClasses();
new ManualClassGenerator(path.resolve(root, 'manual')).generateClasses();
new CombatStats(path.resolve(root, 'pcParameters')).generateClasses('CombatStats')


const hpFilePath = 'PcParameters/hp_tables.pcparams'
new HpTables(path.resolve(root, 'pcParameters'), hpFilePath).generateClasses('HpTables')
const mpFilePath = 'PcParameters/mp_tables.pcparams'
new MpTables(path.resolve(root, 'pcParameters'), mpFilePath).generateClasses('MpTables')
