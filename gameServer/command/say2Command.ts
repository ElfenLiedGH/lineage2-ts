import {SetToLocation} from "../network/serverPackets/setToLocation";
import {Player} from "../models/actor/player";

export function Say2Command(text: string, _player: Player): boolean{

  if (text.search(/\.loc/) !== -1) {
    console.log('chg location')
    const point = text.replace('.loc ', '').split(' ').map(el => +el)
    if (point.length === 3) {
      console.log('change', point)
      _player.sendPacket(new SetToLocation(_player.getObjectId(), 0, {
        x: point[0],
        y: point[1],
        z: point[2]
      }))
    }
    return true;

  }

  return true;
}
