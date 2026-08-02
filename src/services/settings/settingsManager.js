import storageManager from "../storage/storageManager";

const SETTINGS_KEY = "settings";

const defaultSettings = {
  theme: "dark",
  accentColor: "violet",
  language: "en",
  notifications: true,
  sound: true,
  animations: true,
  autoSave: true,
  offlineMode: true,
  timerSound: true,
  dailyReminder: true,
  updatedAt: new Date().toISOString(),
};

const settingsManager = {
  get() {
    return storageManager.get(SETTINGS_KEY, defaultSettings);
  },

  save(settings) {
    const data = {
      ...defaultSettings,
      ...settings,
      updatedAt: new Date().toISOString(),
    };
    storageManager.set(SETTINGS_KEY, data);
    return data;
  },

  update(values) {
    return storageManager.update(SETTINGS_KEY, (current) => ({
      ...defaultSettings,
      ...current,
      ...values,
      updatedAt: new Date().toISOString(),
    }));
  },

  reset() {
    storageManager.set(SETTINGS_KEY, defaultSettings);
    return defaultSettings;
  },
};

export default settingsManager;