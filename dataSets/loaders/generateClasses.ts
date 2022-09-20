import path from 'path'

import {StartPoint} from "./settings/startPoint";
import {CategoryClassGenerator} from "./categoryData/categoryClassGenerator";
import {ManualClassGenerator} from "./manual/manualClassGenerator";
import {CombatStats} from "./pcParameters/combatStats";
import {HpTables} from "./pcParameters/hpTables";
import {MpTables} from "./pcParameters/mpTables";
import {MovingSpeed} from "./pcParameters/movingSpeed";
import {CollisionBox} from "./pcParameters/collisionBox";
import {NpcClassGenerator} from "./npcData/npcClassGenerator";

const root = './dataSets/generated'

// new StartPoint(path.resolve(root, 'settings')).generateClasses()
//
// new CategoryClassGenerator(path.resolve(root, 'categoryData')).generateClasses();
// new ManualClassGenerator(path.resolve(root, 'manual')).generateClasses();
//
// new CollisionBox(path.resolve(root, 'pcParameters')).generateClasses()
// new CombatStats(path.resolve(root, 'pcParameters')).generateClasses('CombatStats')
// const hpFilePath = 'PcParameters/hp_tables.pcparams'
// new HpTables(path.resolve(root, 'pcParameters'), hpFilePath).generateClasses('HpTables')
// const mpFilePath = 'PcParameters/mp_tables.pcparams'
// new MpTables(path.resolve(root, 'pcParameters'), mpFilePath).generateClasses('MpTables')
//
// const movingSpeedFilePath = 'PcParameters/moving_speed.pcparams'
// new MovingSpeed(path.resolve(root, 'pcParameters'), movingSpeedFilePath).generateClasses()

NpcClassGenerator.generateAll();
