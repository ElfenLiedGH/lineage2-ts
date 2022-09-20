import {Point} from "../../types/point";

export class WorldObject {
  constructor(private _objectId: number) {
  }

  public getObjectId(): number {
    return this._objectId
  }

  protected location: Point = new Point();

  public getLocation() {
    return {...this.location};
  }

  public setLocation(location: Point) {
    this.location = location;
  }
}
