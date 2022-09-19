import {Server} from "./gameServer/server";

import {IdFactory} from './util/IdFactory'
import {Announcements} from "./gameServer/announcements"
import {Html} from "./gameServer/html"
import {Items} from "./gameServer/items"
import {NpcList} from "./gameServer/npcList"
import {World} from "./gameServer/world"
// import {Bots} from "./gameServer/bots"
// import tasks from "./gameServer/Tasks"
// add files
IdFactory.getInstance().addFile("./data/id.json");
Announcements.getInstance().addFile("./data/announcements.json");
Html.getInstance().addFiles("./data/html");
Items.getInstance().addFiles([{path: "./data/items/armor.json", category: "armor"}, {
  path: "./data/items/weapon.json",
  category: "weapon"
}, {path: "./data/items/etc.json", category: "etc"}]);
// const npcList = NpcList.getInstance();
// npcList.addFile("./data/npc.json");

// init
// npcList.spawn();
// const bots = Bots.getInstance();
// bots.create(10);
const world = World.getInstance();
// world.addNpc(npcList.getList());
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
