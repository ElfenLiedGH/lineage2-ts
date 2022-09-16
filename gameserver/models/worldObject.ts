export class WorldObject {
  constructor(private _objectId: number) {
  }

  public getObjectId(): number {
    return this._objectId
  }
}
