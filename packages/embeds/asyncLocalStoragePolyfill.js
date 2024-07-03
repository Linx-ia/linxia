export class AsyncLocalStorage {
    constructor() {
      this.store = new Map();
    }
  
    getStore() {
      return this.store.get('store');
    }
  
    run(store, callback) {
      this.store.set('store', store);
      try {
        return callback();
      } finally {
        this.store.delete('store');
      }
    }
  
    exit(callback) {
      try {
        return callback();
      } finally {
        this.store.delete('store');
      }
    }
  
    enterWith(store) {
      this.store.set('store', store);
    }
  }
  