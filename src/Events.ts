import { GameObject } from "./GameObject";

type CallbackObject = {
  id: number;
  eventName: string;
  caller: GameObject;
  callback: Function;
};

class Events {
  private callbacks: CallbackObject[] = [];
  private nextId = 0;

  emit(eventName: string, value: any) {
    this.callbacks.forEach((cb) => {
      if (cb.eventName === eventName) {
        cb.callback(value);
      }
    });
  }

  on(eventName: string, caller: GameObject, callback: Function) {
    this.nextId++;
    this.callbacks.push({ id: this.nextId, eventName, caller, callback });
    return this.nextId;
  }

  off(id: number) {
    this.callbacks = this.callbacks.filter((cb) => cb.id !== id);
  }

  unsubscibe(caller: GameObject) {
    this.callbacks = this.callbacks.filter((cb) => cb.caller !== caller);
  }
}

export const events = new Events();
