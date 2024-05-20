type Callback = (data?: any) => void;

class EventBus {
  listeners: Record<string, Callback[]> = {};

  subscribe(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  publish(event: string, data?: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  unsubscribe(event: string, callback: Callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback); 
    }
  }
}

export default new EventBus();