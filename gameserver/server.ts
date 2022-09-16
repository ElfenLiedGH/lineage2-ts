import {log} from '../util/log'
import {gameserver} from '../config/config'
import {Socket, createServer} from 'net'
// db
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

let database = new FileSync("data/database.json");
import {Player} from './models/actor/player'

import {Packet} from "./packet";
import {World} from "./world";

export class Server {

  private static db: any = low(database);

  public static getDb(): any {
    return Server.db;
  }

  start() {
    createServer(this._onSocket).listen(gameserver.port, gameserver.host, () => {
      log(`Game server listening on ${gameserver.host}:${gameserver.port}`)
    });
  }

  _onSocket(socket: Socket) {
    let player = new Player(socket);
    let packet = new Packet(player);

    // setTimeout(() => player.setToLocation({x: -72100, y: 257500, z: -3080}), 5000)

    socket.on("data", packet.onData.bind(packet));
    socket.on("close", packet.onClose.bind(packet));
    socket.on("error", packet.onError.bind(packet));
    socket.setEncoding("binary");
    World.getInstance().addPlayer(player);
    log(`Connected to the game server: ${socket.remoteAddress}:${socket.remotePort}`);
  }
}
