import storageManager from "../storage/storageManager";

const PROFILE_KEY = "profile";

const defaultProfile = {
  name: "Abhi",
  avatar: "",
  exam: "SSC CGL",
  targetScore: 145,
  dailyStudyHours: 9,
  theme: "dark",
  language: "en",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const profileManager = {
  get() {
    return storageManager.get(PROFILE_KEY, defaultProfile);
  },

  save(profile) {
    const data = {
      ...defaultProfile,
      ...profile,
      updatedAt: new Date().toISOString(),
    };
    storageManager.set(PROFILE_KEY, data);
    return data;
  },

  update(values) {
    return storageManager.update(PROFILE_KEY, (current) => ({
      ...defaultProfile,
      ...current,
      ...values,
      updatedAt: new Date().toISOString(),
    }));
  },

  reset() {
    storageManager.set(PROFILE_KEY, defaultProfile);
    return defaultProfile;
  },
};

export default profileManager;