const PREFIX = "ssc-sentinel";

const key = (name) => `${PREFIX}:${name}`;

const storageManager = {
  set(name, value) {
    localStorage.setItem(key(name), JSON.stringify(value));
  },

  get(name, defaultValue = null) {
    try {
      const value = localStorage.getItem(key(name));
      return value ? JSON.parse(value) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  remove(name) {
    localStorage.removeItem(key(name));
  },

  clear() {
    Object.keys(localStorage)
      .filter((item) => item.startsWith(`${PREFIX}:`))
      .forEach((item) => localStorage.removeItem(item));
  },

  has(name) {
    return localStorage.getItem(key(name)) !== null;
  },

  update(name, updater) {
    const current = this.get(name, {});
    const updated = updater(current);
    this.set(name, updated);
    return updated;
  },
};

export default storageManager;