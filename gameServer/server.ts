
import debug from 'debug';
import {gameserver} from '../config/config'
import {Socket, createServer} from 'net'
import {Player} from './models/actor/player'

import {Packet} from "./network/packet";
import {World} from "./world";
const log = debug('game-server:server')
export class Server {

  start() {
    createServer(this._onSocket).listen(gameserver.port, gameserver.host, () => {
      log(`Game server listening on ${gameserver.host}:${gameserver.port}`)
    });
    // @ts-ignore
    new Player()
  }

  _onSocket(socket: Socket) {
    let player = new Player(socket);
    let packet = new Packet(player);



    socket.on("data", packet.onData.bind(packet));
    socket.on("close", packet.onClose.bind(packet));
    socket.on("error", packet.onError.bind(packet));
    socket.setEncoding("binary");
    World.getInstance().addPlayer(player);
    log(`Connected to the game server: ${socket.remoteAddress}:${socket.remotePort}`);
  }
}
