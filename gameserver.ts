import {Server} from "./gameserver/server";

import {IdFactory} from './util/IdFactory'
import {Announcements} from "./gameserver/announcements"
import {Html} from "./gameserver/html"
import {Items} from "./gameserver/items"
import {NpcList} from "./gameserver/npcList"
import {World} from "./gameserver/world"
// import {Bots} from "./gameserver/bots"
// import tasks from "./gameserver/Tasks"
// add files
IdFactory.getInstance().addFile("./data/id.json");
Announcements.getInstance().addFile("./data/announcements.json");
Html.getInstance().addFiles("./data/html");
Items.getInstance().addFiles([{path: "./data/items/armor.json", category: "armor"}, {
  path: "./data/items/weapon.json",
  category: "weapon"
}, {path: "./data/items/etc.json", category: "etc"}]);
const npcList = NpcList.getInstance();
npcList.addFile("./data/npc.json");

// init
npcList.spawn();
// const bots = Bots.getInstance();
// bots.create(10);
const world = World.getInstance();
world.addNpc(npcList.getList());
// world.addBot(bots.getBots());
// tasks.startNpcMove();

// let prevBot: any;
// for (const bot of bots.getBots()) {
//   if (prevBot) {
//     bot.setTarget(prevBot)
//   }
//   prevBot = bot;
// }

new Server().start();
// for (const bot of bots.getBots()) {
//   bot.startCombat();
// }
