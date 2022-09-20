import EventEmitter from "events";

export type Events<T> = { task: T }
type EventReceiver<T> = (params: T) => void;

export declare interface TaskList<T> {
  on(event: keyof Events<T>, listener: EventReceiver<Events<T>[keyof Events<T>]>): this;

  off(event: keyof Events<T>, listener: EventReceiver<Events<T>[keyof Events<T>]>): this;
}

export class TaskList<T> {
  private taskList: Map<string, NodeJS.Timer> = new Map();
  private emitter = new EventEmitter()

  public on(event: keyof Events<T>, listener: EventReceiver<Events<T>[keyof Events<T>]>) {
    this.emitter.on(event, listener)
    return this;
  }

  public off(event: keyof Events<T>, listener: EventReceiver<Events<T>[keyof Events<T>]>) {
    this.emitter.off(event, listener)
    return this;
  }

  public createTask(timer: number, task: string): void {
    const taskId = setTimeout(() => {
      this.taskList.delete(task)
      this.emitter.emit('task', task)
    }, timer);
    this.taskList.set(task, taskId)
  }

  public deleteTasks(): void {
    this.taskList.forEach(timer => clearTimeout(timer));
  }

}
